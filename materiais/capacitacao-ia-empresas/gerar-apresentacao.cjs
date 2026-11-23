/* eslint-disable @typescript-eslint/no-require-imports */
/* Gera a apresentação editável da capacitação empresarial em IA. */
const pptxgen = require("pptxgenjs");
const path = require("node:path");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Brimajor Sistemas Embarcados & IA";
pptx.company = "Brimajor";
pptx.subject = "Capacitação empresarial em IA, engenharia de contexto, processos, agentes e squads";
pptx.title = "IA na Prática para Empresas";
pptx.lang = "pt-BR";
pptx.theme = {
  headFontFace: "Open Sans",
  bodyFontFace: "Open Sans",
  lang: "pt-BR",
};
pptx.defineSlideMaster({
  title: "BRIMAJOR",
  background: { color: "F7FAFE" },
  objects: [],
  slideNumber: { x: 12.25, y: 7.08, w: 0.45, h: 0.18, color: "7A8CA5", fontFace: "Open Sans", fontSize: 8, align: "right", margin: 0 },
});

const C = {
  dark: "02050C",
  navy: "071426",
  blue: "0066FF",
  cyan: "33AAFF",
  mint: "2DD4BF",
  violet: "A78BFA",
  gold: "FBBF24",
  red: "EF4444",
  white: "FFFFFF",
  text: "172033",
  muted: "53637B",
  soft: "E7EEF7",
  bg: "F7FAFE",
};
const FONT = "Open Sans";
const logo = path.join(__dirname, "../../public/marca/brimajor-logo.png");
const icon = path.join(__dirname, "../../public/marca/brimajor-icone.png");
const out = path.join(__dirname, "apresentacao-ia-na-pratica.pptx");

function tx(slide, text, x, y, w, h, options = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: FONT,
    fontSize: 18,
    color: C.text,
    margin: 0,
    breakLine: false,
    fit: "shrink",
    valign: "mid",
    ...options,
  });
}

function box(slide, x, y, w, h, fill = C.white, line = C.soft, radius = 0.12) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: radius,
    fill: { color: fill },
    line: { color: line, width: 1 },
  });
}

function line(slide, x, y, w, h, color = C.soft, width = 1, endArrowType) {
  slide.addShape(pptx.ShapeType.line, {
    x, y, w, h,
    line: { color, width, ...(endArrowType ? { endArrowType } : {}) },
  });
}

function circleNumber(slide, n, x, y, color = C.blue, size = 0.42) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y, w: size, h: size,
    fill: { color },
    line: { color, transparency: 100 },
  });
  tx(slide, String(n), x, y, size, size, { color: C.white, bold: true, fontSize: 13, align: "center" });
}

function chrome(slide, kicker, number, dark = false) {
  const fg = dark ? C.white : C.text;
  const muted = dark ? "9FB0C8" : C.muted;
  slide.background = { color: dark ? C.dark : C.bg };
  tx(slide, kicker.toUpperCase(), 0.64, 0.28, 5.8, 0.22, { fontSize: 9, bold: true, color: dark ? C.cyan : C.blue, charSpacing: 1.2 });
  slide.addImage({ path: icon, x: 12.18, y: 0.18, w: 0.42, h: 0.46, transparency: dark ? 0 : 5 });
  line(slide, 0.64, 6.98, 11.96, 0, dark ? "1B3554" : "D9E4F0", 0.6);
  tx(slide, "BRIMAJOR · IA NA PRÁTICA PARA EMPRESAS", 0.64, 7.10, 5.5, 0.14, { fontSize: 7.5, color: muted, charSpacing: 0.6 });
  tx(slide, String(number).padStart(2, "0"), 11.75, 7.07, 0.85, 0.17, { fontSize: 8.5, bold: true, color: muted, align: "right" });
  return fg;
}

function title(slide, text, subtitle, dark = false) {
  tx(slide, text, 0.64, 0.76, 11.6, 0.72, { fontSize: 28, bold: true, color: dark ? C.white : C.dark, valign: "top", breakLine: true });
  if (subtitle) tx(slide, subtitle, 0.66, 1.49, 11.2, 0.42, { fontSize: 12.5, color: dark ? "B8C7DA" : C.muted, valign: "top" });
}

function pill(slide, text, x, y, w, color = C.blue, darkText = false) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.34, rectRadius: 0.17, fill: { color, transparency: 5 }, line: { color, transparency: 100 } });
  tx(slide, text.toUpperCase(), x, y + 0.01, w, 0.3, { fontSize: 8.5, bold: true, color: darkText ? C.dark : C.white, align: "center", charSpacing: 0.6 });
}

function note(slide, text, x, y, w, color = C.blue) {
  slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.06, h: 0.58, fill: { color }, line: { color, transparency: 100 } });
  tx(slide, text, x + 0.18, y, w - 0.18, 0.58, { fontSize: 12.5, bold: true, color: C.text, valign: "mid" });
}

