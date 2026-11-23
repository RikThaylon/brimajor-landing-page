// Catálogo de reserva: usado quando não há DATABASE_URL ou a Neon falha.
// É o MESMO conteúdo de db/seed.sql. O foco é adoção empresarial de IA sem exigir programação.
import type { Catalogo, Curso, Trilha } from "./tipos";

const trilhas: Trilha[] = [
  { id: "fundamentos", nome: "Começar com IA", descricao: "Para equipes com zero conhecimento que querem entender, experimentar e usar IA com segurança.", cor: "#33AAFF", ordem: 1 },
  { id: "negocios", nome: "Engenharia de Contexto", descricao: "Transformar pedidos soltos em instruções, referências e critérios que geram resultados consistentes.", cor: "#2DD4BF", ordem: 2 },
  { id: "dev", nome: "IA nos Processos", descricao: "Para empresas que já usam IA e querem criar rotinas repetíveis, mensuráveis e supervisionadas.", cor: "#A78BFA", ordem: 3 },
  { id: "embarcada", nome: "Agentes e Squads", descricao: "Próximo passo para equipes maduras: agentes com ferramentas, papéis claros e revisão humana.", cor: "#FBBF24", ordem: 4 },
];

type Base = Omit<Curso, "status"> & Partial<Pick<Curso, "status">>;

const base: Base[] = [
  {
    id: "ia-na-pratica-empresas", trilhaId: "fundamentos", titulo: "IA na Prática para Empresas",
    resumo: "Entenda o que a IA faz, reconheça boas oportunidades e aplique-a em tarefas reais sem precisar programar.",
    nivel: "iniciante", cargaHoraria: 3, modalidades: ["presencial", "online", "in_company"],
    topicos: ["Como a IA funciona na prática", "Tarefas em que ela ajuda ou atrapalha", "Primeiros usos no trabalho", "Plano de aplicação para 30 dias"], ordem: 1,
  },
  {
    id: "uso-seguro-ia", trilhaId: "fundamentos", titulo: "Uso Seguro e Responsável de IA",
    resumo: "Use ferramentas de IA sem expor dados sensíveis e com uma rotina simples de verificação das respostas.",
    nivel: "iniciante", cargaHoraria: 3, modalidades: ["presencial", "online", "in_company"],
    topicos: ["Dados que podem ou não ser enviados", "Erros e alucinações", "Revisão humana", "Política básica de uso na empresa"], ordem: 2,
  },

  {
    id: "engenharia-contexto", trilhaId: "negocios", titulo: "Engenharia de Contexto",
    resumo: "Aprenda a fornecer objetivo, cenário, referências, regras e formato para obter respostas mais úteis e verificáveis.",
    nivel: "iniciante", cargaHoraria: 4, modalidades: ["presencial", "online", "in_company"],
    topicos: ["Objetivo e público", "Referências e dados confiáveis", "Restrições e critérios", "Formato e checklist de qualidade"], ordem: 1,
  },

  {
    id: "ia-processos-empresa", trilhaId: "dev", titulo: "IA nos Processos e Copilotos",
    resumo: "Desenhe o apoio da IA dentro do trabalho real, com exceções, evidências e uma pessoa responsável pela decisão.",
    nivel: "intermediario", cargaHoraria: 5, modalidades: ["presencial", "online", "in_company"],
    topicos: ["Mapa do processo atual", "Pontos de decisão humana", "Copilotos por etapa", "Exceções, evidências e métricas"], ordem: 1,
  },

  {
    id: "agentes-supervisionados", trilhaId: "embarcada", titulo: "Agentes e Squads Supervisionados",
    resumo: "Estruture agentes especializados com contexto, ferramentas, limites claros e supervisão humana.",
    nivel: "avancado", cargaHoraria: 6, modalidades: ["online", "in_company"],
    topicos: ["Tarefas adequadas para agentes", "Papéis e permissões", "Orquestração e passagens", "Supervisão, testes e limites"], ordem: 1,
  },
];

export const catalogoLocal: Catalogo = {
  trilhas,
  cursos: base.map((c) => ({ ...c, status: "inscricoes_abertas" })),
  origem: "local",
};
