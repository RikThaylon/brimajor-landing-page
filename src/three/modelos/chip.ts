// Modelo 3D procedural da Brimajor: placa de circuito com microcontrolador QFP-48, trilhas de cobre,
// vias, cristal, capacitores, LED, conector USB-C, antena e furos de fixação.
// Só usa three.js (sem DOM): roda no navegador e no Node (exportação .glb em scripts/export-models.mjs).
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export const PLACA = { largura: 14, profundidade: 9, espessura: 0.2 } as const;
const TOPO = PLACA.espessura / 2; // y da face de cima da placa
const CORPO = { lado: 3.4, altura: 0.42, folga: 0.05 } as const;
const PINOS_POR_LADO = 12;
const PASSO = 0.24;

export interface Rotulo { texto: string; x: number; z: number; rotacao?: number; tamanho?: number }
export interface Contorno { x: number; z: number; largura: number; profundidade: number; rotacao?: number }

export interface ModeloChip {
  grupo: THREE.Group;
  placa: THREE.Mesh;
  chip: THREE.Group;
  topoChip: THREE.Mesh; // janela do encapsulamento (recebe a textura com a marca no navegador)
  led: THREE.Mesh;
  trilhas: THREE.Mesh[]; // uma malha por trilha, para a animação de entrada
  caminhos: THREE.Vector3[][]; // polilinhas das trilhas, para os pulsos de dados
  componentes: THREE.Object3D[]; // peças que "caem" na montagem
  rotulos: Rotulo[]; // serigrafia (desenhada como textura no navegador)
  contornos: Contorno[];
  descartar(): void;
}

/** Gerador pseudoaleatório determinístico (mulberry32): o mesmo modelo a cada carregamento. */
export function aleatorio(semente: number) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function criarMateriais() {
  return {
    placa: new THREE.MeshStandardMaterial({ color: 0x071a3d, roughness: 0.62, metalness: 0.15 }),
    corpo: new THREE.MeshStandardMaterial({ color: 0x0b0d12, roughness: 0.42, metalness: 0.2 }),
    topoChip: new THREE.MeshStandardMaterial({ color: 0x0a1630, roughness: 0.35, metalness: 0.3, emissive: 0x0a3d99, emissiveIntensity: 0.55 }),
    metal: new THREE.MeshStandardMaterial({ color: 0xaab4c0, roughness: 0.38, metalness: 1 }),
    ouro: new THREE.MeshStandardMaterial({ color: 0xd8b25a, roughness: 0.32, metalness: 1 }),
    cobre: new THREE.MeshStandardMaterial({ color: 0x1d6bff, roughness: 0.4, metalness: 0.55, emissive: 0x0a4dff, emissiveIntensity: 0.35, transparent: true, opacity: 1 }),
    ceramica: new THREE.MeshStandardMaterial({ color: 0x8a6a45, roughness: 0.55, metalness: 0.05 }),
    resistor: new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 }),
    capa: new THREE.MeshStandardMaterial({ color: 0x1b3d8f, roughness: 0.45, metalness: 0.2 }),
    aluminio: new THREE.MeshStandardMaterial({ color: 0xb9c2cc, roughness: 0.25, metalness: 1 }),
    furo: new THREE.MeshStandardMaterial({ color: 0x010203, roughness: 1 }),
    led: new THREE.MeshStandardMaterial({ color: 0x66ccff, emissive: 0x33aaff, emissiveIntensity: 2.2, roughness: 0.2, transparent: true, opacity: 0.95 }),
  };
}

/** Perfil "asa de gaivota" de um pino QFP, extrudado na largura do pino. x = distância para fora do corpo. */
function geometriaPino() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.22);
  s.lineTo(0.17, 0.22);
  s.lineTo(0.31, 0.04);
  s.lineTo(0.52, 0.04);
  s.lineTo(0.52, 0);
  s.lineTo(0.29, 0);
  s.lineTo(0.15, 0.18);
  s.lineTo(0, 0.18);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.09, bevelEnabled: false });
  g.translate(0, 0, -0.045);
  return g;
}

