// Conteúdo institucional do site. Textos do site anterior (brimajor-landing-page) revisados e ampliados.
import { ACADEMY_URL } from "./cursos/academy";

export const empresa = {
  nome: "Brimajor",
  razao: "Brimajor Sistemas Embarcados e IA",
  cnpj: "67.072.659/0001-24",
  cidade: "Manaus — Amazonas",
  instagram: { usuario: "@brimajor_ia", url: "https://instagram.com/brimajor_ia" },
  academy: { rotulo: "Área do aluno", url: new URL("auth/sign-in", ACADEMY_URL).href },
  url: "https://brimajor.onrender.com",
  descricao:
    "Prototipagem ágil, sistemas embarcados e inteligência artificial em Manaus/AM. Protótipos que provam viabilidade antes do grande investimento — e cursos de IA para pessoas e equipes.",
};

export const navegacao = [
  { href: "/", rotulo: "Início" },
  { href: ACADEMY_URL, rotulo: "Cursos de IA" },
  { href: "/squad", rotulo: "Squads sob medida" },
  { href: "/estoque", rotulo: "Kanban Estoque" },
  { href: "/iniciacoes", rotulo: "Iniciações" },
] as const;

export const hero = {
  sobretitulo: "Sistemas embarcados & IA · Manaus/AM",
  titulo: ["Inteligência que sai", "da tela e entra", "no hardware."],
  subtitulo:
    "Transformamos desafios de hardware e software em protótipos testáveis — PoCs e MVPs de sistemas embarcados, IoT e IA — e ensinamos sua equipe a usar inteligência artificial de verdade.",
};

export const manifesto =
  "Somos uma empresa de engenharia nascida em Manaus. Unimos eletrônica, software e inteligência artificial para tirar ideias do papel com protótipos que medem, provam e aprendem — antes do grande investimento.";

export const numerosManifesto = [
  { valor: 4, sufixo: "", rotulo: "frentes de engenharia" },
  { valor: 4, sufixo: "", rotulo: "trilhas de cursos de IA" },
  { valor: 4, sufixo: "", rotulo: "etapas de validação segura" },
];

export const frentes = [
  {
    id: "embarcados-iot",
    codigo: "U1",
    titulo: "Sistemas Embarcados & IoT",
    descricao: "Integração e programação de microcontroladores para coletar e transmitir dados do ambiente físico — sensores, telemetria e comandos remotos.",
    itens: ["ESP32, Arduino e STM32", "Sensores e aquisição de dados", "Wi-Fi, MQTT e LoRa"],
    icone: "Cpu",
  },
  {
    id: "ia",
    codigo: "U2",
    titulo: "Inteligência Artificial Aplicada",
    descricao: "IA que resolve um problema concreto: visão computacional, modelos na borda (edge AI), assistentes e automação com supervisão humana.",
    itens: ["Visão computacional", "Edge AI / TinyML", "LLMs, RAG e agentes"],
    icone: "BrainCircuit",
  },
  {
    id: "web-mobile",
    codigo: "U3",
    titulo: "Aplicações Web & Mobile Corporativas",
    descricao: "Interfaces ágeis, validação de usabilidade e arquitetura inicial de bancos de dados para o protótipo virar ferramenta de trabalho.",
    itens: ["Painéis e dashboards", "Apps de campo (QR/NFC)", "Banco de dados e APIs"],
    icone: "MonitorSmartphone",
  },
  {
    id: "digitalizacao",
    codigo: "U4",
    titulo: "Digitalização de Rotinas Técnicas",
    descricao: "Mapeamento de gargalos manuais e construção rápida de fluxos digitais para teste em campo, com integração entre sistemas existentes.",
    itens: ["Checklists e inspeções", "Integração de APIs", "Cultura paperless"],
    icone: "Workflow",
  },
] as const;

export const modeloTrabalho = [
  { passo: "01", titulo: "Alinhamento inicial", descricao: "Conversa macro sobre o problema operacional, sem expor regras de negócio sensíveis." },
  { passo: "02", titulo: "Acordo de sigilo", descricao: "Se for preciso avançar nos detalhes, firmamos um acordo mútuo de confidencialidade (NDA)." },
  { passo: "03", titulo: "PoC controlada", descricao: "Construímos um MVP enxuto para testar a viabilidade técnica em ambiente controlado." },
  { passo: "04", titulo: "Validação & co-design", descricao: "Analisamos juntos os dados do protótipo para decidir, com números, o futuro do projeto." },
];

