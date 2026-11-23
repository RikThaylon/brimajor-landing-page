// Links de WhatsApp com mensagem pronta. Nada é gravado: o texto vai só na URL que a própria pessoa abre.
import { ROTULO_NIVEL, type Curso, type Trilha } from "./cursos/tipos";

export const WHATSAPP_NUMERO = "5592985224523";
export const WHATSAPP_EXIBICAO = "(92) 98522-4523";
export const LIMITE_MENSAGEM = 1000;

/** CEN-015: o texto é cortado e codificado; caracteres como & ? # < > não alteram a URL. */
export function linkWhatsApp(texto = ""): string {
  const limpo = Array.from(texto.trim()).slice(0, LIMITE_MENSAGEM).join("");
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return limpo ? `${base}?text=${encodeURIComponent(limpo)}` : base;
}

export function mensagemCurso(curso: Curso, trilha?: Trilha): string {
  const onde = [trilha?.nome, `nível ${ROTULO_NIVEL[curso.nivel].toLowerCase()}`].filter(Boolean).join(", ");
  const pedido =
    curso.status === "inscricoes_abertas"
      ? "Quero me inscrever. Pode me passar datas, formato e forma de pagamento?"
      : "Quero ser avisado(a) quando a turma abrir.";
  return `Olá, Brimajor! Tenho interesse no curso "${curso.titulo}" (${onde}). ${pedido}`;
}

export function rotuloAcaoCurso(curso: Curso): string {
  return curso.status === "inscricoes_abertas" ? "Quero me inscrever" : "Quero ser avisado";
}

export const ASSUNTOS_CONTATO = [
  "Prova de conceito (PoC)",
  "Cursos e treinamentos de IA",
  "Treinamento in-company",
  "Kanban Estoque",
  "Montagem de squad de IA",
  "Outro assunto",
] as const;

export const LIMITE_NOME = 80;
export const LIMITE_DETALHES = 600;

/** CEN-008: sem nome não há mensagem (o formulário não envia). */
export function mensagemContato(dados: { nome: string; assunto: string; detalhes?: string }): string | null {
  const nome = dados.nome.trim().slice(0, LIMITE_NOME);
  if (!nome) return null;
  const detalhes = (dados.detalhes ?? "").trim().slice(0, LIMITE_DETALHES);
  return [`Olá, Brimajor! Sou ${nome}.`, `Assunto: ${dados.assunto}.`, detalhes ? `Detalhes: ${detalhes}` : ""]
    .filter(Boolean)
    .join("\n");
}
