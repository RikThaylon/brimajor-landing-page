// Modelo 3D procedural: o "cérebro-circuito" da marca Brimajor como rede neural.
// Dois hemisférios de neurônios ligados aos vizinhos mais próximos, com a fissura central e um tronco
// de circuito que desce até os pads — a mesma ideia do logo. Só usa three.js (sem DOM).
import * as THREE from "three";
import { aleatorio } from "./chip.ts";

export interface ModeloRede {
  grupo: THREE.Group;
  neuronios: THREE.Points;
  ligacoes: THREE.LineSegments;
  posicoes: Float32Array;
  arestas: Array<[number, number]>;
  descartar(): void;
}

const AZUL = new THREE.Color("#0066ff");
const NEON = new THREE.Color("#33aaff");
const CIANO = new THREE.Color("#7fe3ff");

/** Ponto dentro de um hemisfério: elipsoide achatado, mais denso perto da superfície (o córtex). */
function pontoHemisferio(sorteio: () => number, lado: -1 | 1): THREE.Vector3 {
  const u = sorteio() * 2 - 1;
  const teta = sorteio() * Math.PI * 2;
  const raio = 0.55 + 0.45 * Math.sqrt(sorteio());
  const s = Math.sqrt(1 - u * u);
  const p = new THREE.Vector3(s * Math.cos(teta), u, s * Math.sin(teta));
  p.multiply(new THREE.Vector3(0.88, 1.02, 1.2)).multiplyScalar(raio);
  // achata a face interna para abrir a fissura e "caída" do lobo temporal
  if (p.x * lado < 0) p.x *= 0.4;
  p.x += lado * 0.6;
  if (p.y < -0.25) p.x -= lado * 0.12 * (-0.25 - p.y);
  return p;
}

export function construirRedeNeural(opcoes: { semente?: number; neuronios?: number } = {}): ModeloRede {
  const sorteio = aleatorio(opcoes.semente ?? 1307);
  const total = opcoes.neuronios ?? 420;
  const pontos: THREE.Vector3[] = [];
  for (let i = 0; i < total; i++) pontos.push(pontoHemisferio(sorteio, i % 2 === 0 ? -1 : 1));

  // Tronco central do circuito: desce do meio do cérebro e se abre em três pads
  const tronco: THREE.Vector3[] = [];
  for (let k = 0; k <= 7; k++) tronco.push(new THREE.Vector3(0, 0.55 - k * 0.3, 0.05));
  const ramos = [
    [new THREE.Vector3(0, -1.0, 0.05), new THREE.Vector3(-0.35, -1.35, 0.05), new THREE.Vector3(-0.35, -1.75, 0.05)],
    [new THREE.Vector3(0, -1.0, 0.05), new THREE.Vector3(0.35, -1.35, 0.05), new THREE.Vector3(0.35, -1.75, 0.05)],
  ];
  const inicioCircuito = pontos.length;
  tronco.forEach((p) => pontos.push(p));
  ramos.forEach((r) => r.slice(1).forEach((p) => pontos.push(p)));

  // Ligações: cada neurônio aos 3 vizinhos mais próximos do mesmo hemisfério
  const arestas: Array<[number, number]> = [];
  const chave = new Set<string>();
  const ligar = (a: number, b: number) => {
    const k = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (!chave.has(k)) {
      chave.add(k);
      arestas.push([a, b]);
    }
  };
  for (let i = 0; i < inicioCircuito; i++) {
    const vizinhos = [];
    for (let j = 0; j < inicioCircuito; j++) {
      if (i === j || Math.sign(pontos[i].x) !== Math.sign(pontos[j].x)) continue;
      vizinhos.push({ j, d: pontos[i].distanceToSquared(pontos[j]) });
    }
    vizinhos.sort((a, b) => a.d - b.d);
    vizinhos.slice(0, 3).forEach((v) => v.d < 0.2 && ligar(i, v.j));
  }
  // Tronco ligado em sequência; o topo do tronco se liga aos neurônios mais próximos da fissura
  for (let k = 0; k < tronco.length - 1; k++) ligar(inicioCircuito + k, inicioCircuito + k + 1);
  const idxMeio = inicioCircuito + 5; // y ≈ -1.0
  const idxRamos = inicioCircuito + tronco.length;
  ligar(idxMeio, idxRamos);
  ligar(idxRamos, idxRamos + 1);
  ligar(idxMeio, idxRamos + 2);
  ligar(idxRamos + 2, idxRamos + 3);
  for (const lado of [-1, 1]) {
    const candidatos = pontos
      .slice(0, inicioCircuito)
      .map((p, i) => ({ i, d: p.distanceToSquared(new THREE.Vector3(lado * 0.25, 0.35, 0)) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    candidatos.forEach((c) => ligar(c.i, inicioCircuito));
  }

  const posicoes = new Float32Array(pontos.length * 3);
  const cores = new Float32Array(pontos.length * 3);
  pontos.forEach((p, i) => {
    posicoes.set([p.x, p.y, p.z], i * 3);
    const t = THREE.MathUtils.clamp((p.y + 1) / 2, 0, 1);
    const cor = i >= inicioCircuito ? CIANO.clone() : AZUL.clone().lerp(NEON, t).lerp(CIANO, sorteio() * 0.25);
    cores.set([cor.r, cor.g, cor.b], i * 3);
  });

  const geoPontos = new THREE.BufferGeometry();
  geoPontos.setAttribute("position", new THREE.BufferAttribute(posicoes, 3));
  geoPontos.setAttribute("color", new THREE.BufferAttribute(cores, 3));
  const matPontos = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.95, sizeAttenuation: true, depthWrite: false });
  const neuronios = new THREE.Points(geoPontos, matPontos);
  neuronios.name = "Neuronios";

  const posLinhas = new Float32Array(arestas.length * 6);
  const corLinhas = new Float32Array(arestas.length * 6);
  arestas.forEach(([a, b], i) => {
    posLinhas.set([pontos[a].x, pontos[a].y, pontos[a].z, pontos[b].x, pontos[b].y, pontos[b].z], i * 6);
    corLinhas.set([cores[a * 3], cores[a * 3 + 1], cores[a * 3 + 2], cores[b * 3], cores[b * 3 + 1], cores[b * 3 + 2]], i * 6);
  });
  const geoLinhas = new THREE.BufferGeometry();
  geoLinhas.setAttribute("position", new THREE.BufferAttribute(posLinhas, 3));
  geoLinhas.setAttribute("color", new THREE.BufferAttribute(corLinhas, 3));
  const matLinhas = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.38, depthWrite: false });
  const ligacoes = new THREE.LineSegments(geoLinhas, matLinhas);
  ligacoes.name = "Sinapses";

  const grupo = new THREE.Group();
  grupo.name = "Brimajor-CerebroCircuito";
  grupo.add(ligacoes, neuronios);

  return {
    grupo,
    neuronios,
    ligacoes,
    posicoes,
    arestas,
    descartar() {
      geoPontos.dispose();
      geoLinhas.dispose();
      matPontos.dispose();
      matLinhas.dispose();
    },
  };
}