function bullets(slide, items, x, y, w, h, options = {}) {
  const color = options.color || C.text;
  const size = options.fontSize || 16;
  const gap = h / items.length;
  items.forEach((item, i) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x, y: y + i * gap + 0.11, w: 0.10, h: 0.10,
      fill: { color: options.bulletColor || C.blue }, line: { color: options.bulletColor || C.blue, transparency: 100 },
    });
    tx(slide, item, x + 0.22, y + i * gap, w - 0.22, gap - 0.04, { fontSize: size, color, valign: "top", breakLine: true });
  });
}

// 01 · Capa
{
  const s = pptx.addSlide();
  s.background = { color: C.dark };
  s.addShape(pptx.ShapeType.ellipse, { x: 8.2, y: -1.1, w: 6.1, h: 6.1, fill: { color: C.blue, transparency: 78 }, line: { color: C.blue, transparency: 100 } });
  s.addShape(pptx.ShapeType.ellipse, { x: 9.0, y: 0.0, w: 4.7, h: 4.7, fill: { color: C.cyan, transparency: 88 }, line: { color: C.cyan, transparency: 100 } });
  s.addImage({ path: logo, x: 0.7, y: 0.45, w: 3.35, h: 1.43 });
  pill(s, "Capacitação empresarial", 0.72, 2.1, 2.35, C.blue);
  tx(s, "IA na Prática\npara Empresas", 0.72, 2.62, 7.5, 1.75, { fontSize: 34, bold: true, color: C.white, breakLine: true, valign: "top" });
  tx(s, "Engenharia de contexto, uso seguro, processos, agentes e squads — sem exigir programação.", 0.76, 4.55, 6.7, 0.72, { fontSize: 16, color: "B8C7DA", breakLine: true, valign: "top" });
  note(s, "Da primeira experiência a um piloto mensurável em 30 dias.", 0.76, 5.72, 6.3, C.cyan);
  tx(s, "Material para apresentação · 45–90 min", 0.76, 6.63, 4.2, 0.25, { fontSize: 9, color: "7F91AA" });
  s.addNotes("Abra alinhando expectativas: o objetivo não é ensinar programação. É mostrar uma forma segura e prática de aplicar IA no trabalho.");
}

// 02 · Resultado
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Objetivo", 2);
  title(s, "O que a equipe leva desta conversa", "Cinco decisões práticas para começar ou melhorar o uso de IA.");
  const cards = [
    ["01", "Escolher", "uma tarefa pequena, recorrente e revisável"],
    ["02", "Contextualizar", "com fontes, limites, formato e critérios"],
    ["03", "Proteger", "dados, decisões e responsabilidade humana"],
    ["04", "Medir", "qualidade e impacto contra uma linha de base"],
    ["05", "Evoluir", "de assistente a agentes somente quando fizer sentido"],
  ];
  cards.forEach((c, i) => {
    const x = 0.68 + (i % 3) * 4.08;
    const y = 2.12 + Math.floor(i / 3) * 2.02;
    const w = i >= 3 ? 4.08 : 3.82;
    box(s, x, y, w, 1.62, C.white, "DDE6F2");
    tx(s, c[0], x + 0.24, y + 0.2, 0.58, 0.4, { fontSize: 10, bold: true, color: C.blue });
    tx(s, c[1], x + 0.24, y + 0.57, w - 0.48, 0.34, { fontSize: 18, bold: true, color: C.dark });
    tx(s, c[2], x + 0.24, y + 0.98, w - 0.48, 0.44, { fontSize: 11, color: C.muted, valign: "top", breakLine: true });
  });
  note(s, "IA útil começa com trabalho bem definido — não com a ferramenta da moda.", 8.84, 4.16, 3.74, C.mint);
  s.addNotes("Peça para cada participante escolher mentalmente uma tarefa recorrente. Ela será usada nos exercícios seguintes.");
}

// 03 · Maturidade
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Trilhas", 3);
  title(s, "Quatro níveis de maturidade", "O próximo passo depende do processo e do risco — não apenas da familiaridade com uma ferramenta.");
  const levels = [
    [C.cyan, "1", "Começar com IA", "Entender capacidades, limites e primeiros usos seguros."],
    [C.mint, "2", "Engenharia de Contexto", "Obter resultados consistentes com referências e critérios."],
    [C.violet, "3", "IA nos Processos", "Criar rotinas supervisionadas, mensuráveis e melhoráveis."],
    [C.gold, "4", "Agentes e Squads", "Orquestrar papéis e ferramentas com limites explícitos."],
  ];
  levels.forEach((l, i) => {
    const x = 0.66 + i * 3.08;
    box(s, x, 2.2, 2.82, 3.35, C.white, l[0]);
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.25, y: 2.47, w: 0.64, h: 0.64, fill: { color: l[0] }, line: { color: l[0], transparency: 100 } });
    tx(s, l[1], x + 0.25, 2.47, 0.64, 0.64, { fontSize: 17, bold: true, align: "center", color: i === 3 ? C.dark : C.white });
    tx(s, l[2], x + 0.25, 3.32, 2.32, 0.74, { fontSize: 17, bold: true, color: C.dark, breakLine: true, valign: "top" });
    tx(s, l[3], x + 0.25, 4.23, 2.32, 0.92, { fontSize: 11.5, color: C.muted, breakLine: true, valign: "top" });
    if (i < 3) line(s, x + 2.83, 3.86, 0.25, 0, "94A7BF", 1.5, "triangle");
  });
  note(s, "Não pule para agentes antes de estabilizar contexto, processo e responsabilidade.", 2.24, 5.95, 8.9, C.gold);
  s.addNotes("Enfatize que empresas iniciantes e intermediárias são o foco. A trilha avançada existe para equipes que já possuem base e processo estável.");
}

