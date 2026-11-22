-- Carga inicial de EXEMPLO do catálogo de cursos (todos 'em_breve').
-- Troque pelos cursos reais quando estiverem definidos. Idempotente (upsert).
-- Mantenha em sincronia com src/lib/cursos/catalogo-local.ts (catálogo de reserva).

insert into trilhas (id, nome, descricao, cor, ordem) values
  ('fundamentos', 'Fundamentos de IA',        'Para qualquer pessoa ou empresa que quer entender e usar IA com segurança.',        '#33AAFF', 1),
  ('negocios',    'IA para Negócios & Dados', 'Dados, automação e decisões melhores no dia a dia da empresa.',                      '#2DD4BF', 2),
  ('dev',         'IA para Desenvolvedores',  'Construir produtos com LLMs, agentes e engenharia orientada a especificação.',       '#A78BFA', 3),
  ('embarcada',   'IA Embarcada & IoT',       'Levar inteligência para o hardware: microcontroladores, sensores e visão.',         '#FBBF24', 4)
on conflict (id) do update set
  nome = excluded.nome, descricao = excluded.descricao, cor = excluded.cor, ordem = excluded.ordem;

insert into cursos (id, trilha_id, titulo, resumo, nivel, carga_horaria, modalidades, topicos, status, ordem) values
  ('ia-do-zero', 'fundamentos', 'IA do Zero',
   'O que é IA de verdade, onde ela ajuda e onde ela erra — sem matemática pesada.',
   'iniciante', null, '{presencial,online,in_company}',
   '{"Conceitos de IA e aprendizado de máquina","Ferramentas de IA generativa","Limites, erros e alucinações","Primeiros usos no trabalho"}', 'em_breve', 1),
  ('engenharia-de-prompt', 'fundamentos', 'Engenharia de Prompt na Prática',
   'Escrever instruções que geram respostas úteis, consistentes e verificáveis.',
   'iniciante', null, '{online,in_company}',
   '{"Anatomia de um bom prompt","Exemplos e formatos de saída","Cadeias de tarefas","Avaliação de respostas"}', 'em_breve', 2),
  ('ia-responsavel', 'fundamentos', 'IA Responsável e LGPD',
   'Usar IA com ética, segurança da informação e respeito à LGPD.',
   'intermediario', null, '{online,in_company}',
   '{"Riscos e vieses","Dados pessoais e LGPD","Políticas de uso de IA na empresa","Segurança da informação"}', 'em_breve', 3),

  ('ia-no-dia-a-dia', 'negocios', 'IA no Dia a Dia da Empresa',
   'Atendimento, documentos, planilhas e rotinas mais rápidas com IA.',
   'iniciante', null, '{presencial,in_company}',
   '{"Mapeamento de tarefas repetitivas","IA em e-mails, documentos e planilhas","Atendimento com assistentes","Medindo o ganho de tempo"}', 'em_breve', 1),
  ('analise-de-dados-com-ia', 'negocios', 'Análise de Dados com IA (Python + SQL)',
   'Do dado bruto ao insight com Python, SQL e a IA como copiloto.',
   'intermediario', null, '{presencial,online}',
   '{"SQL para análise","Python com pandas","IA como copiloto de análise","Storytelling com dados"}', 'em_breve', 2),
  ('automacao-com-ia', 'negocios', 'Automação de Processos com IA',
   'Fluxos que leem, classificam e respondem sozinhos — com supervisão humana.',
   'intermediario', null, '{online,in_company}',
   '{"Mapeamento de processos","Integrações e APIs","Classificação e extração de documentos","Supervisão humana e indicadores"}', 'em_breve', 3),
  ('dashboards-inteligentes', 'negocios', 'Dashboards e Indicadores Inteligentes',
   'Painéis que explicam os números e avisam antes do problema.',
   'avancado', null, '{online,in_company}',
   '{"Modelagem de indicadores","Previsão e detecção de anomalias","Alertas acionáveis","Governança de dados"}', 'em_breve', 4),

  ('python-para-ia', 'dev', 'Python para IA',
   'A base de programação para quem quer construir com IA.',
   'iniciante', null, '{presencial,online}',
   '{"Python essencial","Bibliotecas de dados","Consumo de APIs","Boas práticas e testes"}', 'em_breve', 1),
  ('llms-rag-agentes', 'dev', 'LLMs, RAG e Agentes',
   'Aplicações com modelos de linguagem que consultam seus dados e executam tarefas.',
   'intermediario', null, '{online,in_company}',
   '{"Como os LLMs funcionam","RAG: busca nos seus documentos","Agentes e ferramentas","Avaliação e custos"}', 'em_breve', 2),
  ('squad-sdd', 'dev', 'Desenvolvimento com Squad de Agentes',
   'Engenharia orientada a especificação com a Brimajor Squad SDD: da ideia ao deploy com qualidade verificada.',
   'avancado', null, '{online,in_company}',
   '{"Especificação antes de código","Gates, evidência e quality gate","Guardiões de segurança e UX","Decisão humana e liberação"}', 'em_breve', 3),

  ('microcontroladores-para-ia', 'embarcada', 'Eletrônica e Microcontroladores para IA',
   'Sensores, ESP32 e coleta de dados do mundo físico.',
   'iniciante', null, '{presencial}',
   '{"Eletrônica básica","ESP32 e Arduino","Sensores e aquisição de dados","Comunicação Wi-Fi e MQTT"}', 'em_breve', 1),
  ('tinyml', 'embarcada', 'Edge AI com TinyML',
   'Modelos de IA rodando dentro do microcontrolador, sem depender da nuvem.',
   'intermediario', null, '{presencial,online}',
   '{"Coleta e rotulagem de dados","Treino de modelos pequenos","Quantização e deploy no chip","Consumo de energia"}', 'em_breve', 2),
  ('visao-embarcada', 'embarcada', 'Visão Computacional Embarcada',
   'Câmeras que detectam, contam e inspecionam no chão de fábrica.',
   'avancado', null, '{presencial,in_company}',
   '{"Visão computacional essencial","Detecção de objetos","Inspeção de qualidade","Otimização em hardware embarcado"}', 'em_breve', 3),
  ('iot-industrial-ia', 'embarcada', 'IoT Industrial com IA',
   'Telemetria, manutenção preditiva e alertas — do Polo Industrial de Manaus ao seu chão de fábrica.',
   'avancado', null, '{presencial,in_company}',
   '{"Arquitetura IoT industrial","Telemetria e protocolos","Manutenção preditiva","Dashboards e alertas"}', 'em_breve', 4)
on conflict (id) do update set
  trilha_id = excluded.trilha_id, titulo = excluded.titulo, resumo = excluded.resumo, nivel = excluded.nivel,
  carga_horaria = excluded.carga_horaria, modalidades = excluded.modalidades, topicos = excluded.topicos,
  status = excluded.status, ordem = excluded.ordem, atualizado_em = now();
