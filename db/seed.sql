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
   '{"Como a IA funciona na prática","Tarefas em que ela ajuda ou atrapalha","Primeiros usos no trabalho","Plano de aplicação para 30 dias"}', 'inscricoes_abertas', 1),
  ('uso-seguro-ia', 'fundamentos', 'Uso Seguro e Responsável de IA',
   'Use ferramentas de IA sem expor dados sensíveis e com uma rotina simples de verificação das respostas.',
   'iniciante', 3, '{presencial,online,in_company}',
   '{"Dados que podem ou não ser enviados","Erros e alucinações","Revisão humana","Política básica de uso na empresa"}', 'inscricoes_abertas', 2),

  ('engenharia-contexto', 'negocios', 'Engenharia de Contexto',
   'Aprenda a fornecer objetivo, cenário, referências, regras e formato para obter respostas mais úteis e verificáveis.',
   'iniciante', 4, '{presencial,online,in_company}',
   '{"Objetivo e público","Referências e dados confiáveis","Restrições e critérios","Formato e checklist de qualidade"}', 'inscricoes_abertas', 1),

  ('ia-processos-empresa', 'dev', 'IA nos Processos e Copilotos',
   'Desenhe o apoio da IA dentro do trabalho real, com exceções, evidências e uma pessoa responsável pela decisão.',
   'intermediario', 5, '{presencial,online,in_company}',
   '{"Mapa do processo atual","Pontos de decisão humana","Copilotos por etapa","Exceções, evidências e métricas"}', 'inscricoes_abertas', 1),

  ('agentes-supervisionados', 'embarcada', 'Agentes e Squads Supervisionados',
   'Estruture agentes especializados com contexto, ferramentas, limites claros e supervisão humana.',
   'avancado', 6, '{online,in_company}',
   '{"Tarefas adequadas para agentes","Papéis e permissões","Orquestração e passagens","Supervisão, testes e limites"}', 'inscricoes_abertas', 1)
on conflict (id) do update set
  trilha_id = excluded.trilha_id, titulo = excluded.titulo, resumo = excluded.resumo, nivel = excluded.nivel,
  carga_horaria = excluded.carga_horaria, modalidades = excluded.modalidades, topicos = excluded.topicos,
  status = excluded.status, ordem = excluded.ordem, atualizado_em = now();

-- Preserva o histórico, mas retira do mapa as ofertas técnicas anteriores.
update cursos
set status = 'encerrado', atualizado_em = now()
where id in (
  'biblioteca-contexto', 'copilotos-equipes', 'governanca-metricas-ia', 'squads-agentes-equipes',
  'ia-do-zero', 'engenharia-de-prompt', 'ia-responsavel', 'ia-no-dia-a-dia',
  'analise-de-dados-com-ia', 'automacao-com-ia', 'dashboards-inteligentes',
  'python-para-ia', 'llms-rag-agentes', 'squad-sdd', 'microcontroladores-para-ia',
  'tinyml', 'visao-embarcada', 'iot-industrial-ia'
);

commit;
