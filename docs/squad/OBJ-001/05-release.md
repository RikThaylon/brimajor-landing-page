# Release — OBJ-001

> Gate 5A (liberação) e 5B (entrega). Prontidão técnica não é autorização: a decisão de liberar é humana.
> **Situação:** rascunho preparado para a decisão de Rik Thaylon. Nada foi publicado.

## Versão

`site 1.0.0` · candidato: último commit do branch `claude/nice-turing-kmk7rc` (pasta `site/`) · destino: Render (Web Service, plano gratuito), substituindo `brimajor.onrender.com` quando autorizado.

## O que muda

- Site novo da Brimajor: abertura animada, placa e chip 3D no hero com mergulho por scroll, transições entre páginas, seções institucionais e produtos.
- Página nova `/cursos`: Mapa de Cursos e Treinamentos de IA (linhas de metrô), painel de curso, lista filtrável e inscrição pelo WhatsApp.
- Página nova `/squad`: produto Brimajor Squad SDD.
- `/estoque`, `/estoque/dossie-tecnico` e `/iniciacoes` mantidas no visual novo.
- Catálogo de cursos lido do Postgres da Neon (projeto `brimajor-site`, usuário somente leitura `site_leitura`).

## Mudanças incompatíveis e migrações

Nenhuma rota do site atual deixa de existir. O site novo vem de outro repositório (`squad-framework-brimajor`, pasta `site/`), então a Render precisa de um serviço com *Root Directory* `site` — ou a pasta é copiada para `brimajor-landing-page`.

## Evidências de prontidão

- Quality gate da squad (estágio build): **passed** — sensores de segredos, segurança, clean code, acessibilidade e qualidade de testes, mais testes, lint e tipos. Relatório em `docs/evidence/quality/` (gerado a cada execução).
- Build de produção (`npm run build`): 12 rotas estáticas, revalidação de 5 min em `/` e `/cursos`.
- Testes unitários: 24 passando (`npm test`). Roteiro ponta a ponta: 23 verificações passando (`scripts/roteiro-e2e.mjs`).
- `npm audit`: 0 vulnerabilidades.
- Revisão sequencial (validador e guardiões): [`docs/evidence/OBJ-001/revisao-sequencial.md`](../../evidence/OBJ-001/revisao-sequencial.md).
- Quality gate estágio `release`: não executado nesta sessão (exige cobertura e RTM; ver pendências).

## Plano de entrega

1. Rik: dar o recibo do Gate 2 e autorizar o Gate 5A no Claude Code local (ver `estado-do-recorte.md`).
2. Rik: criar o Web Service na Render (README da pasta `site/`) com a variável `DATABASE_URL`, apontando para a branch revisada.
3. Conferir no endereço novo: home, `/cursos`, painel de um curso, botão do WhatsApp e log da Render com o catálogo vindo da Neon (sem a linha `catalogo: origem local`).
4. Só então trocar o domínio/serviço principal para o site novo.

## Plano de rollback

- Gatilho: página fora do ar, 3D quebrando o carregamento em celulares, catálogo vazio ou WhatsApp com número errado.
- Como reverter: manter o serviço atual (`brimajor-landing-page`) ativo até a validação; para reverter, apontar o domínio de volta para ele ou fazer "Rollback" para o deploy anterior no painel da Render (minutos, executado por Rik).
- Dados: o site só lê a Neon; nenhum dado é gravado pela versão nova.

## Verificações pós-entrega

| Verificação | Ambiente | Resultado | Quando |
|---|---|---|---|
| Home e `/cursos` respondem 200 | Render | pendente | após o deploy |
| Catálogo com origem `neon` (log da Render sem "origem local") | Render | pendente | após o deploy |
| Botão "Quero ser avisado" abre wa.me/5592985224523 com o curso | Render, celular | pendente | após o deploy |

## Pendências e acompanhamento

- Cursos reais (títulos, cargas horárias, status) — Rik, pelo SQL Editor da Neon.
- Fotos autorais em `public/fotos/` — Rik.
- Teste com leitor de tela real (NVDA/VoiceOver) — recomendado antes de divulgar.
- Cobertura de testes medida (`@vitest/coverage-v8`) e RTM para o estágio `release` do quality gate.
- Mover a pasta `site/` para o repositório `brimajor-landing-page`, se preferir manter o framework e o site separados.