// 04 · O que IA é
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Fundamentos", 4);
  title(s, "IA gera possibilidades; não garante verdade", "O modelo responde a partir do pedido e do contexto disponíveis.");
  box(s, 0.68, 2.12, 5.85, 3.72, "EFF8FF", C.cyan);
  pill(s, "Costuma ajudar", 0.98, 2.42, 1.55, C.cyan, true);
  bullets(s, ["rascunhar e estruturar", "resumir conteúdo fornecido", "transformar tom ou formato", "comparar segundo critérios", "classificar e extrair campos"], 1.02, 3.03, 4.9, 2.42, { fontSize: 15, bulletColor: C.cyan });
  box(s, 6.8, 2.12, 5.84, 3.72, "FFF8EA", C.gold);
  pill(s, "Exige cuidado", 7.1, 2.42, 1.55, C.gold, true);
  bullets(s, ["fatos atuais ou sem fonte", "decisões sobre pessoas", "dados pessoais e segredos", "jurídico, saúde e finanças", "erros difíceis de detectar"], 7.14, 3.03, 4.9, 2.42, { fontSize: 15, bulletColor: C.gold });
  note(s, "Quanto maior o custo do erro, menor deve ser a autonomia.", 3.46, 6.16, 6.4, C.red);
  s.addNotes("Use um exemplo: uma IA pode preparar perguntas para uma análise jurídica, mas não deve emitir a decisão final sem profissional responsável.");
}

// 05 · Seleção da tarefa
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Primeiro uso", 5);
  title(s, "Escolha a primeira tarefa com cinco perguntas", "Comece onde o aprendizado é rápido e o dano potencial é baixo.");
  const qs = [
    "A entrada já existe em formato digital?",
    "É possível descrever uma boa saída?",
    "Uma pessoa consegue revisar antes do uso?",
    "Um erro pode ser corrigido sem dano relevante?",
    "A tarefa se repete o bastante para gerar aprendizado?",
  ];
  qs.forEach((q, i) => {
    const y = 2.06 + i * 0.72;
    circleNumber(s, i + 1, 0.78, y, i < 4 ? C.blue : C.mint, 0.44);
    tx(s, q, 1.42, y - 0.01, 7.1, 0.46, { fontSize: 15, bold: i === 4, color: C.text });
    line(s, 1.42, y + 0.56, 7.0, 0, "DFE8F2", 0.7);
  });
  box(s, 9.12, 2.08, 3.47, 3.64, C.dark, C.dark);
  tx(s, "4–5 SIM", 9.45, 2.46, 2.8, 0.5, { fontSize: 23, bold: true, color: C.cyan });
  tx(s, "Boa candidata para um piloto controlado.", 9.45, 3.05, 2.64, 0.75, { fontSize: 14, color: C.white, breakLine: true, valign: "top" });
  line(s, 9.45, 4.02, 2.46, 0, "28405E", 1);
  tx(s, "Menos de 4", 9.45, 4.24, 2.5, 0.34, { fontSize: 13, bold: true, color: C.gold });
  tx(s, "Reduza o escopo ou organize o processo antes.", 9.45, 4.7, 2.64, 0.62, { fontSize: 12, color: "B8C7DA", breakLine: true, valign: "top" });
  note(s, "Exemplos: atas, comunicações, triagem e comparação de propostas.", 2.45, 6.12, 7.5, C.mint);
  s.addNotes("Dê dois minutos para a equipe pontuar uma tarefa real. Reforce que o processo mais importante raramente é o melhor primeiro piloto.");
}

