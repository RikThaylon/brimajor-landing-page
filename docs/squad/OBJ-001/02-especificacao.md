# Especificação — OBJ-001

> Gate 2. É o contrato que a pessoa aprova e que o executor implementa. O que não está aqui não será construído.
> Requisitos: `01-requisitos.md` · Cenários: `docs/domain/OBJ-001-bdd.md` · UX: `02-ux-spec.md` · Decisão humana obrigatória.

## Resumo do que será construído

Um site novo da Brimajor, escuro e azul como a marca, com abertura animada, um chip 3D sobre placa de circuito que reage ao mouse e ao scroll, e transições de cena entre seções e páginas. Ele apresenta a empresa, os produtos e o modelo de trabalho, e traz o **Mapa de Cursos e Treinamentos de IA**: trilhas em forma de linhas de metrô, com detalhe de cada curso e inscrição pelo WhatsApp. O catálogo vem da Neon e pode ser editado por SQL.

## Contrato e interfaces

| Interface | Entrada | Saída | Validações |
|---|---|---|---|
| `GET /` | — | Página inicial (HTML estático, revalidado a cada 300 s) | — |
| `GET /cursos` | Âncora opcional `#<curso-id>` abre o painel do curso | Mapa + lista filtrável + formatos + como se inscrever | Âncora desconhecida é ignorada |
| `GET /squad` | — | Página do produto Brimajor Squad SDD | — |
| `GET /estoque`, `/estoque/dossie-tecnico`, `/iniciacoes` | — | Conteúdo do site atual no visual novo; dossiê com `noindex` | — |
| `getCatalogo(): Promise<Catalogo>` (servidor) | `DATABASE_URL` opcional | `{ trilhas, cursos, origem: 'neon' \| 'local' }` | Linhas inválidas são descartadas e registradas; status `encerrado` não sai |
| `linkWhatsApp(texto)` | Texto livre | `https://wa.me/5592985224523?text=<texto codificado>` | Texto cortado em 1.000 caracteres, sem quebra de codificação |
| `mensagemCurso(curso)` | Curso | "Olá, Brimajor! Tenho interesse no curso <título> (<trilha>, nível <nível>)…" | Varia pelo status (avisar vs. inscrever) |
| `layoutMapa(trilhas, cursos, orientacao)` | Catálogo, `'horizontal' \| 'vertical'` | Estações com x/y, caminhos SVG por trilha, dimensões | Determinístico; trilha sem curso não desenha linha |
| `filtrarCursos(cursos, { trilha, nivel })` | Filtros opcionais | Cursos ordenados por trilha, nível e ordem | Filtro vazio = todos |
| Formulário de contato | Nome (obrigatório, até 80), assunto (lista), mensagem (opcional, até 600) | Abre o WhatsApp em nova aba com a mensagem montada | Nome vazio desabilita o envio; nada é gravado |
| `<Foto nome="…">` (servidor) | Nome do espaço | `<img>` de `public/fotos/<arquivo>` se existir; senão arte gerada | Só arquivos listados em `lib/fotos.ts` |
| `npm run models:export` | — | `public/modelos/brimajor-chip.glb` e `brimajor-rede-neural.glb` | Falha com mensagem se o construtor lançar erro |

## Dados

Postgres na Neon, projeto `brimajor-site`, banco `neondb`. **Nenhum dado pessoal.**

- `trilhas` — `id text PK` (slug), `nome text not null`, `descricao text not null`, `cor text not null` (hex `#RRGGBB`), `ordem int not null`.
- `cursos` — `id text PK` (slug), `trilha_id text FK → trilhas`, `titulo text not null`, `resumo text not null`, `nivel text check in ('iniciante','intermediario','avancado')`, `carga_horaria int null` (horas; nulo = "a definir"), `modalidades text[] not null` (`presencial`, `online`, `in_company`), `topicos text[] not null`, `status text check in ('em_breve','inscricoes_abertas','encerrado')`, `ordem int not null`, `atualizado_em timestamptz default now()`.
- Migração: `db/schema.sql` (idempotente) e carga de exemplo `db/seed.sql` (cursos de exemplo, todos `em_breve`).
- O site só lê (`select`); a edição é feita pelo responsável no console SQL da Neon.

