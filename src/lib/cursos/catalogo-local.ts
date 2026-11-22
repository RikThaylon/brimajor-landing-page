// Catálogo de reserva: usado quando não há DATABASE_URL ou a Neon falha.
// É o MESMO conteúdo de db/seed.sql — cursos de EXEMPLO, todos "em breve", até a Brimajor enviar os reais.
import type { Catalogo, Curso, Trilha } from "./tipos";

const trilhas: Trilha[] = [
  { id: "fundamentos", nome: "Fundamentos de IA", descricao: "Para qualquer pessoa ou empresa que quer entender e usar IA com segurança.", cor: "#33AAFF", ordem: 1 },
  { id: "negocios", nome: "IA para Negócios & Dados", descricao: "Dados, automação e decisões melhores no dia a dia da empresa.", cor: "#2DD4BF", ordem: 2 },
  { id: "dev", nome: "IA para Desenvolvedores", descricao: "Construir produtos com LLMs, agentes e engenharia orientada a especificação.", cor: "#A78BFA", ordem: 3 },
  { id: "embarcada", nome: "IA Embarcada & IoT", descricao: "Levar inteligência para o hardware: microcontroladores, sensores e visão.", cor: "#FBBF24", ordem: 4 },
];

type Base = Omit<Curso, "status" | "cargaHoraria"> & Partial<Pick<Curso, "status" | "cargaHoraria">>;

const base: Base[] = [
  { id: "ia-do-zero", trilhaId: "fundamentos", titulo: "IA do Zero", resumo: "O que é IA de verdade, onde ela ajuda e onde ela erra — sem matemática pesada.", nivel: "iniciante", modalidades: ["presencial", "online", "in_company"], topicos: ["Conceitos de IA e aprendizado de máquina", "Ferramentas de IA generativa", "Limites, erros e alucinações", "Primeiros usos no trabalho"], ordem: 1 },
  { id: "engenharia-de-prompt", trilhaId: "fundamentos", titulo: "Engenharia de Prompt na Prática", resumo: "Escrever instruções que geram respostas úteis, consistentes e verificáveis.", nivel: "iniciante", modalidades: ["online", "in_company"], topicos: ["Anatomia de um bom prompt", "Exemplos e formatos de saída", "Cadeias de tarefas", "Avaliação de respostas"], ordem: 2 },
  { id: "ia-responsavel", trilhaId: "fundamentos", titulo: "IA Responsável e LGPD", resumo: "Usar IA com ética, segurança da informação e respeito à LGPD.", nivel: "intermediario", modalidades: ["online", "in_company"], topicos: ["Riscos e vieses", "Dados pessoais e LGPD", "Políticas de uso de IA na empresa", "Segurança da informação"], ordem: 3 },

  { id: "ia-no-dia-a-dia", trilhaId: "negocios", titulo: "IA no Dia a Dia da Empresa", resumo: "Atendimento, documentos, planilhas e rotinas mais rápidas com IA.", nivel: "iniciante", modalidades: ["presencial", "in_company"], topicos: ["Mapeamento de tarefas repetitivas", "IA em e-mails, documentos e planilhas", "Atendimento com assistentes", "Medindo o ganho de tempo"], ordem: 1 },
  { id: "analise-de-dados-com-ia", trilhaId: "negocios", titulo: "Análise de Dados com IA (Python + SQL)", resumo: "Do dado bruto ao insight com Python, SQL e a IA como copiloto.", nivel: "intermediario", modalidades: ["presencial", "online"], topicos: ["SQL para análise", "Python com pandas", "IA como copiloto de análise", "Storytelling com dados"], ordem: 2 },
  { id: "automacao-com-ia", trilhaId: "negocios", titulo: "Automação de Processos com IA", resumo: "Fluxos que leem, classificam e respondem sozinhos — com supervisão humana.", nivel: "intermediario", modalidades: ["online", "in_company"], topicos: ["Mapeamento de processos", "Integrações e APIs", "Classificação e extração de documentos", "Supervisão humana e indicadores"], ordem: 3 },
  { id: "dashboards-inteligentes", trilhaId: "negocios", titulo: "Dashboards e Indicadores Inteligentes", resumo: "Painéis que explicam os números e avisam antes do problema.", nivel: "avancado", modalidades: ["online", "in_company"], topicos: ["Modelagem de indicadores", "Previsão e detecção de anomalias", "Alertas acionáveis", "Governança de dados"], ordem: 4 },

  { id: "python-para-ia", trilhaId: "dev", titulo: "Python para IA", resumo: "A base de programação para quem quer construir com IA.", nivel: "iniciante", modalidades: ["presencial", "online"], topicos: ["Python essencial", "Bibliotecas de dados", "Consumo de APIs", "Boas práticas e testes"], ordem: 1 },
  { id: "llms-rag-agentes", trilhaId: "dev", titulo: "LLMs, RAG e Agentes", resumo: "Aplicações com modelos de linguagem que consultam seus dados e executam tarefas.", nivel: "intermediario", modalidades: ["online", "in_company"], topicos: ["Como os LLMs funcionam", "RAG: busca nos seus documentos", "Agentes e ferramentas", "Avaliação e custos"], ordem: 2 },
  { id: "squad-sdd", trilhaId: "dev", titulo: "Desenvolvimento com Squad de Agentes", resumo: "Engenharia orientada a especificação com a Brimajor Squad SDD: da ideia ao deploy com qualidade verificada.", nivel: "avancado", modalidades: ["online", "in_company"], topicos: ["Especificação antes de código", "Gates, evidência e quality gate", "Guardiões de segurança e UX", "Decisão humana e liberação"], ordem: 3 },

  { id: "microcontroladores-para-ia", trilhaId: "embarcada", titulo: "Eletrônica e Microcontroladores para IA", resumo: "Sensores, ESP32 e coleta de dados do mundo físico.", nivel: "iniciante", modalidades: ["presencial"], topicos: ["Eletrônica básica", "ESP32 e Arduino", "Sensores e aquisição de dados", "Comunicação Wi-Fi e MQTT"], ordem: 1 },
  { id: "tinyml", trilhaId: "embarcada", titulo: "Edge AI com TinyML", resumo: "Modelos de IA rodando dentro do microcontrolador, sem depender da nuvem.", nivel: "intermediario", modalidades: ["presencial", "online"], topicos: ["Coleta e rotulagem de dados", "Treino de modelos pequenos", "Quantização e deploy no chip", "Consumo de energia"], ordem: 2 },
  { id: "visao-embarcada", trilhaId: "embarcada", titulo: "Visão Computacional Embarcada", resumo: "Câmeras que detectam, contam e inspecionam no chão de fábrica.", nivel: "avancado", modalidades: ["presencial", "in_company"], topicos: ["Visão computacional essencial", "Detecção de objetos", "Inspeção de qualidade", "Otimização em hardware embarcado"], ordem: 3 },
  { id: "iot-industrial-ia", trilhaId: "embarcada", titulo: "IoT Industrial com IA", resumo: "Telemetria, manutenção preditiva e alertas — do Polo Industrial de Manaus ao seu chão de fábrica.", nivel: "avancado", modalidades: ["presencial", "in_company"], topicos: ["Arquitetura IoT industrial", "Telemetria e protocolos", "Manutenção preditiva", "Dashboards e alertas"], ordem: 4 },
];

export const catalogoLocal: Catalogo = {
  trilhas,
  cursos: base.map((c) => ({ status: "em_breve", cargaHoraria: null, ...c })),
  origem: "local",
};