// 06 · Fluxo
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Fluxo de trabalho", 6);
  title(s, "A IA entra no meio — a responsabilidade não sai", "Um fluxo simples separa preparação, geração, revisão e uso.");
  const steps = [
    ["1", "Pedido", "objetivo"],
    ["2", "Contexto", "fontes + limites"],
    ["3", "Rascunho", "IA"],
    ["4", "Revisão", "pessoa"],
    ["5", "Uso", "aprovado"],
  ];
  steps.forEach((st, i) => {
    const x = 0.72 + i * 2.5;
    box(s, x, 2.65, 2.05, 1.72, i === 3 ? "EEFBF8" : C.white, i === 3 ? C.mint : "D7E3F0");
    circleNumber(s, st[0], x + 0.2, 2.9, i === 3 ? C.mint : C.blue, 0.38);
    tx(s, st[1], x + 0.2, 3.43, 1.65, 0.28, { fontSize: 16, bold: true, color: C.dark });
    tx(s, st[2], x + 0.2, 3.79, 1.65, 0.24, { fontSize: 10, color: C.muted });
    if (i < 4) line(s, x + 2.05, 3.5, 0.45, 0, "8EA3BB", 1.8, "triangle");
  });
  line(s, 10.16, 4.76, -6.7, 0, C.mint, 1.4, "triangle");
  tx(s, "correção e aprendizado voltam para o contexto", 4.02, 4.96, 5.6, 0.3, { fontSize: 11, bold: true, color: C.mint, align: "center" });
  note(s, "Fonte, versão e aprovação precisam deixar evidência.", 3.2, 5.78, 6.95, C.blue);
  s.addNotes("Explique que a revisão não é um clique genérico em 'aprovar': ela usa critérios definidos antes da geração.");
}

// 07 · Engenharia de contexto
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Engenharia de contexto", 7);
  title(s, "Sete camadas para uma resposta útil", "Contexto é informação relevante, atual, autorizada e organizada.");
  const layers = [
    [C.blue, "Objetivo", "o que precisa ficar pronto"],
    [C.cyan, "Público", "quem vai usar ou receber"],
    [C.mint, "Cenário", "quando e por que acontece"],
    [C.violet, "Referências", "fontes, exemplos e dados"],
    [C.gold, "Restrições", "regras, prazos e proibições"],
    ["FF7A59", "Formato", "como a saída será entregue"],
    ["64748B", "Verificação", "como conferir qualidade"],
  ];
  layers.forEach((l, i) => {
    const col = i < 4 ? 0 : 1;
    const idx = i < 4 ? i : i - 4;
    const x = col === 0 ? 0.76 : 6.86;
    const y = 2.06 + idx * 0.91;
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.64, h: 0.68, rectRadius: 0.08, fill: { color: C.white }, line: { color: l[0], width: 1.2 } });
    s.addShape(pptx.ShapeType.rect, { x, y, w: 0.12, h: 0.68, fill: { color: l[0] }, line: { color: l[0], transparency: 100 } });
    tx(s, l[1], x + 0.3, y + 0.1, 1.58, 0.28, { fontSize: 13, bold: true, color: C.dark });
    tx(s, l[2], x + 1.88, y + 0.1, 3.42, 0.3, { fontSize: 11, color: C.muted });
  });
  box(s, 6.86, 4.91, 5.64, 0.79, C.dark, C.dark);
  tx(s, "resultado = tarefa + contexto + limites + revisão", 7.12, 5.09, 5.12, 0.35, { fontSize: 13.5, bold: true, color: C.white, align: "center" });
  note(s, "Mais texto não significa mais contexto.", 3.48, 6.12, 6.35, C.gold);
  s.addNotes("Contraste um prompt comprido e confuso com um cartão curto, versionado e baseado em fontes. Organização importa mais que volume.");
}

// 08 · Cartão
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Ferramenta", 8);
  title(s, "Cartão de contexto reutilizável", "Um padrão por tarefa reduz variação e permite melhoria coletiva.");
  box(s, 0.72, 2.02, 12.0, 3.96, C.white, C.blue);
  pill(s, "Modelo de uma página", 0.98, 2.28, 1.9, C.blue);
  const fields = [
    ["Tarefa e resultado", "O que precisa ficar pronto?"],
    ["Público e cenário", "Quem usa, quando e para quê?"],
    ["Referências", "Quais fontes e exemplos são autorizados?"],
    ["Regras e limites", "O que é obrigatório ou proibido?"],
    ["Formato", "Como a saída deve ser entregue?"],
    ["Verificação", "Como conferir e quem aprova?"],
  ];
  fields.forEach((f, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 1.0 + col * 5.83;
    const y = 2.92 + row * 0.88;
    tx(s, f[0], x, y, 1.75, 0.27, { fontSize: 11.5, bold: true, color: C.blue });
    tx(s, f[1], x + 1.76, y, 3.74, 0.3, { fontSize: 11, color: C.text });
    line(s, x, y + 0.47, 5.18, 0, "DFE8F2", 0.8);
  });
  tx(s, "Dono do cartão", 1.0, 5.55, 1.25, 0.25, { fontSize: 9.5, bold: true, color: C.muted });
  line(s, 2.25, 5.73, 2.4, 0, "AAB9CB", 0.8);
  tx(s, "Revisar em", 7.0, 5.55, 0.95, 0.25, { fontSize: 9.5, bold: true, color: C.muted });
  line(s, 7.95, 5.73, 2.4, 0, "AAB9CB", 0.8);
  note(s, "Guarde cartões, exemplos aprovados e falhas numa biblioteca de contexto.", 2.55, 6.22, 8.3, C.mint);
  s.addNotes("Use a apostila como folha de trabalho. Peça para o grupo preencher um cartão com uma tarefa real.");
}

