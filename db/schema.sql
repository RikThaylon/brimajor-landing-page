-- Esquema do catálogo de cursos da Brimajor (Postgres / Neon).
-- Idempotente: pode rodar mais de uma vez. O site só LÊ estas tabelas.
-- Nenhum dado pessoal é guardado aqui.

create table if not exists trilhas (
  id         text primary key,                       -- slug, ex.: 'fundamentos'
  nome       text not null,
  descricao  text not null,
  cor        text not null check (cor ~ '^#[0-9A-Fa-f]{6}$'),  -- cor da linha no mapa
  ordem      int  not null default 0
);

create table if not exists cursos (
  id            text primary key,                    -- slug, ex.: 'engenharia-de-prompt'
  trilha_id     text not null references trilhas(id) on update cascade,
  titulo        text not null,
  resumo        text not null,
  nivel         text not null check (nivel in ('iniciante', 'intermediario', 'avancado')),
  carga_horaria int  check (carga_horaria is null or carga_horaria > 0),   -- horas; nulo = "a definir"
  modalidades   text[] not null default '{}',         -- 'presencial' | 'online' | 'in_company'
  topicos       text[] not null default '{}',
  status        text not null default 'em_breve'
                check (status in ('em_breve', 'inscricoes_abertas', 'encerrado')),
  ordem         int  not null default 0,
  atualizado_em timestamptz not null default now()
);

create index if not exists cursos_trilha_idx on cursos (trilha_id, ordem);