/** Trilha de cobre: uma faixa achatada por segmento, unidas numa só geometria. */
function geometriaTrilha(pontos: THREE.Vector3[], largura = 0.07) {
  const partes: THREE.BufferGeometry[] = [];
  for (let i = 0; i < pontos.length - 1; i++) {
    const a = pontos[i];
    const b = pontos[i + 1];
    const comprimento = a.distanceTo(b);
    const seg = new THREE.BoxGeometry(comprimento + largura, 0.012, largura);
    seg.rotateY(-Math.atan2(b.z - a.z, b.x - a.x));
    seg.translate((a.x + b.x) / 2, TOPO + 0.006, (a.z + b.z) / 2);
    partes.push(seg);
  }
  const unida = mergeGeometries(partes, false);
  partes.forEach((p) => p.dispose());
  return unida;
}

interface Barramento { inicio: number; fim: number; sentido: -1 | 0 | 1 }
const BARRAMENTOS: Barramento[] = [
  { inicio: 0, fim: 4, sentido: -1 },
  { inicio: 4, fim: 8, sentido: 0 },
  { inicio: 8, fim: 12, sentido: 1 },
];

/** Polilinhas das trilhas saindo dos pinos em barramentos paralelos com curvas de 45°. */
function tracarCaminhos(sorteio: () => number): THREE.Vector3[][] {
  const caminhos: THREE.Vector3[][] = [];
  const raioPe = CORPO.lado / 2 + 0.52;
  const lados = [
    { normal: new THREE.Vector2(1, 0), tangente: new THREE.Vector2(0, 1), limite: PLACA.largura / 2 - 0.7 },
    { normal: new THREE.Vector2(-1, 0), tangente: new THREE.Vector2(0, -1), limite: PLACA.largura / 2 - 0.7 },
    { normal: new THREE.Vector2(0, 1), tangente: new THREE.Vector2(-1, 0), limite: PLACA.profundidade / 2 - 0.55 },
    { normal: new THREE.Vector2(0, -1), tangente: new THREE.Vector2(1, 0), limite: PLACA.profundidade / 2 - 0.55 },
  ];
  for (const lado of lados) {
    for (const bus of BARRAMENTOS) {
      const base = 0.25 + sorteio() * 0.35;
      const diagonal = bus.sentido === 0 ? 0 : 0.5 + sorteio() * 0.6;
      for (let i = bus.inicio; i < bus.fim; i++) {
        const t = (i - (PINOS_POR_LADO - 1) / 2) * PASSO;
        // Para continuarem paralelas, quem está do lado da curva vira primeiro.
        const ordem = bus.sentido === 1 ? bus.fim - 1 - i : i - bus.inicio;
        const reto1 = base + ordem * PASSO * 0.414;
        const fimExtra = 0.4 + sorteio() * (lado.limite - raioPe - reto1 - diagonal - 0.4);
        const p0 = lado.normal.clone().multiplyScalar(raioPe).add(lado.tangente.clone().multiplyScalar(t));
        const p1 = p0.clone().add(lado.normal.clone().multiplyScalar(reto1));
        const dir = lado.normal.clone().add(lado.tangente.clone().multiplyScalar(bus.sentido)).normalize();
        const p2 = p1.clone().add(dir.multiplyScalar(diagonal));
        const p3 = p2.clone().add(lado.normal.clone().multiplyScalar(Math.max(0.2, fimExtra)));
        const pontos = (bus.sentido === 0 ? [p0, p1, p3] : [p0, p1, p2, p3]).map((p) => new THREE.Vector3(p.x, TOPO + 0.012, p.y));
        caminhos.push(pontos);
      }
    }
  }
  return caminhos;
}