// 09 · Antes e depois
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Exemplo", 9);
  title(s, "Do pedido vago ao trabalho verificável", "O segundo pedido não é só mais detalhado: ele pode ser revisado e reutilizado.");
  box(s, 0.7, 2.02, 4.0, 3.9, "FFF5F5", "F4A7A7");
  pill(s, "Antes", 0.98, 2.31, 0.9, C.red);
  tx(s, "“Faça um e-mail para nossos clientes sobre a mudança.”", 1.02, 3.0, 3.35, 1.15, { fontSize: 20, bold: true, color: C.text, breakLine: true, valign: "top" });
  tx(s, "Sem público, fonte, limite, formato ou critério de revisão.", 1.02, 4.65, 3.25, 0.72, { fontSize: 12, color: C.muted, breakLine: true, valign: "top" });
  box(s, 4.96, 2.02, 7.66, 3.9, "F0FBF8", C.mint);
  pill(s, "Depois", 5.24, 2.31, 1.05, C.mint, true);
  const rows = [
    ["Objetivo", "avisar a mudança do horário a partir de 1º/12"],
    ["Público", "clientes empresariais que já usam o suporte"],
    ["Fonte", "usar somente o comunicado interno aprovado"],
    ["Formato", "assunto até 55 caracteres; corpo até 140 palavras"],
    ["Verificação", "listar informações ausentes; não inventar"],
  ];
  rows.forEach((r, i) => {
    const y = 2.94 + i * 0.51;
    tx(s, r[0], 5.26, y, 1.12, 0.24, { fontSize: 10.5, bold: true, color: C.mint });
    tx(s, r[1], 6.42, y, 5.78, 0.25, { fontSize: 10.5, color: C.text });
  });
  note(s, "O pedido vira um ativo da equipe, não um truque individual.", 3.35, 6.22, 6.75, C.blue);
  s.addNotes("Mostre que o ganho principal é organizacional: alguém consegue atualizar a fonte, validar o padrão e treinar outra pessoa.");
}

// 10 · Segurança
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Uso seguro", 10);
  title(s, "Semáforo de dados", "Antes de perguntar à IA: a ferramenta é autorizada e este dado pode entrar?");
  const bands = [
    ["22C55E", "VERDE", "Público ou fictício", "Material público, treinamento, exemplos inventados.", "Use em ferramenta autorizada e revise."],
    [C.gold, "AMARELO", "Interno ou sensível", "Indicadores, contratos, informação de cliente anonimizada.", "Exija autorização, finalidade e controles."],
    [C.red, "VERMELHO", "Secreto ou regulado", "Senhas, documentos pessoais, saúde, segredo industrial.", "Não envie sem solução e proteção aprovadas."],
  ];
  bands.forEach((b, i) => {
    const y = 2.05 + i * 1.34;
    box(s, 0.72, y, 12.0, 1.08, C.white, b[0]);
    s.addShape(pptx.ShapeType.ellipse, { x: 0.98, y: y + 0.22, w: 0.62, h: 0.62, fill: { color: b[0] }, line: { color: b[0], transparency: 100 } });
    tx(s, b[1], 1.83, y + 0.18, 1.4, 0.26, { fontSize: 12, bold: true, color: b[0] });
    tx(s, b[2], 1.83, y + 0.5, 2.05, 0.25, { fontSize: 11.5, bold: true, color: C.text });
    tx(s, b[3], 4.07, y + 0.25, 4.15, 0.54, { fontSize: 10.5, color: C.muted, breakLine: true, valign: "top" });
    tx(s, b[4], 8.62, y + 0.25, 3.5, 0.54, { fontSize: 10.5, bold: true, color: C.text, breakLine: true, valign: "top" });
  });
  note(s, "Anonimizar é impedir reidentificação — não apenas apagar o nome.", 2.53, 6.16, 8.2, C.red);
  s.addNotes("A classificação exata deve ser adaptada à política e à legislação aplicável à empresa. Este slide é um ponto de partida.");
}

