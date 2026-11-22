// Tipos do catálogo de cursos e treinamentos. Espelham as tabelas `trilhas` e `cursos` (db/schema.sql).

export const NIVEIS = ["iniciante", "intermediario", "avancado"] as const;
export type Nivel = (typeof NIVEIS)[number];

export const STATUS = ["em_breve", "inscricoes_abertas", "encerrado"] as const;
export type StatusCurso = (typeof STATUS)[number];

export const MODALIDADES = ["presencial", "online", "in_company"] as const;
export type Modalidade = (typeof MODALIDADES)[number];

export interface Trilha {
  id: string;
  nome: string;
  descricao: string;
  cor: string; // #RRGGBB
  ordem: number;
}

export interface Curso {
  id: string;
  trilhaId: string;
  titulo: string;
  resumo: string;
  nivel: Nivel;
  cargaHoraria: number | null; // horas; null = "a definir"
  modalidades: Modalidade[];
  topicos: string[];
  status: StatusCurso;
  ordem: number;
}

export interface Catalogo {
  trilhas: Trilha[];
  cursos: Curso[];
  origem: "neon" | "local";
}

export const ROTULO_NIVEL: Record<Nivel, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export const ROTULO_MODALIDADE: Record<Modalidade, string> = {
  presencial: "Presencial em Manaus",
  online: "Online ao vivo",
  in_company: "In-company",
};

export const ROTULO_STATUS: Record<StatusCurso, string> = {
  em_breve: "Em breve",
  inscricoes_abertas: "Inscrições abertas",
  encerrado: "Encerrado",
};
