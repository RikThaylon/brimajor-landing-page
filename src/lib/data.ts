export const siteConfig = {
  name: "Brimajor Sistemas Embarcados & IA",
  description: "Prototipagem Ágil, Sistemas Embarcados & Inteligência Artificial. Transformamos desafios complexos de hardware e software em modelos de teste de alta eficiência (PoCs e MVPs).",
  url: "https://brimajor.com",
};

export const heroContent = {
  title: "Prototipagem Ágil, Sistemas Embarcados & Inteligência Artificial.",
  subtitle: "Transformamos desafios complexos de hardware e software em modelos de teste de alta eficiência (PoCs e MVPs). Permita que sua operação avalie viabilidades técnicas e econômicas antes de grandes investimentos em escala."
};

export const capacities = [
  {
    id: "web-mobile",
    title: "Aplicações Web & Mobile Corporativas",
    description: "Interfaces ágeis, validação de usabilidade e arquitetura inicial de bancos de dados.",
    icon: "MonitorSmartphone"
  },
  {
    id: "embarcados-iot",
    title: "Sistemas Embarcados & IoT",
    description: "Integração e programação de microcontroladores para coleta e transmissão de dados do ambiente físico.",
    icon: "Cpu"
  },
  {
    id: "digitalizacao",
    title: "Digitalização de Rotinas Técnicas",
    description: "Mapeamento de gargalos manuais e construção rápida de fluxos digitais para teste em campo.",
    icon: "Workflow"
  },
  {
    id: "apis",
    title: "Integração Experimental de APIs",
    description: "Conexão pontual entre softwares para centralização de dados analíticos em dashboards.",
    icon: "Network"
  }
];

export const timelineSteps = [
  {
    step: "01",
    title: "Alinhamento Inicial",
    description: "Discussão macro do problema operacional, sem abertura de regras de negócio estritas."
  },
  {
    step: "02",
    title: "Acordo de Sigilo",
    description: "Se necessário avançar em detalhes, estabelecemos acordos mútuos de confidencialidade (NDA)."
  },
  {
    step: "03",
    title: "PoC Controlada",
    description: "Construímos um MVP enxuto para testar a viabilidade técnica em ambiente controlado."
  },
  {
    step: "04",
    title: "Validação & Co-Design",
    description: "Análise conjunta dos dados gerados pelo protótipo para direcionar o futuro do projeto."
  }
];

export const iniciacoes = [
  {
    id: "gestao-estoque",
    title: "Conceito para Gestão e Rastreabilidade de Estoque",
    challenge: "Falta de visibilidade em tempo real sobre os níveis de suprimentos, levando a rupturas ou excessos que impactam a operação.",
    approach: "Desenvolvimento de fluxos de abastecimento baseados em Kanban digital com monitoramento simulado.",
    value: "Matriz de papéis bem definida com alertas preditivos para níveis críticos de estoque."
  },
  {
    id: "inspecao-operacional",
    title: "Protótipo de Inspeção e Padronização Operacional",
    challenge: "Processos manuais e baseados em papel geram atrasos, perda de informações e dificuldades na padronização.",
    approach: "Aplicação digital para leitura de marcadores em campo (QR/NFC) e checklists digitais de manutenção.",
    value: "Transição para cultura paperless, com dados centralizados e redução drástica no tempo de inspeção."
  },
  {
    id: "automacao-entretenimento",
    title: "Conceito de Automação para Entretenimento",
    challenge: "Gerenciamento ineficiente de filas e mídias, afetando negativamente a experiência do usuário.",
    approach: "Fluxo de autoatendimento via interface móvel para gerenciamento de mídias de áudio/vídeo.",
    value: "Cálculo preciso de tempo em fila, com interface interativa que melhora o engajamento do cliente."
  },
  {
    id: "monitoramento-termico",
    title: "Protótipo de Monitoramento Térmico e IoT Predial",
    challenge: "Oscilações térmicas não monitoradas podem danificar equipamentos ou comprometer o conforto ambiental.",
    approach: "Malha de teste com hardware embarcado dedicado para telemetria contínua de temperatura ambiente.",
    value: "Dashboards de controle e comandos remotos experimentais para reação rápida a anomalias térmicas."
  }
];

export const estoqueModules = [
  {
    id: "kanban",
    title: "Motor Kanban Dinâmico",
    description: "Ajuste automático de faixas operacionais (Verde, Amarelo, Vermelho) baseado na maturidade e no histórico de consumo de cada SKU, adaptando-se a flutuações de demanda sazonais ou intermitentes.",
    icon: "BarChart3"
  },
  {
    id: "antifraude",
    title: "Fluxo Antifraude de Alçadas",
    description: "Bloqueio nativo de auto-aprovação. Se um supervisor disparar uma requisição, o sistema força o escalonamento para gerência. Todo insumo é obrigatoriamente vinculado à máquina ou departamento de destino.",
    icon: "ShieldCheck"
  },
  {
    id: "qa",
    title: "Controle de Qualidade (QA)",
    description: "Movimentações manuais ou divergentes não entram em processamento direto. Entram em estado de retenção \"Pendente\", exigindo auditoria de nível de Gerência de Operações para prevenir furos ocultos de inventário.",
    icon: "CheckCircle"
  },
  {
    id: "raci",
    title: "Matriz RACI Avançada",
    description: "Anormalidades como rupturas iminentes ou atrasos crônicos de fornecedores geram Ocorrências Acionáveis distribuídas automaticamente para as alçadas responsáveis com rastreamento de prazos e logs de evidências.",
    icon: "Users"
  },
  {
    id: "analytics",
    title: "Analytics e Topologia de Nós",
    description: "Geração de Curva ABC baseada em valor de giro real e uma visualização em grafo que mapeia interdependências técnicas: Fornecedores → Produtos → Máquinas, antecipando impactos de parada de linha.",
    icon: "FileBarChart"
  },
  {
    id: "governanca",
    title: "Governança e Auditoria",
    description: "RBAC granular mapeando papéis industriais precisos (Plant Manager, Engenharia, Comprador, Facilitador). Qualquer mutação no banco dispara um log inalterável de auditoria (Quem, Quando, IP, Estado Anterior).",
    icon: "Fingerprint"
  }
];