// 11 · Revisão
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Qualidade", 11);
  title(s, "Checklist antes de usar a saída", "Revisão humana precisa de perguntas objetivas.");
  const checks = [
    "Fatos conferidos na fonte original",
    "Números, datas, nomes e links corretos",
    "Objetivo e público atendidos",
    "Lacunas e invenções identificadas",
    "Dados sensíveis removidos ou protegidos",
    "Pessoa responsável aprovou o uso",
  ];
  checks.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.78 + col * 6.1;
    const y = 2.14 + row * 1.13;
    box(s, x, y, 5.65, 0.83, C.white, "DDE7F2");
    s.addShape(pptx.ShapeType.roundRect, { x: x + 0.22, y: y + 0.21, w: 0.39, h: 0.39, rectRadius: 0.05, fill: { color: C.bg }, line: { color: C.blue, width: 1.3 } });
    tx(s, c, x + 0.8, y + 0.15, 4.55, 0.5, { fontSize: 13.5, bold: true, color: C.text });
  });
  box(s, 2.02, 5.78, 9.25, 0.58, C.dark, C.dark);
  tx(s, "Erro encontrado? Corrija a saída e melhore o contexto para a próxima vez.", 2.28, 5.9, 8.73, 0.26, { fontSize: 12.5, bold: true, color: C.white, align: "center" });
  s.addNotes("A revisão serve também para aprender. Se o mesmo erro se repete, o cartão de contexto ou o processo precisa mudar.");
}

// 12 · Processo
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "IA nos processos", 12);
  title(s, "Mapeie antes de automatizar", "A IA ocupa etapas específicas; pessoas seguem responsáveis por decisões e exceções.");
  const stages = [
    ["1", "Gatilho", "o que inicia"],
    ["2", "Entrada", "dados disponíveis"],
    ["3", "Etapas", "onde IA ajuda"],
    ["4", "Decisões", "quem autoriza"],
    ["5", "Exceções", "para onde vão"],
    ["6", "Saída", "como validar"],
  ];
  stages.forEach((st, i) => {
    const x = 0.72 + i * 2.05;
    box(s, x, 2.35, 1.72, 1.58, C.white, i === 2 ? C.violet : "D9E4F0");
    circleNumber(s, st[0], x + 0.16, 2.56, i === 2 ? C.violet : C.blue, 0.36);
    tx(s, st[1], x + 0.16, 3.05, 1.39, 0.26, { fontSize: 13.5, bold: true, color: C.dark });
    tx(s, st[2], x + 0.16, 3.42, 1.39, 0.23, { fontSize: 9.5, color: C.muted });
    if (i < 5) line(s, x + 1.73, 3.13, 0.32, 0, "96A8BD", 1.4, "triangle");
  });
  const roles = [
    [C.blue, "IA", "prepara, extrai, resume, propõe e sinaliza"],
    [C.mint, "Pessoa", "define, autoriza, corrige e assume a decisão"],
    [C.violet, "Sistema", "controla acesso, aplica regras e registra evidências"],
  ];
  roles.forEach((r, i) => {
    const x = 0.86 + i * 4.08;
    box(s, x, 4.72, 3.72, 1.08, "FFFFFF", r[0]);
    tx(s, r[1], x + 0.22, 4.92, 0.8, 0.3, { fontSize: 14, bold: true, color: r[0] });
    tx(s, r[2], x + 1.02, 4.87, 2.45, 0.55, { fontSize: 10.5, color: C.text, breakLine: true, valign: "top" });
  });
  note(s, "Se o processo é confuso, automatizar só acelera a confusão.", 3.35, 6.15, 6.72, C.gold);
  s.addNotes("Peça para o grupo desenhar o processo atual, inclusive exceções. Não comece pela tela da ferramenta.");
}

// 13 · Piloto
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Piloto", 13);
  title(s, "Canvas de um piloto controlado", "Uma página deve explicar valor, controle e condição de parada.");
  const cells = [
    ["Problema", "Qual resultado precisa melhorar?"],
    ["Escopo", "Em qual etapa a IA ajudará?"],
    ["Contexto", "Quais fontes e regras entram?"],
    ["Qualidade", "Como uma boa saída é reconhecida?"],
    ["Responsáveis", "Quem revisa e quem aprova?"],
    ["Indicador", "Qual é a linha de base e a meta?"],
    ["Riscos", "Como interromper e recuperar?"],
    ["Prazo", "Que decisão será tomada em 30 dias?"],
  ];
  cells.forEach((c, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.72 + col * 3.05;
    const y = 2.08 + row * 1.72;
    box(s, x, y, 2.77, 1.44, C.white, i === 6 ? C.red : "D8E4F0");
    tx(s, c[0], x + 0.2, y + 0.2, 2.35, 0.27, { fontSize: 13, bold: true, color: i === 6 ? C.red : C.blue });
    tx(s, c[1], x + 0.2, y + 0.61, 2.35, 0.56, { fontSize: 10.5, color: C.muted, breakLine: true, valign: "top" });
  });
  box(s, 1.35, 5.75, 10.65, 0.55, "EEF7FF", C.cyan);
  tx(s, "Hipótese: se fizermos [mudança], então [indicador] irá de [base] para [meta], mantendo [qualidade].", 1.6, 5.88, 10.15, 0.25, { fontSize: 11.5, bold: true, color: C.text, align: "center" });
  s.addNotes("Mostre que o piloto precisa de comparação. Sem linha de base, qualquer melhora vira impressão.");
}

