// Layout do Mapa de Cursos em "linhas de metrô" (RF-05). Função pura e determinística: mesma entrada, mesmo desenho.
//  - horizontal (desktop): uma linha por trilha, estações em colunas de nível (iniciante → avançado);
//  - vertical (celular): um tronco "Comece aqui" de onde cada trilha desce com suas estações.
import { NIVEIS, type Curso, type Nivel, type Trilha } from "./tipos";

export type Orientacao = "horizontal" | "vertical";

export interface EstacaoLayout {
  curso: Curso;
  trilhaId: string;
  cor: string;
  x: number;
  y: number;
}

export interface LinhaLayout {
  trilha: Trilha;
  cor: string;
  d: string; // caminho SVG
  inicio: { x: number; y: number };
  fim: { x: number; y: number };
}

export interface ColunaNivel {
  nivel: Nivel;
  x: number; // centro da coluna
  inicio: number;
  fim: number;
}

export interface MapaLayout {
  orientacao: Orientacao;
  largura: number;
  altura: number;
  hub: { x: number; y: number };
  estacoes: EstacaoLayout[];
  linhas: LinhaLayout[];
  niveis: ColunaNivel[]; // só no horizontal
  rotulosTrilha: { trilha: Trilha; x: number; y: number }[];
  tronco: string | null; // só no vertical
}

export const MEDIDAS_HORIZONTAL = { hubX: 150, curva: 130, slot: 172, vaoNivel: 48, linha: 132, topo: 96, margem: 48 } as const;
export const MEDIDAS_VERTICAL = { troncoX: 22, linhaX: 54, topo: 28, cabecalho: 84, passo: 76, vaoTrilha: 40 } as const;

const r = (n: number) => Math.round(n * 10) / 10;

function cursosPorTrilha(trilhas: Trilha[], cursos: Curso[]) {
  return trilhas
    .map((trilha) => ({ trilha, cursos: cursos.filter((c) => c.trilhaId === trilha.id) }))
    .filter((g) => g.cursos.length > 0);
}

function ordemNivel(a: Curso, b: Curso) {
  return NIVEIS.indexOf(a.nivel) - NIVEIS.indexOf(b.nivel) || a.ordem - b.ordem;
}

export function layoutMapa(trilhas: Trilha[], cursos: Curso[], orientacao: Orientacao = "horizontal"): MapaLayout {
  const grupos = cursosPorTrilha(trilhas, cursos).map((g) => ({ ...g, cursos: [...g.cursos].sort(ordemNivel) }));
  return orientacao === "horizontal" ? horizontal(grupos) : vertical(grupos);
}

type Grupo = { trilha: Trilha; cursos: Curso[] };

function horizontal(grupos: Grupo[]): MapaLayout {
  const m = MEDIDAS_HORIZONTAL;
  // Quantas "vagas" cada nível precisa: o maior número de cursos de uma trilha naquele nível.
  const vagas = NIVEIS.map((nivel) => Math.max(1, ...grupos.map((g) => g.cursos.filter((c) => c.nivel === nivel).length)));
  const inicioX = m.hubX + m.curva + 40;
  const inicioNivel: number[] = [];
  let x = inicioX;
  NIVEIS.forEach((_, i) => {
    inicioNivel.push(x);
    x += vagas[i] * m.slot + m.vaoNivel;
  });
  const largura = x - m.vaoNivel + m.margem;
  const altura = m.topo + grupos.length * m.linha + m.margem / 2;
  const centroY = m.topo + (grupos.length * m.linha) / 2;
  const hub = { x: m.hubX, y: r(centroY) };

  const estacoes: EstacaoLayout[] = [];
  const linhas: LinhaLayout[] = [];
  const rotulosTrilha: MapaLayout["rotulosTrilha"] = [];

  grupos.forEach(({ trilha, cursos }, linhaIdx) => {
    const y = r(m.topo + linhaIdx * m.linha + m.linha / 2);
    NIVEIS.forEach((nivel, n) => {
      const doNivel = cursos.filter((c) => c.nivel === nivel);
      const deslocamento = (vagas[n] - doNivel.length) / 2;
      doNivel.forEach((curso, i) => {
        estacoes.push({ curso, trilhaId: trilha.id, cor: trilha.cor, x: r(inicioNivel[n] + (deslocamento + i) * m.slot + m.slot / 2), y });
      });
    });
    const xs = estacoes.filter((e) => e.trilhaId === trilha.id).map((e) => e.x);
    const fimX = r(Math.max(...xs) + 36);
    const entrada = hub.x + m.curva;
    const d = `M ${hub.x} ${hub.y} C ${r(hub.x + m.curva * 0.6)} ${hub.y}, ${r(entrada - m.curva * 0.6)} ${y}, ${entrada} ${y} H ${fimX}`;
    linhas.push({ trilha, cor: trilha.cor, d, inicio: hub, fim: { x: fimX, y } });
    rotulosTrilha.push({ trilha, x: entrada + 8, y: r(y - 30) });
  });

  const niveis: ColunaNivel[] = NIVEIS.map((nivel, i) => {
    const inicio = inicioNivel[i];
    const fim = inicio + vagas[i] * m.slot;
    return { nivel, inicio, fim, x: r((inicio + fim) / 2) };
  });

  return { orientacao: "horizontal", largura, altura, hub, estacoes, linhas, niveis, rotulosTrilha, tronco: null };
}

function vertical(grupos: Grupo[]): MapaLayout {
  const m = MEDIDAS_VERTICAL;
  const hub: { x: number; y: number } = { x: m.troncoX, y: m.topo };
  const estacoes: EstacaoLayout[] = [];
  const linhas: LinhaLayout[] = [];
  const rotulosTrilha: MapaLayout["rotulosTrilha"] = [];
  let cursor = m.topo + 24;
  let ultimoRamo: number = hub.y;

  for (const { trilha, cursos } of grupos) {
    const ramoY = cursor + 12; // onde a trilha sai do tronco
    const cabecalhoY = ramoY + 22;
    rotulosTrilha.push({ trilha, x: m.linhaX + 26, y: cabecalhoY });
    let y = ramoY + m.cabecalho;
    const ys: number[] = [];
    for (const curso of cursos) {
      estacoes.push({ curso, trilhaId: trilha.id, cor: trilha.cor, x: m.linhaX, y });
      ys.push(y);
      y += m.passo;
    }
    const fimY = ys[ys.length - 1] + 26;
    const d = `M ${m.troncoX} ${ramoY} C ${m.troncoX} ${ramoY + 22}, ${m.linhaX} ${ramoY + 10}, ${m.linhaX} ${ramoY + 34} V ${fimY}`;
    linhas.push({ trilha, cor: trilha.cor, d, inicio: { x: m.troncoX, y: ramoY }, fim: { x: m.linhaX, y: fimY } });
    ultimoRamo = ramoY;
    cursor = fimY + m.vaoTrilha;
  }

  const tronco = `M ${hub.x} ${hub.y} V ${ultimoRamo}`;
  return { orientacao: "vertical", largura: 0, altura: cursor, hub, estacoes, linhas, niveis: [], rotulosTrilha, tronco };
}