## Critérios de aceite

- [ ] RF-01 · CEN-001: abertura roda uma vez por sessão, tem botão "Pular" e não roda com movimento reduzido.
- [ ] RF-02 · CEN-002: o chip 3D aparece no hero, gira com o mouse e muda de enquadramento ao rolar; sem WebGL ou com movimento reduzido, aparece imagem estática.
- [ ] RF-03 · RF-12: seções da home e `/squad` com o conteúdo de `lib/conteudo.ts`, números da Squad iguais ao README.
- [ ] RF-04 · CEN-003: a troca de página cobre e revela a tela; com movimento reduzido, troca direta.
- [ ] RF-05 · CEN-004: uma linha por trilha com cursos, estações na ordem de nível; no celular o mapa fica vertical.
- [ ] RF-06 · CEN-005: clicar ou teclar Enter numa estação abre o painel; Esc fecha e o foco volta à estação.
- [ ] RF-07 · CEN-006: filtros de trilha e nível reduzem a lista; sem resultado, mensagem e botão "Limpar filtros".
- [ ] RF-08 · CEN-007/CEN-008: o botão do curso abre `wa.me/5592985224523` com o título do curso; formulário sem nome não envia.
- [ ] RF-09 · CEN-009/CEN-010: com `DATABASE_URL`, o catálogo vem da Neon; sem ele ou com erro, do catálogo local, sem quebrar a página.
- [ ] RF-10 · CEN-011: arquivo em `public/fotos/` aparece no lugar da arte.
- [ ] RF-11: build lista `/estoque`, `/estoque/dossie-tecnico` e `/iniciacoes`.
- [ ] RT-01..RT-06 conferidos no plano de testes e na revisão de UX.

## Erros e exceções

| Situação | Comportamento esperado | Mensagem ou código |
|---|---|---|
| `DATABASE_URL` ausente | Catálogo local | Nenhuma para o visitante; log `catalogo: origem local (sem DATABASE_URL)` |
| Neon fora do ar ou erro de consulta | Catálogo local; nova tentativa na próxima revalidação | Log `catalogo: falha na Neon, usando local` sem a URL |
| Linha de curso inválida (nível ou status desconhecido, trilha inexistente) | Linha descartada | Log com o `id` do curso |
| Navegador sem WebGL | Imagem estática do modelo | Texto alternativo do modelo |
| JavaScript desligado | Conteúdo legível, sem animações; lista de cursos visível | — |
| Âncora `#curso` inexistente | Página abre normalmente | — |
| Pop-up do WhatsApp bloqueado | O botão é um link comum (`<a target="_blank">`) | — |

## Qualidade exigida

- Segurança: `standards/security.md` — segredos só em variável de ambiente; consultas parametrizadas (sem entrada do visitante na SQL); CSP sem origens externas; `rel="noopener noreferrer"` em links externos; dependências sem vulnerabilidade conhecida (`npm audit`).
- UX e acessibilidade: `02-ux-spec.md`.
- Testes: `02-plano-de-testes.md`.
- Observabilidade: logs do servidor na Render indicam a origem do catálogo e falhas da Neon, sem connection string.

## Decisões e pendências

| Decisão | Motivo | Alternativa descartada |
|---|---|---|
| Site em `site/` deste repositório | Única permissão de escrita da sessão; pasta autocontida | Repositório `brimajor-landing-page` |
| Sem dados pessoais | Minimização (LGPD) e o WhatsApp atende | Tabela de interessados |
| Catálogo de exemplo `em_breve` | Cursos reais ainda não enviados | Página vazia "em breve" |
| three.js puro, modelos procedurais | Leve, autoral, exportável em `.glb` | React Three Fiber; modelos externos |
| Fotos por convenção de arquivo | Responsável envia depois sem mexer em código | Fotos de banco de imagens |

## Classificação de risco proposta

Complexidade **medium**, com a evidência: site público sem login nem dado pessoal; leitura de banco só no servidor, sem escrita; mudança reversível (pasta nova, publicação só após o Gate 5A e com o site atual preservado); exposição pública alta (é a vitrine da empresa), por isso a revisão de UX e acessibilidade é profunda.