// 14 · Métricas
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Governança", 14);
  title(s, "Meça resultado, qualidade e risco juntos", "Uma métrica isolada pode incentivar o comportamento errado.");
  const metrics = [
    [C.blue, "Tempo", "minutos por tarefa\nfila e prazo"],
    [C.mint, "Qualidade", "aprovação\ncorreções e completude"],
    [C.violet, "Adoção", "pessoas ativas\nprocessos cobertos"],
    [C.red, "Risco", "incidentes\nexceções e bloqueios"],
    [C.gold, "Valor", "custo evitado\ncapacidade liberada"],
  ];
  metrics.forEach((m, i) => {
    const x = 0.7 + i * 2.48;
    box(s, x, 2.22, 2.2, 2.22, C.white, m[0]);
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.2, y: 2.48, w: 0.52, h: 0.52, fill: { color: m[0] }, line: { color: m[0], transparency: 100 } });
    tx(s, m[1], x + 0.2, 3.2, 1.8, 0.32, { fontSize: 15, bold: true, color: C.dark });
    tx(s, m[2], x + 0.2, 3.65, 1.8, 0.55, { fontSize: 10.5, color: C.muted, breakLine: true, valign: "top" });
  });
  box(s, 1.6, 5.02, 10.14, 0.83, C.dark, C.dark);
  tx(s, "Não premie “quantidade de uso”. Premie melhoria demonstrada com qualidade e controle.", 1.95, 5.18, 9.44, 0.46, { fontSize: 13.5, bold: true, color: C.white, align: "center" });
  note(s, "Registre também falhas — escondê-las impede a melhoria.", 3.75, 6.17, 5.86, C.red);
  s.addNotes("Uma meta de adoção sem qualidade pode aumentar retrabalho. Sempre use um conjunto equilibrado de indicadores.");
}

// 15 · Biblioteca
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Escala intermediária", 15);
  title(s, "Transforme bons usos em ativos da equipe", "O conhecimento precisa sobreviver à conversa individual com a IA.");
  const assets = [
    ["Cartões de contexto", "tarefas, fontes, regras e formato"],
    ["Exemplos aprovados", "bons resultados e contraprovas"],
    ["Checklists", "fatos, dados, tom e aprovação"],
    ["Registro de falhas", "causa, correção e prevenção"],
    ["Responsáveis", "dono, revisor e validade"],
    ["Métricas", "linha de base e resultado"],
  ];
  assets.forEach((a, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.72 + col * 4.08;
    const y = 2.1 + row * 1.55;
    box(s, x, y, 3.75, 1.24, C.white, "D9E4F0");
    circleNumber(s, i + 1, x + 0.2, y + 0.22, i < 3 ? C.blue : C.violet, 0.38);
    tx(s, a[0], x + 0.73, y + 0.19, 2.72, 0.32, { fontSize: 13.5, bold: true, color: C.dark });
    tx(s, a[1], x + 0.73, y + 0.62, 2.72, 0.31, { fontSize: 10.5, color: C.muted });
  });
  note(s, "Versione, revise e descarte contexto vencido.", 3.38, 5.62, 6.55, C.mint);
  tx(s, "Resultado: menos improviso, mais consistência e onboarding mais rápido.", 2.42, 6.25, 8.5, 0.3, { fontSize: 12, bold: true, color: C.blue, align: "center" });
  s.addNotes("A biblioteca pode começar simples: uma pasta ou wiki com dono e data de revisão. Tecnologia sofisticada não é pré-requisito.");
}

// 16 · Evolução
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Agentes", 16);
  title(s, "Assistente, copiloto, agente ou squad?", "Mais autonomia significa mais controles, testes e evidências.");
  const models = [
    [C.cyan, "Assistente", "responde a um pedido", "exploração"],
    [C.mint, "Copiloto", "apoia uma rotina humana", "processo conhecido"],
    [C.violet, "Agente", "executa várias etapas com ferramentas", "limites claros"],
    [C.gold, "Squad", "distribui o fluxo entre papéis", "especialização útil"],
  ];
  models.forEach((m, i) => {
    const x = 0.72 + i * 3.06;
    const h = 1.85 + i * 0.53;
    const y = 5.52 - h;
    box(s, x, y, 2.76, h, C.white, m[0]);
    tx(s, String(i + 1).padStart(2, "0"), x + 0.22, y + 0.22, 0.6, 0.28, { fontSize: 10, bold: true, color: m[0] });
    tx(s, m[1], x + 0.22, y + 0.7, 2.3, 0.37, { fontSize: 17, bold: true, color: C.dark });
    tx(s, m[2], x + 0.22, y + 1.2, 2.3, 0.74, { fontSize: 11, color: C.muted, breakLine: true, valign: "top" });
    pill(s, m[3], x + 0.22, y + h - 0.56, 1.55, m[0], i === 3);
    if (i < 3) line(s, x + 2.76, 4.88, 0.3, 0, "9AACBF", 1.4, "triangle");
  });
  note(s, "Use o modelo mais simples que resolve o problema.", 3.58, 6.07, 6.25, C.blue);
  s.addNotes("Uma squad não é automaticamente melhor. Se um copiloto resolve, ele será mais simples de governar e operar.");
}

