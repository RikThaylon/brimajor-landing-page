// Cena dos cursos: o cérebro-circuito da marca gira devagar, sinais percorrem as sinapses
// de neurônio em neurônio e o conjunto inclina na direção do mouse.
import * as THREE from "three";
import { criarControle, criarLaco, criarRenderizador, limitar, observarTamanho, seguir, suavizar, type ControleCena, type OpcoesCena } from "./base";
import { construirRedeNeural, type ModeloRede } from "./modelos/rede-neural";
import { texturaBrilho } from "./texturas";

const TOTAL_SINAIS = 70;

/** Sinais que andam pelas sinapses e, ao chegar num neurônio, seguem por outra ligação dele. */
function criarSinais(modelo: ModeloRede, brilho: THREE.Texture) {
  const vizinhos = new Map<number, number[]>();
  modelo.arestas.forEach(([a, b], i) => {
    vizinhos.set(a, [...(vizinhos.get(a) ?? []), i]);
    vizinhos.set(b, [...(vizinhos.get(b) ?? []), i]);
  });
  const p = modelo.posicoes;
  const ponto = (i: number, alvo: THREE.Vector3) => alvo.set(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]);
  const sinais = Array.from({ length: TOTAL_SINAIS }, (_, i) => ({
    aresta: (i * 53) % modelo.arestas.length,
    deA: true,
    t: (i * 0.173) % 1,
    velocidade: 0.7 + ((i * 11) % 7) * 0.12,
  }));
  const posicoes = new Float32Array(TOTAL_SINAIS * 3);
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute("position", new THREE.BufferAttribute(posicoes, 3));
  const material = new THREE.PointsMaterial({ map: brilho, size: 0.24, color: 0xbfe6ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();

  const proximaAresta = (s: (typeof sinais)[number], i: number, tempo: number) => {
    const [x, y] = modelo.arestas[s.aresta];
    const chegou = s.deA ? y : x;
    const saidas = (vizinhos.get(chegou) ?? []).filter((e) => e !== s.aresta);
    if (saidas.length) s.aresta = saidas[(i + Math.floor(tempo * 10)) % saidas.length];
    s.deA = modelo.arestas[s.aresta][0] === chegou;
    s.t = 0;
  };

  return {
    objeto: new THREE.Points(geometria, material),
    atualizar(tempo: number, delta: number, opacidade: number) {
      sinais.forEach((s, i) => {
        s.t += delta * s.velocidade;
        if (s.t >= 1) proximaAresta(s, i, tempo);
        const [x, y] = modelo.arestas[s.aresta];
        ponto(s.deA ? x : y, a);
        ponto(s.deA ? y : x, b);
        a.lerp(b, s.t);
        posicoes.set([a.x, a.y, a.z], i * 3);
      });
      geometria.attributes.position.needsUpdate = true;
      material.opacity = opacidade;
    },
    descartaveis: [geometria, material],
  };
}

export function montarCena(canvas: HTMLCanvasElement, opcoes: OpcoesCena): ControleCena {
  const renderer = criarRenderizador(canvas, { alpha: true, qualidade: opcoes.qualidade });
  renderer.setClearColor(0x000000, 0);
  const cena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
  camera.position.set(0, 0.1, 6.4);

  const modelo = construirRedeNeural();
  const brilho = texturaBrilho();
  const matNeuronios = modelo.neuronios.material as THREE.PointsMaterial;
  Object.assign(matNeuronios, { map: brilho, size: 0.16, blending: THREE.AdditiveBlending, needsUpdate: true });
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: brilho, color: 0x0a55ff, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending }));
  halo.scale.set(6.5, 6.5, 1);
  const sinais = criarSinais(modelo, brilho);
  const palco = new THREE.Group();
  palco.add(modelo.grupo, halo, sinais.objeto);
  palco.position.y = 0.25;
  cena.add(palco);

  const pararTamanho = observarTamanho(canvas.parentElement ?? canvas, (w, h) => {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = 6.4 * THREE.MathUtils.clamp(1.1 / camera.aspect, 1, 1.7);
    camera.updateProjectionMatrix();
  });

  const alvo = { x: 0, y: 0 };
  const atual = { x: 0, y: 0 };
  let pronto = false;
  const laco = criarLaco((tempo, delta) => {
    const entrada = suavizar(limitar(tempo / 1.6));
    palco.scale.setScalar(0.85 + entrada * 0.15);
    (modelo.ligacoes.material as THREE.LineBasicMaterial).opacity = 0.34 * entrada;
    matNeuronios.opacity = entrada;
    sinais.atualizar(tempo, delta, entrada);
    seguir(atual, alvo, delta, 2.5);
    palco.rotation.y = Math.sin(tempo * 0.25) * 0.5 + atual.x * 0.35;
    palco.rotation.x = 0.32 + atual.y * 0.18;
    halo.material.opacity = 0.3 + Math.sin(tempo * 1.3) * 0.06;
    renderer.render(cena, camera);
    if (!pronto) {
      pronto = true;
      opcoes.aoPronto?.();
    }
  });

  return criarControle(laco, alvo, () => {
    pararTamanho();
    modelo.descartar();
    [brilho, halo.material, renderer, ...sinais.descartaveis].forEach((d) => d.dispose());
  });
}
