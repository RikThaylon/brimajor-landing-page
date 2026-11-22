# Validação e revisão dos guardiões — OBJ-001

> **Revisão sequencial, não independente.** Nesta sessão em nuvem os subagentes da squad (validador, guardiões) não estavam disponíveis; o mesmo agente que construiu fez a revisão em etapas declaradas, seguindo os padrões da squad. Pela regra da squad, isso **não** vale como validação independente: recomenda-se rodar `/squad-review` no Claude Code local antes do Gate 5A.
> Data: 2026-11-21 · Escopo: pasta `site/` · Especificação: `docs/squad/OBJ-001/02-especificacao.md`.

## Validador — especificação × construção

| Critério | Evidência | Resultado |
|---|---|---|
| RF-01 · CEN-001 abertura uma vez por sessão, pulável, desligada com movimento reduzido | roteiro E2E (4 verificações) | atende |
| RF-02 · CEN-002 chip 3D com mouse e scroll; estático sem WebGL/movimento | capturas desktop/celular; E2E CEN-012 | atende (mouse conferido visualmente, não automatizado) |
| RF-03 · RF-12 conteúdo institucional e da Squad | `src/lib/conteudo.ts`, números do README do framework | atende |
| RF-04 · CEN-003 cortina entre páginas | E2E (cobre, navega, revela) | atende |
| RF-05 · CEN-004/004B mapa horizontal e vertical | `tests/mapa.test.ts`; capturas 1440 px e 390 px | atende |
| RF-06 · CEN-005 painel por clique e Enter, Esc fecha, foco volta | E2E | atende |
| RF-07 · CEN-006 filtros e estado vazio | `tests/cursos.test.ts`; E2E | atende |
| RF-08 · CEN-007/008/015 WhatsApp | `tests/whatsapp.test.ts`, `tests/contato.test.ts`; E2E | atende |
| RF-09 · CEN-009/010/013/014 Neon com reserva local | `tests/repositorio.test.ts`; leitura real na Neon pelo console (14 cursos); build caiu para o local com log sem segredo | atende — a leitura real pelo site só será vista na Render (o proxy desta sessão bloqueia `*.neon.tech`) |
| RF-10 · CEN-011 foto substitui a arte | `src/components/foto.tsx` (procura `public/fotos/<nome>.*` no build) | atende por inspeção; sem foto real para testar |
| RF-11 rotas antigas | build lista `/estoque`, `/estoque/dossie-tecnico`, `/iniciacoes` | atende |
| RT-05 sem rolagem horizontal no celular | E2E 390 px: largura do documento = janela | atende |

## Guardião de segurança

- Segredos: `DATABASE_URL` só em `.env.local` (ignorado pelo Git) e no painel da Render; `git grep` sem credenciais; sensor de segredos sem achados (a URL fictícia do teste está suprimida com motivo).
- Banco: usuário `site_leitura` com papel somente leitura — `UPDATE` recusado com `permission denied` (conferido). Consultas fixas, sem entrada do visitante.
- Logs: mensagens de erro passam por `mensagemSegura` (oculta URL e senha) — coberto por teste.
- Cabeçalhos: CSP sem origens externas (`default-src 'self'`; `unsafe-eval` só em desenvolvimento), HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; `poweredByHeader` desligado.
- Links externos com `rel="noopener noreferrer"`. `dangerouslySetInnerHTML` só no script fixo do `<head>` (constante do próprio código), suprimido com motivo.
- Dependências: `npm audit` com 0 vulnerabilidades.
- Privacidade: nenhum dado pessoal é gravado; o formulário só monta a mensagem do WhatsApp (aviso visível no formulário).

## Guardião de UX e acessibilidade

- Teclado: "Pular para o conteúdo", foco visível, estações do mapa são botões, painel e menu com foco preso, Esc e retorno do foco (E2E).
- Leitor de tela: canvas 3D com `role="img"` e descrição; mapa SVG com título/descrição e lista equivalente; painel `role="dialog"` com título; filtros com `aria-pressed`; contagem com `aria-live`.
- Movimento: `prefers-reduced-motion` desliga abertura, cortina, scrub, rotação e grão; 3D vira imagem estática (E2E).
- Sem JavaScript: conteúdo e lista de cursos legíveis (E2E).
- Contraste dos tokens sobre `#02050c`: texto 16,9:1 · suave 9,1:1 · apagado 4,8:1 · neon 8,2:1.
- Pendente: teste com leitor de tela real e com zoom de 200% em celular.

## Guardião de clean code

Quality gate `build` aprovado. Achados médios restantes (não bloqueiam): `Hero` 67 linhas, `Abertura` 61, `montarCena` (chip) 64 — acima do limite de 60, já divididos em hooks e funções auxiliares; lista de ícones repetida entre o import e o mapa (necessária para o tree-shaking do lucide); `A11Y-PAGE-TITLE` e `UX-VIEWPORT` são falsos positivos (o Next gera `<title>` e `<meta viewport>` a partir de `metadata`/`viewport`, conferido no HTML servido); `scripts/roteiro-e2e.mjs` é um roteiro linear de 108 linhas (script de conferência, fora do código do site).

Framework: com `site/*` excluído do `quality.json` da raiz, o quality gate do framework continua aprovado e não analisa a pasta do site; `tools/seal.py --check`, `install.py verify` e a suíte do framework (547 testes) seguem passando.

## Guardião de testes

- 24 testes unitários com casos negativos (nível/trilha/status inválidos, banco fora do ar, tempo limite, URL com segredo, texto malicioso no WhatsApp, nome vazio, limites de tamanho). Cada teste cita o cenário (`covers: CEN-00N`).
- 23 verificações ponta a ponta (`scripts/roteiro-e2e.mjs`).
- Lacunas: cobertura de linhas não medida (pacote de cobertura não instalado); componentes visuais sem teste unitário (cobertos pelo roteiro E2E e conferência visual); sem RTM formal.

## Arquitetura e release

- Páginas estáticas com revalidação de 5 min; o banco é lido só no servidor, com tempo limite de 8 s e reserva local — falha da Neon não derruba o site.
- 3D carregado sob demanda, pausado fora da tela e com qualidade reduzida em toque/telas pequenas; bloom só no desktop.
- Deploy: `render.yaml` com *Root Directory* `site`; rollback mantendo o serviço atual até a validação (ver `05-release.md`).
- Observação: o site está dentro do repositório do framework por limitação de permissão desta sessão; recomenda-se movê-lo para `brimajor-landing-page`.