// 17 · Squad
{
  const s = pptx.addSlide("BRIMAJOR");
  chrome(s, "Squads de agentes", 17);
  title(s, "Papéis especializados, passagens explícitas", "Uma squad organiza responsabilidade — não apenas várias IAs conversando.");
  const agents = [
    [C.blue, "Planejador", "decompõe e define critérios"],
    [C.violet, "Especialista", "produz com ferramentas limitadas"],
    [C.mint, "Revisor", "confere contra fontes e regras"],
  ];
  agents.forEach((a, i) => {
    const x = 0.92 + i * 4.12;
    box(s, x, 2.28, 3.38, 1.6, C.white, a[0]);
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.22, y: 2.56, w: 0.55, h: 0.55, fill: { color: a[0] }, line: { color: a[0], transparency: 100 } });
    tx(s, a[1], x + 0.95, 2.5, 2.14, 0.34, { fontSize: 15.5, bold: true, color: C.dark });
    tx(s, a[2], x + 0.95, 2.97, 2.12, 0.5, { fontSize: 10.5, color: C.muted, breakLine: true, valign: "top" });
    if (i < 2) line(s, x + 3.39, 3.08, 0.73, 0, "92A6BE", 1.8, "triangle");
  });
  box(s, 2.02, 4.52, 9.26, 1.04, C.dark, C.dark);
  tx(s, "PESSOA RESPONSÁVEL", 2.34, 4.7, 2.35, 0.27, { fontSize: 11, bold: true, color: C.cyan });
  tx(s, "autoriza mudanças relevantes · resolve exceções · responde pelo resultado", 4.62, 4.66, 6.18, 0.36, { fontSize: 12.5, color: C.white, align: "center" });
  line(s, 2.75, 4.5, 0, -0.59, C.cyan, 1.1, "triangle");
  line(s, 6.66, 4.5, 0, -0.59, C.cyan, 1.1, "triangle");
  line(s, 10.64, 4.5, 0, -0.59, C.cyan, 1.1, "triangle");
  note(s, "Cada papel precisa de entrada, saída, permissão e critério de passagem.", 2.52, 6.04, 8.3, C.gold);
  s.addNotes("A Brimajor pode ajudar outras equipes a desenhar e montar uma squad adequada ao processo delas. Não apresente uma squad interna específica como produto pronto.");
}

// 18 · Plano 30 dias
{
  const s = pptx.addSlide();
  chrome(s, "Próximo passo", 18, true);
  title(s, "Um piloto em 30 dias", "Pequeno, supervisionado e comparado com a forma atual de trabalhar.", true);
  const phases = [
    [C.cyan, "01–05", "Escolher", "tarefa + política mínima"],
    [C.mint, "06–10", "Preparar", "linha de base + contexto"],
    [C.violet, "11–20", "Testar", "amostra + revisão humana"],
    [C.gold, "21–25", "Aprender", "falhas + versão 2"],
    ["FF7A59", "26–30", "Decidir", "encerrar, repetir ou ampliar"],
  ];
  phases.forEach((p, i) => {
    const x = 0.7 + i * 2.5;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 2.35, w: 2.18, h: 2.32, rectRadius: 0.12, fill: { color: "0C1727" }, line: { color: p[0], width: 1.2 } });
    tx(s, p[1], x + 0.2, 2.62, 1.78, 0.3, { fontSize: 11, bold: true, color: p[0], align: "center" });
    tx(s, p[2], x + 0.2, 3.16, 1.78, 0.38, { fontSize: 17, bold: true, color: C.white, align: "center" });
    tx(s, p[3], x + 0.2, 3.78, 1.78, 0.55, { fontSize: 10.5, color: "A9B8CA", align: "center", breakLine: true, valign: "top" });
    if (i < 4) line(s, x + 2.18, 3.52, 0.32, 0, p[0], 1.7, "triangle");
  });
  tx(s, "Qual tarefa pequena e revisável merece o primeiro teste?", 1.45, 5.35, 10.45, 0.65, { fontSize: 22, bold: true, color: C.white, align: "center" });
  pill(s, "Brimajor · treinamentos in-company", 4.07, 6.25, 5.2, C.blue);
  s.addNotes("Feche escolhendo um dono e uma data para a primeira conversa do piloto. A decisão concreta vale mais do que uma lista longa de possibilidades.");
}

pptx.writeFile({ fileName: out });

