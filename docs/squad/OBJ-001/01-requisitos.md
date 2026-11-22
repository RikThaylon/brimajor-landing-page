# Requisitos e regras — OBJ-001

> Gate 1. Cada item tem ID estável, fonte e forma de verificar. Fato, hipótese e proposta ficam separados.

## Requisitos funcionais

| ID | O sistema deve… | Fonte | Como verificar |
|---|---|---|---|
| RF-01 | Abrir com uma animação de marca (logo da Brimajor desenhado e revelado por cortina) na primeira visita da sessão, pulável e dispensada com "reduzir movimento" | Pedido: "transição, After Effects" | Cenário `@id:abertura`; conferência visual |
| RF-02 | Mostrar na página inicial um modelo 3D de chip sobre placa de circuito, que reage ao mouse e muda de enquadramento com o scroll | Pedido: "modele itens 3D" | Cenário `@id:hero-3d`; conferência visual desktop e celular |
| RF-03 | Apresentar a empresa: manifesto, frentes de atuação, produtos (Kanban Estoque, Brimajor Squad SDD), modelo de trabalho em 4 etapas, iniciações e contato | Pedido: "bem bonito sobre a minha empresa"; site atual | Conferência de conteúdo contra `lib/conteudo.ts` |
| RF-04 | Animar a troca entre páginas com uma cortina em camadas (cobre, navega, revela) | Pedido: "com transição" | Cenário `@id:transicao-pagina` |
| RF-05 | Exibir o Mapa de Cursos e Treinamentos de IA como linhas de metrô: uma linha por trilha, estações por curso, ordenadas por nível (iniciante → avançado) | Pedido: "mapa de cursos e treinamentos" | Cenário `@id:mapa-cursos`; teste unitário do layout |
| RF-06 | Abrir um painel com os detalhes do curso ao clicar (ou teclar Enter) numa estação ou cartão | Jornada UX | Cenário `@id:detalhe-curso` |
| RF-07 | Oferecer uma lista de cursos filtrável por trilha e nível como alternativa acessível ao mapa | Padrão de acessibilidade da squad | Cenário `@id:filtro-cursos`; teste unitário do filtro |
| RF-08 | Levar o interessado ao WhatsApp (92) 98522-4523 com a mensagem já escrita com o nome do curso, ou do assunto no formulário de contato | Pedido: "pagamento… falar no WhatsApp" | Cenário `@id:whatsapp-curso`; teste unitário do link |
| RF-09 | Ler trilhas e cursos do Postgres da Neon quando `DATABASE_URL` existir; sem banco ou com falha, usar o catálogo local | Pedido: "banco… na Neon" | Cenário `@id:catalogo-fallback`; teste unitário da normalização |
| RF-10 | Mostrar a foto colocada em `public/fotos/<nome>` no espaço correspondente; sem o arquivo, mostrar arte gerada | Pedido: "coloque imagens… peça imagens" | Cenário `@id:foto-autoral` |
| RF-11 | Manter as rotas `/estoque`, `/estoque/dossie-tecnico` e `/iniciacoes` do site atual | Site atual (links já divulgados) | Build lista as rotas; conferência visual |
| RF-12 | Apresentar a Brimajor Squad SDD em `/squad` | Produto da empresa (README do framework) | Conferência de conteúdo |

## Regras de negócio

| ID | Regra | Fonte e autoridade | Exceções |
|---|---|---|---|
| RN-01 | Inscrição e pagamento de cursos são combinados pelo WhatsApp; o site não cobra nem mostra preço | Rik Thaylon, no pedido | Quando houver meio de pagamento definido, novo recorte |
| RN-02 | Curso com status `em_breve` mostra "Em breve" e o botão "Quero ser avisado"; `inscricoes_abertas` mostra "Inscrições abertas" e "Quero me inscrever"; `encerrado` não aparece | Proposta da squad (cursos ainda em definição) | — |
| RN-03 | O catálogo inicial é de exemplo e fica com status `em_breve` até o responsável enviar os cursos reais | Rik Thaylon: "depois eu te mando esses cursos" | — |
| RN-04 | O site não grava dados pessoais; o formulário de contato só monta a mensagem e abre o WhatsApp | Decisão da squad (LGPD: minimização) | — |
| RN-05 | Números divulgados sobre a Squad SDD vêm do README do framework e a versão é apresentada como *release candidate* | README `v1.0.0-rc.5` | — |

## Requisitos técnicos e de qualidade

| ID | Requisito | Medida |
|---|---|---|
| RT-01 | Acessibilidade | WCAG 2.2 AA: contraste ≥ 4,5:1 no texto, foco visível, navegação por teclado no mapa, `prefers-reduced-motion` desliga animações de movimento e o 3D vira imagem estática |
| RT-02 | Desempenho | 3D carregado sob demanda (sem SSR), pausado fora da tela, `devicePixelRatio` limitado a 2; páginas estáticas com revalidação de 5 min |
| RT-03 | Segurança | Cabeçalhos de segurança (CSP, HSTS, nosniff, frame-ancestors); `DATABASE_URL` só no servidor, nunca no repositório; consultas sem concatenação de entrada |
| RT-04 | Disponibilidade | Falha do banco não derruba a página: catálogo local e registro do erro no log do servidor |
| RT-05 | Compatibilidade | Funciona em celular (360 px) e desktop; sem rolagem horizontal; WebGL ausente → imagem estática |
| RT-06 | Implantação | `npm run build` e `npm run start` no plano gratuito da Render, com *Root Directory* `site` |

## Solução candidata

Next.js 16 (App Router) com páginas renderizadas no servidor e revalidadas a cada 5 minutos. O conteúdo institucional fica num módulo de dados (`src/lib/conteudo.ts`); o catálogo de cursos vem de `src/lib/cursos/` — um repositório que consulta a Neon com o driver HTTP `@neondatabase/serverless` e cai para o catálogo local quando não há banco. Os modelos 3D são construídos em código com three.js (geometria procedural, sem arquivos externos) num componente cliente carregado sob demanda; o mesmo construtor exporta `.glb`. As animações usam GSAP (ScrollTrigger e SplitText). A inscrição gera links `wa.me` com a mensagem codificada.

### Alternativas consideradas

| Alternativa | Por que não agora |
|---|---|
| React Three Fiber + drei | Mais dependências e camada extra; three.js direto basta para duas cenas e dá controle fino de pausa e memória |
| Modelos 3D feitos no Blender (.glb) | Sem os arquivos de modelagem da empresa; modelo procedural é autoral, leve e editável em código, e ainda exporta `.glb` |
| Cadastro de interessados no banco | Exige base legal, aviso de privacidade e retenção (LGPD); WhatsApp resolve o objetivo sem guardar dados |
| Pagamento online (Pix/Stripe/Mercado Pago) | Meio de pagamento não decidido pelo responsável |
| Site no repositório `brimajor-landing-page` | Sem permissão de escrita nesta sessão; a pasta `site/` é autocontida e pode ser movida depois |

## Hipóteses e riscos

- Hipótese: o público acessa muito pelo celular → layout mobile-first e 3D leve; confirmar com analytics depois.
- Hipótese: o responsável quer substituir o site atual → confirmar no Gate 5A antes de apontar a Render para a pasta nova.
- Risco: WebGL pesado em celular antigo → limite de DPR, pausa fora da tela, imagem estática de reserva.
- Risco: cursos de exemplo parecerem oferta real → status "Em breve" e aviso de catálogo em construção na página.
- Risco: cold start do plano gratuito da Render (30–60 s) → fora do escopo do site; registrado no guia de deploy.
