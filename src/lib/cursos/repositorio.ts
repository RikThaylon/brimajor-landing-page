// Repositório do catálogo: lê a Neon quando há DATABASE_URL; senão, ou se falhar, usa o catálogo local.
// Usado só no servidor (páginas renderizadas no servidor). A URL do banco nunca vai para o navegador nem para o log.
import { neon } from "@neondatabase/serverless";
import { catalogoLocal } from "./catalogo-local";
import { normalizarCursos, normalizarTrilhas, type Linha } from "./normalizar";
import type { Catalogo } from "./tipos";

export interface FonteCatalogo {
  trilhas(): Promise<Linha[]>;
  cursos(): Promise<Linha[]>;
}

export type Registro = (mensagem: string) => void;

const TEMPO_LIMITE_MS = 8000;

/** Fonte real: consultas fixas, sem nenhuma entrada do visitante (nada a parametrizar). */
export function fonteNeon(url: string): FonteCatalogo {
  const sql = neon(url);
  return {
    trilhas: () => sql`select id, nome, descricao, cor, ordem from trilhas order by ordem, nome` as Promise<Linha[]>,
    cursos: () =>
      sql`select id, trilha_id, titulo, resumo, nivel, carga_horaria, modalidades, topicos, status, ordem
          from cursos where status <> 'encerrado' order by ordem, titulo` as Promise<Linha[]>,
  };
}

function comTempoLimite<T>(promessa: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const limite = new Promise<never>((_, rejeitar) => {
    timer = setTimeout(() => rejeitar(new Error(`tempo limite de ${ms} ms`)), ms);
  });
  return Promise.race([promessa, limite]).finally(() => clearTimeout(timer));
}

/** Mensagem de erro sem nada que pareça credencial ou URL de conexão. */
export function mensagemSegura(erro: unknown): string {
  const bruta = erro instanceof Error ? erro.message : String(erro);
  return bruta.replace(/postgres(ql)?:\/\/\S+/gi, "[url-ocultada]").replace(/password=\S+/gi, "password=[oculto]").slice(0, 200);
}

export async function carregarCatalogo(opcoes: {
  url?: string;
  fonte?: FonteCatalogo;
  registrar?: Registro;
  tempoLimiteMs?: number;
} = {}): Promise<Catalogo> {
  const registrar = opcoes.registrar ?? ((m: string) => console.warn(m));
  const fonte = opcoes.fonte ?? (opcoes.url ? fonteNeon(opcoes.url) : null);
  if (!fonte) {
    registrar("catalogo: origem local (sem DATABASE_URL)");
    return catalogoLocal;
  }
  try {
    const ms = opcoes.tempoLimiteMs ?? TEMPO_LIMITE_MS;
    const [linhasTrilhas, linhasCursos] = await comTempoLimite(Promise.all([fonte.trilhas(), fonte.cursos()]), ms);
    const { trilhas, descartes: d1 } = normalizarTrilhas(linhasTrilhas);
    const { cursos, descartes: d2 } = normalizarCursos(linhasCursos, trilhas);
    for (const d of [...d1, ...d2]) registrar(`catalogo: ${d.tabela} '${d.id}' descartado (${d.motivo})`);
    if (trilhas.length === 0 || cursos.length === 0) {
      registrar("catalogo: banco sem trilhas ou cursos válidos, usando local");
      return catalogoLocal;
    }
    return { trilhas, cursos, origem: "neon" };
  } catch (erro) {
    registrar(`catalogo: falha na Neon, usando local (${mensagemSegura(erro)})`);
    return catalogoLocal;
  }
}

/** Ponto de entrada das páginas. */
export function getCatalogo(): Promise<Catalogo> {
  return carregarCatalogo({ url: process.env.DATABASE_URL });
}
