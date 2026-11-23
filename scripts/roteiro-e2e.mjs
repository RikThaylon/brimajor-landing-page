// Roteiro ponta a ponta da Squad (cenários CEN-001, 003, 005, 006, 007, 008, 012 de docs/domain/OBJ-001-bdd.md).
// Pré-requisitos: site rodando (npm run build && PORT=3100 npm run start) e Playwright instalado
// (npm i -D playwright && npx playwright install chromium). Uso: DIR=/pasta/para/capturas node scripts/roteiro-e2e.mjs
// Roteiro E2E da Squad (CEN-001, 003, 005, 006, 007, 008, 012) — conferência com Playwright
import { chromium } from 'playwright';
const DIR = process.env.DIR || '.';
const B = process.env.SITE_URL || 'http://localhost:3100';
const ok = (c, msg) => {
  console.log(`${c ? 'PASSOU' : 'FALHOU'} · ${msg}`);
  if (!c) process.exitCode = 1;
};
(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const erros = [];
  let contexto;
  const nova = async (opts = {}) => {
    await contexto?.close();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    contexto = ctx;
    const p = await ctx.newPage();
    p.on('pageerror', (e) => erros.push(e.message));
    p.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) erros.push(m.text()); });
    return p;
  };

  // CEN-001 abertura: aparece na 1ª visita, botão "Pular abertura", some e não volta na mesma sessão
  let p = await nova();
  await p.goto(B + '/', { waitUntil: 'load' });
  await p.waitForTimeout(700);
  await p.screenshot({ path: `${DIR}/abertura-1.png` });
  ok(await p.locator('#abertura').isVisible(), 'CEN-001 abertura visível na primeira visita');
  ok(await p.getByRole('button', { name: 'Pular abertura' }).isVisible(), 'CEN-001 botão Pular abertura disponível');
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${DIR}/abertura-2.png` });
  const pular = p.getByRole('button', { name: 'Pular abertura' });
  if (await pular.isVisible()) await pular.click();
  await p.waitForTimeout(600);
  ok(!(await p.locator('#abertura').isVisible()), 'CEN-001 abertura some ao pular');
  await p.reload({ waitUntil: 'load' });
  await p.waitForTimeout(500);
  ok(!(await p.locator('#abertura').isVisible()), 'CEN-001 abertura não repete na mesma sessão');

  // CEN-003: a navegação chega a /cursos e a cortina libera a nova página.
  await p.waitForTimeout(1500);
  await p.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Cursos de IA' }).click();
  await p.waitForURL('**/cursos', { timeout: 8000 });
  await p.locator('#titulo-cursos').waitFor({ state: 'visible' });
  const cortina = p.locator('[data-cortina]');
  await cortina.evaluate(async el => {
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await Promise.allSettled(el.getAnimations().map(animacao => animacao.finished));
  });
  await cortina.waitFor({ state: 'hidden', timeout: 8000 });
  ok(p.url().endsWith('/cursos'), 'CEN-003 navegou para /cursos');
  const cortinaEscondida = await cortina.isHidden();
  ok(cortinaEscondida, 'CEN-003 cortina se revela depois');

  // CEN-005 estação abre o painel; Esc fecha e devolve o foco
  const mapa = p.locator('[data-mapa]').first();
  await mapa.scrollIntoViewIfNeeded();
  await p.waitForTimeout(3200);
  await p.screenshot({ path: `${DIR}/mapa.png` });
  const estacao = p.getByRole('button', { name: /^Engenharia de Contexto na Prática — Iniciante/ }).first();
  await estacao.focus();
  await p.keyboard.press('Enter');
  await p.waitForTimeout(900);
  const dialogo = p.getByRole('dialog', { name: 'Engenharia de Contexto na Prática' });
  ok(await dialogo.isVisible(), 'CEN-005 Enter na estação abre o painel do curso');
  await p.screenshot({ path: `${DIR}/painel.png` });
  ok(p.url().endsWith('#engenharia-contexto'), 'painel atualiza o endereço com #curso');
  // CEN-007 link do WhatsApp do curso
  const href = await dialogo.getByRole('link', { name: /Quero ser avisado/ }).getAttribute('href');
  const texto = new URL(href).searchParams.get('text');
  ok(href.startsWith('https://wa.me/5592985224523') && texto.includes('Engenharia de Contexto na Prática') && texto.includes('Engenharia de Contexto'), 'CEN-007 WhatsApp com título e trilha do curso');
  await p.keyboard.press('Escape');
  await p.waitForTimeout(500);
  ok(!(await dialogo.isVisible().catch(() => false)), 'CEN-005 Esc fecha o painel');
  const focoVoltou = await p.evaluate(() => document.activeElement?.getAttribute('aria-label')?.startsWith('Engenharia de Contexto'));
  ok(focoVoltou, 'CEN-005 foco volta para a estação');

  // CEN-006 filtros
  await p.getByRole('group', { name: 'Filtrar por trilha' }).getByRole('button', { name: 'Agentes e Squads' }).click();
  await p.getByRole('group', { name: 'Filtrar por nível' }).getByRole('button', { name: 'Avançado' }).click();
  const titulos = await p.locator('#titulo-lista').locator('xpath=ancestor::section[1]').locator('li h3').allTextContents();
  ok(JSON.stringify(titulos) === JSON.stringify(['Agentes de IA com Supervisão', 'Squads de Agentes para Equipes']), `CEN-006 filtro trilha+nível → ${titulos.join(', ')}`);
  await p.getByRole('group', { name: 'Filtrar por trilha' }).getByRole('button', { name: 'Começar com IA' }).click();
  ok(await p.getByText('Nenhum curso com esses filtros.').isVisible(), 'CEN-006 filtro sem resultado mostra mensagem');
  await p.getByRole('button', { name: 'Limpar filtros' }).click();
  ok((await p.locator('#titulo-lista').locator('xpath=ancestor::section[1]').locator('li h3').count()) === 9, 'CEN-006 Limpar filtros volta aos 9 cursos');

  // link direto /cursos#agentes-supervisionados abre o painel
  p = await nova();
  await p.goto(B + '/cursos?sem-abertura#agentes-supervisionados', { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  ok(await p.getByRole('dialog', { name: 'Agentes de IA com Supervisão' }).isVisible(), 'link direto #curso abre o painel');

  // CEN-008 formulário sem nome não envia
  await p.goto(B + '/?sem-abertura#contato', { waitUntil: 'load' });
  await p.waitForTimeout(1000);
  const botao = p.getByRole('button', { name: 'Conversar no WhatsApp' });
  ok(await botao.isDisabled(), 'CEN-008 botão desabilitado sem nome');
  await p.getByLabel(/Seu nome/).focus();
  await p.getByLabel('Assunto').focus();
  ok(await p.getByText('Informe seu nome.').isVisible(), 'CEN-008 mensagem "Informe seu nome." ao sair do campo vazio');

  // CEN-012 movimento reduzido: sem abertura, sem canvas, imagem estática
  p = await nova({ reducedMotion: 'reduce' });
  await p.goto(B + '/', { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  ok(!(await p.locator('#abertura').isVisible()), 'CEN-012 sem abertura com movimento reduzido');
  ok((await p.locator('canvas').count()) === 0, 'CEN-012 sem canvas 3D com movimento reduzido');
  ok(await p.locator('h1').isVisible(), 'CEN-012 conteúdo visível sem animação');
  await p.screenshot({ path: `${DIR}/reduzido.png` });

  // O menu continua ocupando a janela depois de rolar e libera a página no desktop.
  p = await nova({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await p.goto(B + '/?sem-abertura', { waitUntil: 'load' });
  await p.evaluate(() => window.scrollTo(0, 1000));
  const menu = p.getByRole('button', { name: 'Menu', exact: true });
  await menu.click();
  const menuAberto = p.getByRole('dialog', { name: 'Menu', exact: true });
  await menuAberto.waitFor();
  ok(await menuAberto.evaluate(el => el.getBoundingClientRect().height >= window.innerHeight - 1), 'menu ocupa a altura da janela depois de rolar');
  await p.keyboard.press('Escape');
  await menuAberto.waitFor({ state: 'detached' });
  ok(await menu.evaluate(el => el === document.activeElement), 'fechar o menu devolve o foco');
  await menu.click();
  await p.setViewportSize({ width: 1280, height: 800 });
  await menuAberto.waitFor({ state: 'detached' });
  ok(await p.evaluate(() => getComputedStyle(document.body).overflowY !== 'hidden'), 'trocar para desktop libera a rolagem');

  // sem JavaScript: conteúdo legível
  p = await nova({ javaScriptEnabled: false });
  await p.goto(B + '/cursos', { waitUntil: 'load' });
  ok(await p.getByRole('heading', { name: 'Todos os cursos' }).isVisible(), 'sem JavaScript a lista de cursos aparece');
  const opacidadeH1 = await p.locator('h1').evaluate((e) => getComputedStyle(e).opacity);
  ok(opacidadeH1 === '1', 'sem JavaScript o título fica visível');

  console.log(erros.length ? 'ERROS:\n' + erros.join('\n') : 'sem erros de página');
  await browser.close();
})();