export function construirChip(opcoes: { semente?: number } = {}): ModeloChip {
  const sorteio = aleatorio(opcoes.semente ?? 2026);
  const m = criarMateriais();
  const geometrias: THREE.BufferGeometry[] = [];
  const usar = <G extends THREE.BufferGeometry>(g: G) => (geometrias.push(g), g);

  const grupo = new THREE.Group();
  grupo.name = "Brimajor-PlacaChip";

  // Placa (FR-4 com máscara de solda azul-escura)
  const placa = new THREE.Mesh(usar(new RoundedBoxGeometry(PLACA.largura, PLACA.espessura, PLACA.profundidade, 3, 0.08)), m.placa);
  placa.name = "Placa";
  placa.receiveShadow = true;
  grupo.add(placa);

  // Microcontrolador
  const chip = new THREE.Group();
  chip.name = "Microcontrolador-QFP48";
  const yCorpo = TOPO + CORPO.folga + CORPO.altura / 2;
  const corpo = new THREE.Mesh(usar(new RoundedBoxGeometry(CORPO.lado, CORPO.altura, CORPO.lado, 4, 0.06)), m.corpo);
  corpo.position.y = yCorpo;
  corpo.castShadow = true;
  chip.add(corpo);
  const topoGeo = usar(new THREE.PlaneGeometry(CORPO.lado - 0.5, CORPO.lado - 0.5));
  topoGeo.rotateX(-Math.PI / 2);
  const topoChip = new THREE.Mesh(topoGeo, m.topoChip);
  topoChip.position.y = yCorpo + CORPO.altura / 2 + 0.003;
  topoChip.name = "JanelaDaMarca";
  chip.add(topoChip);
  const marcaPino1 = new THREE.Mesh(usar(new THREE.CylinderGeometry(0.11, 0.11, 0.01, 24)), m.metal);
  marcaPino1.position.set(-CORPO.lado / 2 + 0.32, yCorpo + CORPO.altura / 2 + 0.004, -CORPO.lado / 2 + 0.32);
  chip.add(marcaPino1);

  const pinos = new THREE.InstancedMesh(usar(geometriaPino()), m.metal, PINOS_POR_LADO * 4);
  const pads = new THREE.InstancedMesh(usar(new THREE.BoxGeometry(0.3, 0.012, 0.13)), m.ouro, PINOS_POR_LADO * 4);
  const aux = new THREE.Object3D();
  let n = 0;
  for (let lado = 0; lado < 4; lado++) {
    const angulo = (lado * Math.PI) / 2;
    for (let i = 0; i < PINOS_POR_LADO; i++) {
      const t = (i - (PINOS_POR_LADO - 1) / 2) * PASSO;
      const local = new THREE.Vector3(CORPO.lado / 2, TOPO, t).applyAxisAngle(new THREE.Vector3(0, 1, 0), angulo);
      aux.position.copy(local);
      aux.rotation.set(0, angulo, 0);
      aux.updateMatrix();
      pinos.setMatrixAt(n, aux.matrix);
      const pe = new THREE.Vector3(CORPO.lado / 2 + 0.4, TOPO + 0.006, t).applyAxisAngle(new THREE.Vector3(0, 1, 0), angulo);
      aux.position.copy(pe);
      aux.updateMatrix();
      pads.setMatrixAt(n, aux.matrix);
      n++;
    }
  }
  pinos.name = "Pinos";
  pads.name = "Pads";
  chip.add(pinos);
  grupo.add(pads);
  grupo.add(chip);

  // Trilhas e vias
  const caminhos = tracarCaminhos(sorteio);
  const trilhas: THREE.Mesh[] = [];
  const geoVia = usar(new THREE.CylinderGeometry(0.11, 0.11, 0.016, 20));
  const geoFuroVia = usar(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 12));
  const vias = new THREE.InstancedMesh(geoVia, m.ouro, caminhos.length);
  const furosVia = new THREE.InstancedMesh(geoFuroVia, m.furo, caminhos.length);
  caminhos.forEach((pontos, i) => {
    const trilha = new THREE.Mesh(usar(geometriaTrilha(pontos)), m.cobre);
    trilha.name = `Trilha-${i + 1}`;
    trilhas.push(trilha);
    grupo.add(trilha);
    const fim = pontos[pontos.length - 1];
    aux.position.set(fim.x, TOPO + 0.008, fim.z);
    aux.rotation.set(0, 0, 0);
    aux.updateMatrix();
    vias.setMatrixAt(i, aux.matrix);
    aux.position.y = TOPO + 0.012;
    aux.updateMatrix();
    furosVia.setMatrixAt(i, aux.matrix);
  });
  vias.name = "Vias";
  grupo.add(vias, furosVia);

  const componentes: THREE.Object3D[] = [chip];
  const rotulos: Rotulo[] = [
    { texto: "U1", x: -2.25, z: -2.3, tamanho: 0.32 },
    { texto: "BRIMAJOR · MANAUS-AM", x: 0, z: 4.0, tamanho: 0.3 },
    { texto: "SISTEMAS EMBARCADOS & IA · REV 1.0", x: 0, z: -4.05, tamanho: 0.22 },
  ];
  const contornos: Contorno[] = [{ x: 0, z: 0, largura: CORPO.lado + 1.3, profundidade: CORPO.lado + 1.3 }];

  // Capacitores de desacoplamento nos cantos do chip
  const geoCap = usar(new THREE.BoxGeometry(0.42, 0.2, 0.22));
  const geoTerminal = usar(new THREE.BoxGeometry(0.09, 0.21, 0.23));
  const capacitor = (x: number, z: number, rot: number, nome: string) => {
    const g = new THREE.Group();
    g.name = nome;
    const corpoCap = new THREE.Mesh(geoCap, m.ceramica);
    const t1 = new THREE.Mesh(geoTerminal, m.metal);
    const t2 = new THREE.Mesh(geoTerminal, m.metal);
    t1.position.x = -0.2;
    t2.position.x = 0.2;
    g.add(corpoCap, t1, t2);
    g.position.set(x, TOPO + 0.1, z);
    g.rotation.y = rot;
    grupo.add(g);
    componentes.push(g);
  };
  [[2.05, 2.05], [-2.05, 2.05], [2.05, -2.05], [-2.05, -2.05]].forEach(([x, z], i) =>
    capacitor(x, z, Math.PI / 4 * (i % 2 === 0 ? 1 : -1), `C${i + 1}`),
  );

  // Cristal oscilador (lata metálica)
  const cristal = new THREE.Mesh(usar(new RoundedBoxGeometry(1.1, 0.42, 0.5, 3, 0.18)), m.aluminio);
  cristal.position.set(4.3, TOPO + 0.21, 3.0);
  cristal.name = "Y1-Cristal";
  grupo.add(cristal);
  componentes.push(cristal);
  rotulos.push({ texto: "Y1", x: 4.3, z: 2.45, tamanho: 0.26 });
  contornos.push({ x: 4.3, z: 3.0, largura: 1.4, profundidade: 0.8 });
  capacitor(3.4, 3.75, 0, "C5");
  capacitor(5.2, 3.75, 0, "C6");

  // LED de status
  const led = new THREE.Mesh(usar(new RoundedBoxGeometry(0.4, 0.2, 0.3, 2, 0.05)), m.led);
  led.position.set(6.0, TOPO + 0.1, 2.3);
  led.name = "LED1";
  grupo.add(led);
  componentes.push(led);
  rotulos.push({ texto: "LED1", x: 6.0, z: 1.85, tamanho: 0.2 });
  const resistor = new THREE.Group();
  const corpoR = new THREE.Mesh(usar(new THREE.BoxGeometry(0.4, 0.14, 0.2)), m.resistor);
  const rt1 = new THREE.Mesh(geoTerminal, m.metal);
  const rt2 = new THREE.Mesh(geoTerminal, m.metal);
  rt1.position.x = -0.19;
  rt2.position.x = 0.19;
  rt1.scale.y = rt2.scale.y = 0.7;
  resistor.add(corpoR, rt1, rt2);
  resistor.position.set(6.0, TOPO + 0.07, 3.1);
  resistor.name = "R1";
  grupo.add(resistor);
  componentes.push(resistor);

  // Capacitor eletrolítico
  const eletrolitico = new THREE.Group();
  eletrolitico.name = "C7-Eletrolitico";
  const lata = new THREE.Mesh(usar(new THREE.CylinderGeometry(0.5, 0.5, 0.95, 40)), m.capa);
  lata.position.y = 0.475;
  const tampa = new THREE.Mesh(usar(new THREE.CylinderGeometry(0.47, 0.47, 0.02, 40)), m.aluminio);
  tampa.position.y = 0.96;
  const base = new THREE.Mesh(usar(new THREE.BoxGeometry(1.08, 0.12, 1.08)), m.resistor);
  base.position.y = 0.06;
  eletrolitico.add(base, lata, tampa);
  eletrolitico.position.set(-4.9, TOPO, 3.2);
  grupo.add(eletrolitico);
  componentes.push(eletrolitico);
  rotulos.push({ texto: "C7", x: -4.9, z: 2.35, tamanho: 0.26 });
  capacitor(-3.7, 3.6, Math.PI / 2, "C8");

  // Conector USB-C na borda de cima
  const usb = new THREE.Mesh(usar(new RoundedBoxGeometry(1.0, 0.34, 0.8, 3, 0.15)), m.aluminio);
  usb.position.set(4.6, TOPO + 0.17, -PLACA.profundidade / 2 + 0.35);
  usb.name = "J1-USB-C";
  grupo.add(usb);
  componentes.push(usb);
  rotulos.push({ texto: "J1 USB-C", x: 4.6, z: -3.35, tamanho: 0.22 });

  // Antena em meandro (estilo módulo Wi-Fi)
  const meandro: THREE.Vector3[] = [];
  const ax = -6.3;
  const az = -3.7;
  for (let k = 0; k < 7; k++) {
    const x = ax + k * 0.32;
    meandro.push(new THREE.Vector3(x, TOPO + 0.012, k % 2 === 0 ? az : az + 0.7));
    meandro.push(new THREE.Vector3(x, TOPO + 0.012, k % 2 === 0 ? az + 0.7 : az));
  }
  const antena = new THREE.Mesh(usar(geometriaTrilha(meandro, 0.08)), m.ouro);
  antena.name = "Antena";
  grupo.add(antena);
  rotulos.push({ texto: "ANT", x: -5.35, z: -2.6, tamanho: 0.22 });

  // Furos de fixação
  const geoAnel = usar(new THREE.CylinderGeometry(0.34, 0.34, 0.014, 32));
  const geoFuro = usar(new THREE.CylinderGeometry(0.2, 0.2, 0.02, 24));
  for (const [x, z] of [[-6.5, -4.0], [6.5, -4.0], [-6.5, 4.0], [6.5, 4.0]]) {
    const anel = new THREE.Mesh(geoAnel, m.ouro);
    const furo = new THREE.Mesh(geoFuro, m.furo);
    anel.position.set(x, TOPO + 0.007, z);
    furo.position.set(x, TOPO + 0.012, z);
    grupo.add(anel, furo);
  }

  return {
    grupo,
    placa,
    chip,
    topoChip,
    led,
    trilhas,
    caminhos,
    componentes,
    rotulos,
    contornos,
    descartar() {
      geometrias.forEach((g) => g.dispose());
      Object.values(m).forEach((mat) => mat.dispose());
    },
  };
}