export const iniciacoes = [
  {
    id: "gestao-estoque",
    titulo: "Gestão e rastreabilidade de estoque",
    desafio: "Falta de visibilidade em tempo real sobre os níveis de suprimentos, levando a rupturas ou excessos que impactam a operação.",
    abordagem: "Fluxos de abastecimento baseados em Kanban digital com monitoramento simulado.",
    valor: "Matriz de papéis bem definida com alertas preditivos para níveis críticos de estoque.",
  },
  {
    id: "inspecao-operacional",
    titulo: "Inspeção e padronização operacional",
    desafio: "Processos manuais e em papel geram atrasos, perda de informações e dificuldade de padronização.",
    abordagem: "Aplicação digital para leitura de marcadores em campo (QR/NFC) e checklists digitais de manutenção.",
    valor: "Transição para a cultura paperless, com dados centralizados e redução drástica no tempo de inspeção.",
  },
  {
    id: "automacao-entretenimento",
    titulo: "Automação para entretenimento",
    desafio: "Gerenciamento ineficiente de filas e mídias, afetando a experiência do público.",
    abordagem: "Autoatendimento via interface móvel para gerenciamento de mídias de áudio e vídeo.",
    valor: "Cálculo preciso de tempo em fila, com interface interativa que aumenta o engajamento.",
  },
  {
    id: "monitoramento-termico",
    titulo: "Monitoramento térmico e IoT predial",
    desafio: "Oscilações térmicas não monitoradas podem danificar equipamentos ou comprometer o conforto.",
    abordagem: "Malha de teste com hardware embarcado dedicado para telemetria contínua de temperatura.",
    valor: "Dashboards de controle e comandos remotos para reagir rápido a anomalias térmicas.",
  },
];

export const estoqueModulos = [
  { id: "kanban", titulo: "Motor Kanban dinâmico", descricao: "Faixas operacionais (verde, amarelo, vermelho) ajustadas automaticamente pelo histórico de consumo de cada SKU, acompanhando demandas sazonais ou intermitentes.", icone: "BarChart3" },
  { id: "antifraude", titulo: "Fluxo antifraude de alçadas", descricao: "Bloqueio nativo de autoaprovação: requisição de supervisor sobe para a gerência, e todo insumo fica vinculado à máquina ou ao departamento de destino.", icone: "ShieldCheck" },
  { id: "qa", titulo: "Controle de qualidade", descricao: "Movimentações manuais ou divergentes entram em retenção \"Pendente\" e exigem auditoria da gerência de operações antes de valer.", icone: "CheckCircle" },
  { id: "raci", titulo: "Matriz RACI avançada", descricao: "Rupturas iminentes ou atrasos de fornecedores viram ocorrências acionáveis, distribuídas às alçadas responsáveis com prazo e evidência.", icone: "Users" },
  { id: "analytics", titulo: "Analytics e topologia de nós", descricao: "Curva ABC pelo giro real e um grafo Fornecedores → Produtos → Máquinas que antecipa o impacto de uma parada de linha.", icone: "FileBarChart" },
  { id: "governanca", titulo: "Governança e auditoria", descricao: "RBAC com papéis industriais (Plant Manager, Engenharia, Comprador, Facilitador) e log inalterável de toda mutação: quem, quando, IP e estado anterior.", icone: "Fingerprint" },
] as const;

export const formatosTreinamento = [
  { titulo: "Turmas abertas", texto: "Presencial em Manaus ou online ao vivo, com prática do começo ao fim e material próprio.", icone: "Users" },
  { titulo: "In-company", texto: "Treinamento sob medida para a sua equipe, com exemplos do seu negócio e da sua operação.", icone: "Building2" },
  { titulo: "Mentorias e workshops", texto: "Encontros curtos e intensivos para destravar um projeto de IA ou montar a primeira prova de conceito.", icone: "Sparkles" },
] as const;
