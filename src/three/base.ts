// Infraestrutura comum das cenas: renderizador, laço de animação que pausa fora da tela e redimensionamento.
import * as THREE from "three";

export interface ControleCena {
  iniciar(): void;
  parar(): void;
  ponteiro(x: number, y: number): void; // -1..1
  descartar(): void;
}

export interface OpcoesCena {
  qualidade: "alta" | "baixa";
  obterProgresso?: () => number; // 0..1, vindo do scroll
  aoPronto?: () => void;
}

export function criarRenderizador(canvas: HTMLCanvasElement, opcoes: { alpha: boolean; qualidade: "alta" | "baixa" }) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: opcoes.qualidade === "alta",
    alpha: opcoes.alpha,
    powerPreference: "high-performance",
    preserveDrawingBuffer: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opcoes.qualidade === "alta" ? 2 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  return renderer;
}

/** Laço com requestAnimationFrame que pode ser parado e retomado sem perder o relógio. */
export function criarLaco(quadro: (tempo: number, delta: number) => void) {
  let id = 0;
  let rodando = false;
  let anterior = 0;
  let tempo = 0;
  const passo = (agora: number) => {
    if (!rodando) return;
    const delta = anterior ? Math.min(0.05, (agora - anterior) / 1000) : 0.016;
    anterior = agora;
    tempo += delta;
    quadro(tempo, delta);
    id = requestAnimationFrame(passo);
  };
  return {
    iniciar() {
      if (rodando) return;
      rodando = true;
      anterior = 0;
      id = requestAnimationFrame(passo);
    },
    parar() {
      rodando = false;
      cancelAnimationFrame(id);
    },
  };
}

export function observarTamanho(elemento: HTMLElement, aoMudar: (largura: number, altura: number) => void) {
  const ro = new ResizeObserver(([entrada]) => {
    const { width, height } = entrada.contentRect;
    if (width > 0 && height > 0) aoMudar(width, height);
  });
  ro.observe(elemento);
  const r = elemento.getBoundingClientRect();
  if (r.width > 0 && r.height > 0) aoMudar(r.width, r.height);
  return () => ro.disconnect();
}

export const suavizar = (t: number) => t * t * (3 - 2 * t);
export const limitar = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Posição ao longo de uma polilinha, t em 0..1 (pelo comprimento). */
export function pontoNaPolilinha(pontos: THREE.Vector3[], comprimentos: number[], t: number, alvo: THREE.Vector3) {
  const total = comprimentos[comprimentos.length - 1];
  const d = t * total;
  let i = 1;
  while (i < comprimentos.length - 1 && comprimentos[i] < d) i++;
  const a = pontos[i - 1];
  const b = pontos[i];
  const trecho = comprimentos[i] - comprimentos[i - 1] || 1;
  return alvo.copy(a).lerp(b, (d - comprimentos[i - 1]) / trecho);
}

export function comprimentosAcumulados(pontos: THREE.Vector3[]) {
  const acc = [0];
  for (let i = 1; i < pontos.length; i++) acc.push(acc[i - 1] + pontos[i].distanceTo(pontos[i - 1]));
  return acc;
}

/** Controle comum das cenas: liga/desliga o laço, recebe o ponteiro e libera os recursos. */
export function criarControle(laco: { iniciar(): void; parar(): void }, alvo: { x: number; y: number }, liberar: () => void): ControleCena {
  return {
    iniciar: laco.iniciar,
    parar: laco.parar,
    ponteiro(x, y) {
      alvo.x = x;
      alvo.y = y;
    },
    descartar() {
      laco.parar();
      liberar();
    },
  };
}

/** Aproxima suavemente `atual` de `alvo` (inércia do ponteiro). */
export function seguir(atual: { x: number; y: number }, alvo: { x: number; y: number }, delta: number, rapidez: number) {
  const k = Math.min(1, delta * rapidez);
  atual.x += (alvo.x - atual.x) * k;
  atual.y += (alvo.y - atual.y) * k;
}
