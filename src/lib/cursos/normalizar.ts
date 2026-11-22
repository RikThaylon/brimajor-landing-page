// Converte linhas cruas do banco em tipos do site, descartando o que for inválido (CEN-013).
import { MODALIDADES, NIVEIS, STATUS, type Curso, type Modalidade, type Nivel, type StatusCurso, type Trilha } from "./tipos";

export type Linha = Record<string, unknown>;

export interface Descarte {
  tabela: "trilhas" | "cursos";
  id: string;
  motivo: string;
}

const COR_HEX = /^#[0-9A-Fa-f]{6}$/;

function texto(valor: unknown): string | null {
  return typeof valor === "string" && valor.trim() !== "" ? valor.trim() : null;
}

function inteiro(valor: unknown, padrao: number): number {
  const n = typeof valor === "string" ? Number(valor) : valor;
  return typeof n === "number" && Number.isInteger(n) ? n : padrao;
}

function listaDeTextos(valor: unknown): string[] {
  return Array.isArray(valor) ? valor.map(texto).filter((v): v is string => v !== null) : [];
}

function pertence<T extends string>(lista: readonly T[], valor: unknown): valor is T {
  return typeof valor === "string" && (lista as readonly string[]).includes(valor);
}

export function normalizarTrilhas(linhas: Linha[]): { trilhas: Trilha[]; descartes: Descarte[] } {
  const trilhas: Trilha[] = [];
  const descartes: Descarte[] = [];
  for (const linha of linhas) {
    const id = texto(linha.id);
    const nome = texto(linha.nome);
    const cor = texto(linha.cor);
    if (!id || !nome) {
      descartes.push({ tabela: "trilhas", id: String(linha.id ?? "?"), motivo: "id ou nome ausente" });
      continue;
    }
    if (!cor || !COR_HEX.test(cor)) {
      descartes.push({ tabela: "trilhas", id, motivo: "cor fora do formato #RRGGBB" });
      continue;
    }
    trilhas.push({ id, nome, descricao: texto(linha.descricao) ?? "", cor, ordem: inteiro(linha.ordem, 0) });
  }
  trilhas.sort((a, b) => a.ordem - b.ordem || a.nome.localeCompare(b.nome, "pt-BR"));
  return { trilhas, descartes };
}

export function normalizarCursos(linhas: Linha[], trilhasValidas: Trilha[]): { cursos: Curso[]; descartes: Descarte[] } {
  const ids = new Set(trilhasValidas.map((t) => t.id));
  const cursos: Curso[] = [];
  const descartes: Descarte[] = [];
  for (const linha of linhas) {
    const id = texto(linha.id);
    const titulo = texto(linha.titulo);
    const trilhaId = texto(linha.trilha_id ?? linha.trilhaId);
    const motivo = !id || !titulo ? "id ou título ausente"
      : !trilhaId || !ids.has(trilhaId) ? "trilha inexistente"
      : !pertence<Nivel>(NIVEIS, linha.nivel) ? "nível desconhecido"
      : !pertence<StatusCurso>(STATUS, linha.status) ? "status desconhecido"
      : null;
    if (motivo || !id || !titulo || !trilhaId) {
      descartes.push({ tabela: "cursos", id: String(linha.id ?? "?"), motivo: motivo ?? "linha inválida" });
      continue;
    }
    if (linha.status === "encerrado") continue; // RN-02: encerrado não aparece
    const carga = inteiro(linha.carga_horaria ?? linha.cargaHoraria, 0);
    cursos.push({
      id,
      trilhaId,
      titulo,
      resumo: texto(linha.resumo) ?? "",
      nivel: linha.nivel as Nivel,
      cargaHoraria: carga > 0 ? carga : null,
      modalidades: listaDeTextos(linha.modalidades).filter((m): m is Modalidade => pertence(MODALIDADES, m)),
      topicos: listaDeTextos(linha.topicos),
      status: linha.status as StatusCurso,
      ordem: inteiro(linha.ordem, 0),
    });
  }
  return { cursos: ordenarCursos(cursos, trilhasValidas), descartes };
}

/** Ordena por trilha (ordem da trilha), nível e ordem do curso. */
export function ordenarCursos(cursos: Curso[], trilhas: Trilha[]): Curso[] {
  const posTrilha = new Map(trilhas.map((t, i) => [t.id, i]));
  return [...cursos].sort(
    (a, b) =>
      (posTrilha.get(a.trilhaId) ?? 99) - (posTrilha.get(b.trilhaId) ?? 99) ||
      NIVEIS.indexOf(a.nivel) - NIVEIS.indexOf(b.nivel) ||
      a.ordem - b.ordem,
  );
}
