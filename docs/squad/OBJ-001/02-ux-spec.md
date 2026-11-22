# Especificação de UX — OBJ-001

> Gate 2, quando o recorte tem interface. Padrão: standards/ux-accessibility.md. A interface é especificada antes de ser construída.

## Quem usa e para quê

- **Gestor ou dono de empresa** (desktop, horário comercial): entender o que a Brimajor faz, ver seriedade técnica e chamar no WhatsApp para uma prova de conceito.
- **Pessoa que quer aprender IA** (celular, à noite): descobrir quais cursos existem, por onde começar e demonstrar interesse num curso.
- **RH ou líder de equipe** (desktop): avaliar treinamento in-company.

## Fluxo

1. Entra na home → abertura (≤ 2,4 s, pulável) → hero com chip 3D e duas ações: "Ver mapa de cursos" e "Falar no WhatsApp".
2. Rola: manifesto → frentes de atuação → produtos → modelo de trabalho → iniciações → chamada para cursos → contato.
3. Abre `/cursos` → entende as trilhas pela legenda → toca numa estação → painel do curso → "Quero ser avisado" / "Quero me inscrever" → WhatsApp.
4. Alternativa: na lista abaixo do mapa, filtra por trilha e nível e usa o mesmo botão.

Fluxos alternativos e saídas: fechar o painel (Esc, botão "Fechar" ou clique fora) devolve o foco à estação; "Limpar filtros" restaura a lista; o menu e o rodapé levam a qualquer página.

## Telas e componentes

| Tela ou componente | Conteúdo e ações | Componentes do design system |
|---|---|---|
| Abertura | Logo cérebro-circuito desenhado, contador 0–100, cortina; "Pular abertura" | `Abertura` |
| Menu | Logo, Início, Cursos, Squad SDD, Kanban Estoque, Iniciações, botão WhatsApp; no celular, menu em tela cheia | `Navegacao`, `LinkTransicao` |
| Hero | Título em linhas reveladas, subtítulo, 2 CTAs, chip 3D, indicador de rolagem | `CenaChip`, `TextoRevelado`, `Botao` |
| Manifesto | Frase grande que acende palavra a palavra com o scroll + foto/arte "Quem somos" | `TextoScrub`, `Foto` |
| Frentes | 4 cartões fixados em pilha com scroll | `CartoesEmpilhados` |
| Produtos | Kanban Estoque e Squad SDD com números | `CartaoProduto`, `Contador` |
| Modelo de trabalho | 4 etapas numa faixa horizontal rolada pelo scroll (no celular, vertical) | `FaixaHorizontal` |
| Cursos (chamada) | Rede neural 3D + resumo das trilhas + CTA | `CenaRedeNeural` |
| Contato | Formulário → WhatsApp | `FormularioContato` |
| `/cursos` | Hero, aviso "catálogo em construção", mapa, painel, lista filtrável, formatos, passo a passo | `MapaMetro`, `PainelCurso`, `ListaCursos` |
| Rodapé | Marca, navegação, contato, CNPJ, Instagram | `Rodape` |

## Estados

| Estado | O que a pessoa vê | O que pode fazer |
|---|---|---|
| Carregando | 3D: brilho pulsante no lugar do canvas; página: conteúdo já em HTML | Ler e navegar normalmente |
| Vazio | Lista sem resultado: "Nenhum curso com esses filtros." | "Limpar filtros" |
| Vazio (catálogo) | Sem nenhum curso: "Os primeiros cursos estão sendo preparados." | "Quero ser avisado" no WhatsApp |
| Erro | Banco fora: nada muda para a pessoa (catálogo local); sem WebGL: imagem estática | Navegar normalmente |
| Sucesso | Formulário: "Abrimos o WhatsApp numa nova aba. Se não abriu, toque aqui." | Link direto de reserva |

## Formulários e validação

Rótulos visíveis acima do campo. Nome obrigatório (até 80 caracteres): o botão fica desabilitado e, ao sair do campo vazio, aparece "Informe seu nome" ligado por `aria-describedby`. Assunto: lista (Prova de conceito, Cursos e treinamentos, Treinamento in-company, Kanban Estoque, Squad SDD, Outro). Mensagem opcional com contador (até 600). Nada é apagado se o WhatsApp não abrir.

## Conteúdo

Botões com verbo + objeto: "Ver mapa de cursos", "Falar no WhatsApp", "Quero ser avisado", "Quero me inscrever", "Limpar filtros", "Pular abertura", "Fechar". Português claro, sem jargão sem explicação; níveis escritos por extenso (Iniciante, Intermediário, Avançado).

## Acessibilidade

- Teclado: ordem de foco segue a leitura; "Pular para o conteúdo" como primeiro foco; estações do mapa são botões focáveis com Enter/Espaço; painel com foco preso enquanto aberto, Esc fecha e devolve o foco; menu do celular também prende o foco.
- Leitor de tela: canvas 3D com `role="img"` e `aria-label`; mapa SVG com título e descrição, e a lista de cursos como equivalente textual; painel com `role="dialog"`, `aria-modal` e título; contador da abertura `aria-hidden`.
- Visual: texto ≥ 4,5:1 sobre o fundo escuro (zinc-300 ou mais claro para corpo; neon #33AAFF para destaques); não depender só da cor das linhas — cada trilha tem nome e ícone na legenda e no painel; alvos de toque ≥ 44 px; zoom de 200% sem perda.
- Movimento: `prefers-reduced-motion` desliga abertura, cortina, scrub, parallax, rotação do 3D e textos revelados; o conteúdo aparece direto.

## Responsividade

- Celular (< 768 px): menu em tela cheia; hero com o chip abaixo do texto; cartões em coluna; faixa do modelo de trabalho vira lista vertical; mapa vertical; painel do curso ocupa a tela de baixo para cima.
- Tablet: duas colunas onde couber; mapa horizontal a partir de 768 px com rolagem interna se necessário.
- Desktop (≥ 1024 px): layout completo com cenas fixadas.

## Como será verificado

Sensor de acessibilidade da squad no quality gate; roteiro Playwright com teclado (Tab, Enter, Esc) e capturas em 1440 px e 390 px; contraste conferido nos tokens; revisão sequencial de UX registrada em `docs/evidence/OBJ-001/`.
