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
    nivel: "iniciante", cargaHoraria: 2, modalidades: ["online", "in_company"],
    topicos: ["Dados que podem ou não ser enviados", "Erros e alucinações", "Revisão humana", "Política básica de uso na empresa"], ordem: 2,
  },

  {
    id: "engenharia-contexto", trilhaId: "negocios", titulo: "Engenharia de Contexto na Prática",
    resumo: "Aprenda a fornecer objetivo, cenário, referências, regras e formato para obter respostas mais úteis e verificáveis.",
    nivel: "iniciante", cargaHoraria: 4, modalidades: ["presencial", "online", "in_company"],
    topicos: ["Objetivo e público", "Referências e dados confiáveis", "Restrições e critérios", "Formato e checklist de qualidade"], ordem: 1,
  },
  {
    id: "biblioteca-contexto", trilhaId: "negocios", titulo: "Biblioteca de Contexto da Empresa",
    resumo: "Organize exemplos, políticas, modelos e vocabulário para a equipe reutilizar conhecimento sem começar do zero.",
    nivel: "intermediario", cargaHoraria: 4, modalidades: ["online", "in_company"],
    topicos: ["Cartões de contexto", "Exemplos bons e ruins", "Fontes e versões", "Padrões reutilizáveis por área"], ordem: 2,
  },

  {
    id: "ia-processos-empresa", trilhaId: "dev", titulo: "IA Aplicada aos Processos da Empresa",
    resumo: "Mapeie um processo e defina onde a IA pode apoiar, onde uma pessoa precisa decidir e como tratar exceções.",
    nivel: "intermediario", cargaHoraria: 4, modalidades: ["presencial", "online", "in_company"],
    topicos: ["Mapa do processo atual", "Entradas e saídas", "Pontos de decisão humana", "Piloto de baixo risco"], ordem: 1,
  },
  {
    id: "copilotos-equipes", trilhaId: "dev", titulo: "Copilotos para Equipes",
    resumo: "Crie formas consistentes de usar IA em atendimento, documentos, análise e rotinas internas.",
    nivel: "intermediario", cargaHoraria: 4, modalidades: ["online", "in_company"],
    topicos: ["Casos por área", "Fluxos com etapas", "Base de conhecimento", "Revisão e escalonamento"], ordem: 2,
  },
  {
    id: "governanca-metricas-ia", trilhaId: "dev", titulo: "Governança e Métricas de IA",
    resumo: "Acompanhe qualidade, tempo poupado, riscos e adoção para melhorar o uso de IA sem perder controle.",
    nivel: "intermediario", cargaHoraria: 3, modalidades: ["online", "in_company"],
    topicos: ["Critérios de qualidade", "Indicadores de resultado", "Registro de falhas", "Ciclo de melhoria"], ordem: 3,
  },

  {
    id: "agentes-supervisionados", trilhaId: "embarcada", titulo: "Agentes de IA com Supervisão",
    resumo: "Entenda como agentes usam contexto, ferramentas e memória para executar tarefas com limites e aprovação humana.",
    nivel: "avancado", cargaHoraria: 6, modalidades: ["online", "in_company"],
    topicos: ["Tarefas adequadas para agentes", "Ferramentas e permissões", "Memória e estado", "Supervisão, testes e limites"], ordem: 1,
  },
  {
    id: "squads-agentes-equipes", trilhaId: "embarcada", titulo: "Squads de Agentes para Equipes",
    resumo: "Aprenda a distribuir um fluxo entre agentes especializados e a estruturar revisões, evidências e decisões humanas.",
    nivel: "avancado", cargaHoraria: 8, modalidades: ["online", "in_company"],
    topicos: ["Papéis e responsabilidades", "Orquestração e passagens de trabalho", "Critérios de revisão", "Montagem de uma squad para a empresa"], ordem: 2,
  },
];

export const catalogoLocal: Catalogo = {
  trilhas,
  cursos: base.map((c) => ({ status: "em_breve", ...c })),
  origem: "local",
};
