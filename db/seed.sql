-- Catálogo de capacitação empresarial em IA.
-- Público principal: empresas iniciantes e intermediárias. Programação não é pré-requisito.
-- Idempotente e mantido em sincronia com src/lib/cursos/catalogo-local.ts.

begin;

insert into trilhas (id, nome, descricao, cor, ordem) values
  ('fundamentos', 'Começar com IA',          'Para equipes com zero conhecimento que querem entender, experimentar e usar IA com segurança.',      '#33AAFF', 1),
  ('negocios',    'Engenharia de Contexto',  'Transformar pedidos soltos em instruções, referências e critérios que geram resultados consistentes.', '#2DD4BF', 2),
  ('dev',         'IA nos Processos',        'Para empresas que já usam IA e querem criar rotinas repetíveis, mensuráveis e supervisionadas.',    '#A78BFA', 3),
  ('embarcada',   'Agentes e Squads',        'Próximo passo para equipes maduras: agentes com ferramentas, papéis claros e revisão humana.',      '#FBBF24', 4)
on conflict (id) do update set
  nome = excluded.nome, descricao = excluded.descricao, cor = excluded.cor, ordem = excluded.ordem;

insert into cursos (id, trilha_id, titulo, resumo, nivel, carga_horaria, modalidades, topicos, status, ordem) values
  ('ia-na-pratica-empresas', 'fundamentos', 'IA na Prática para Empresas',
   'Entenda o que a IA faz, reconheça boas oportunidades e aplique-a em tarefas reais sem precisar programar.',
   'iniciante', 3, '{presencial,online,in_company}',
   '{"Como a IA funciona na prática","Tarefas em que ela ajuda ou atrapalha","Primeiros usos no trabalho","Plano de aplicação para 30 dias"}', 'em_breve', 1),
  ('uso-seguro-ia', 'fundamentos', 'Uso Seguro e Responsável de IA',
   'Use ferramentas de IA sem expor dados sensíveis e com uma rotina simples de verificação das respostas.',
   'iniciante', 2, '{online,in_company}',
   '{"Dados que podem ou não ser enviados","Erros e alucinações","Revisão humana","Política básica de uso na empresa"}', 'em_breve', 2),

  ('engenharia-contexto', 'negocios', 'Engenharia de Contexto na Prática',
   'Aprenda a fornecer objetivo, cenário, referências, regras e formato para obter respostas mais úteis e verificáveis.',
   'iniciante', 4, '{presencial,online,in_company}',
   '{"Objetivo e público","Referências e dados confiáveis","Restrições e critérios","Formato e checklist de qualidade"}', 'em_breve', 1),
  ('biblioteca-contexto', 'negocios', 'Biblioteca de Contexto da Empresa',
   'Organize exemplos, políticas, modelos e vocabulário para a equipe reutilizar conhecimento sem começar do zero.',
   'intermediario', 4, '{online,in_company}',
   '{"Cartões de contexto","Exemplos bons e ruins","Fontes e versões","Padrões reutilizáveis por área"}', 'em_breve', 2),

  ('ia-processos-empresa', 'dev', 'IA Aplicada aos Processos da Empresa',
   'Mapeie um processo e defina onde a IA pode apoiar, onde uma pessoa precisa decidir e como tratar exceções.',
   'intermediario', 4, '{presencial,online,in_company}',
   '{"Mapa do processo atual","Entradas e saídas","Pontos de decisão humana","Piloto de baixo risco"}', 'em_breve', 1),
  ('copilotos-equipes', 'dev', 'Copilotos para Equipes',
   'Crie formas consistentes de usar IA em atendimento, documentos, análise e rotinas internas.',
   'intermediario', 4, '{online,in_company}',
   '{"Casos por área","Fluxos com etapas","Base de conhecimento","Revisão e escalonamento"}', 'em_breve', 2),
  ('governanca-metricas-ia', 'dev', 'Governança e Métricas de IA',
   'Acompanhe qualidade, tempo poupado, riscos e adoção para melhorar o uso de IA sem perder controle.',
   'intermediario', 3, '{online,in_company}',
   '{"Critérios de qualidade","Indicadores de resultado","Registro de falhas","Ciclo de melhoria"}', 'em_breve', 3),

  ('agentes-supervisionados', 'embarcada', 'Agentes de IA com Supervisão',
   'Entenda como agentes usam contexto, ferramentas e memória para executar tarefas com limites e aprovação humana.',
   'avancado', 6, '{online,in_company}',
   '{"Tarefas adequadas para agentes","Ferramentas e permissões","Memória e estado","Supervisão, testes e limites"}', 'em_breve', 1),
  ('squads-agentes-equipes', 'embarcada', 'Squads de Agentes para Equipes',
   'Aprenda a distribuir um fluxo entre agentes especializados e a estruturar revisões, evidências e decisões humanas.',
   'avancado', 8, '{online,in_company}',
   '{"Papéis e responsabilidades","Orquestração e passagens de trabalho","Critérios de revisão","Montagem de uma squad para a empresa"}', 'em_breve', 2)
on conflict (id) do update set
  trilha_id = excluded.trilha_id, titulo = excluded.titulo, resumo = excluded.resumo, nivel = excluded.nivel,
  carga_horaria = excluded.carga_horaria, modalidades = excluded.modalidades, topicos = excluded.topicos,
  status = excluded.status, ordem = excluded.ordem, atualizado_em = now();

-- Preserva o histórico, mas retira do mapa as ofertas técnicas anteriores.
update cursos
set status = 'encerrado', atualizado_em = now()
where id in (
  'ia-do-zero', 'engenharia-de-prompt', 'ia-responsavel', 'ia-no-dia-a-dia',
  'analise-de-dados-com-ia', 'automacao-com-ia', 'dashboards-inteligentes',
  'python-para-ia', 'llms-rag-agentes', 'squad-sdd', 'microcontroladores-para-ia',
  'tinyml', 'visao-embarcada', 'iot-industrial-ia'
);

commit;
