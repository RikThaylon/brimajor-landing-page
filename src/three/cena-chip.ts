// Cena do hero: a placa da Brimajor se monta, pulsos de dados correm pelas trilhas, a placa segue o mouse
// e a câmera mergulha no chip conforme o scroll (progresso 0 → 1).
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  comprimentosAcumulados,
  criarLaco,
  criarRenderizador,
  limitar,
  observarTamanho,
  pontoNaPolilinha,
  suavizar,
  criarControle,
  seguir,
  type ControleCena,
  type OpcoesCena,
} from "./base";
import { construirChip, type ModeloChip } from "./modelos/chip";
import { carregarImagem, texturaBrilho, texturaSerigrafia, texturaTopoChip } from "./texturas";

const COR_FUNDO = new THREE.Color("#02050c");
const TOTAL_PULSOS = 42;
const CAMERA_FINAL = new THREE.Vector3(0.35, 2.7, 2.5);
const OLHAR_INICIAL = new THREE.Vector3(0, -0.4, 0);
const OLHAR_FINAL = new THREE.Vector3(0, 0.35, -0.1);

type Descartavel = { dispose(): void };

/** Ambiente de estúdio (reflexos nos metais) e as luzes: chave, contraluz azul e a luz que pulsa sobre o chip. */
function montarIluminacao(renderer: THREE.WebGLRenderer, cena: THREE.Scene) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const estudio = new RoomEnvironment();
  const mapa = pmrem.fromScene(estudio, 0.04);
  estudio.dispose();
  pmrem.dispose();
  cena.environment = mapa.texture;
  cena.environmentIntensity = 0.55;
  const chave = new THREE.DirectionalLight(0xffffff, 1.5);
  chave.position.set(6, 10, 6);
  const contra = new THREE.DirectionalLight(0x2f8cff, 2.4);
  contra.position.set(-7, 3, -9);
  const luzChip = new THREE.PointLight(0x2f8cff, 8, 7, 1.6);
  luzChip.position.set(0, 1.6, 0);
  cena.add(new THREE.AmbientLight(0x2a4a99, 0.35), chave, contra, luzChip);
  return { luzChip, mapa };
}

/** Aplica a serigrafia na placa e a marca da Brimajor no topo do chip. */
function vestirModelo(modelo: ModeloChip, renderer: THREE.WebGLRenderer) {
  let descartado = false;
  const placa = modelo.placa.material as THREE.MeshStandardMaterial;
  placa.map = texturaSerigrafia(modelo.rotulos, modelo.contornos, renderer);
  placa.color.set(0xffffff);
  placa.needsUpdate = true;
  const topo = modelo.topoChip.material as THREE.MeshStandardMaterial;
  carregarImagem("/marca/brimajor-icone.png").then((icone) => {
    if (descartado) return;
    const textura = texturaTopoChip(icone, renderer);
    topo.map = textura;
    topo.emissiveMap = textura;
    topo.color.set(0xffffff);
    topo.emissive.set(0xffffff);
    topo.needsUpdate = true;
  });
  return { topo, descartar() {
    descartado = true;
    placa.map?.dispose();
    topo.map?.dispose();
  } };
}

/** Pontos de luz que percorrem as trilhas de cobre (dados saindo e chegando no chip). */
function criarPulsos(modelo: ModeloChip, brilho: THREE.Texture) {
  const caminhos = modelo.caminhos.map((pontos) => ({ pontos, acc: comprimentosAcumulados(pontos) }));
  const posicoes = new Float32Array(TOTAL_PULSOS * 3);
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute("position", new THREE.BufferAttribute(posicoes, 3).setUsage(THREE.DynamicDrawUsage));
  const material = new THREE.PointsMaterial({ map: brilho, size: 0.42, color: 0x9fd8ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const pulsos = Array.from({ length: TOTAL_PULSOS }, (_, i) => ({
    caminho: i % caminhos.length,
    t: (i * 0.137) % 1,
    velocidade: 0.18 + ((i * 7) % 10) * 0.025,
    saindo: i % 3 !== 0,
  }));
  const aux = new THREE.Vector3();
  return {
    objeto: new THREE.Points(geometria, material),
    atualizar(tempo: number, delta: number) {
      pulsos.forEach((pulso, i) => {
        pulso.t += delta * pulso.velocidade * (tempo > 1.6 ? 1 : 0);
        if (pulso.t > 1) {
          pulso.t = 0;
          pulso.caminho = (pulso.caminho + 7 + i) % caminhos.length;
        }
        const c = caminhos[pulso.caminho];
        pontoNaPolilinha(c.pontos, c.acc, pulso.saindo ? pulso.t : 1 - pulso.t, aux);
        aux.y += 0.03;
        aux.toArray(posicoes, i * 3);
      });
      geometria.attributes.position.needsUpdate = true;
      material.opacity = limitar((tempo - 1.4) / 0.8);
    },
    descartaveis: [geometria, material] as Descartavel[],
  };
}

/** Montagem da placa: as peças caem no lugar e as trilhas acendem em sequência (~2 s). */
function criarMontagem(modelo: ModeloChip) {
  const baseY = modelo.componentes.map((c) => c.position.y);
  const ordem = modelo.trilhas.map((_, i) => i).sort((a, b) => ((a * 37) % 48) - ((b * 37) % 48));
  // As 48 trilhas usam o mesmo cobre. Revelamos um único buffer na ordem original.
  const partes = ordem.map((i) => modelo.trilhas[i].geometry);
  const geometria = mergeGeometries(partes);
  const limites = [0];
  for (const parte of partes) limites.push(limites[limites.length - 1] + parte.getIndex()!.count);
  modelo.grupo.remove(...modelo.trilhas);
  modelo.grupo.add(new THREE.Mesh(geometria, modelo.trilhas[0].material));
  geometria.setDrawRange(0, 0);
  let concluida = false;
  return {
    atualizar(tempo: number) {
      if (concluida) return;
      modelo.componentes.forEach((c, i) => {
        const k = suavizar(limitar((tempo - 0.15 - i * 0.07) / 0.6));
        c.position.y = baseY[i] + (1 - k) * 2.2;
        c.visible = k > 0.001;
      });
      const quantidade = limitar(Math.ceil((tempo - 0.5) / 0.025), 0, partes.length);
      geometria.setDrawRange(0, limites[quantidade]);
      concluida = quantidade === partes.length && tempo >= 0.75 + (modelo.componentes.length - 1) * 0.07;
    },
    descartar: () => geometria.dispose(),
  };
}

function criarPosProcessamento(renderer: THREE.WebGLRenderer, cena: THREE.Scene, camera: THREE.Camera) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(cena, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(512, 512), 0.6, 0.5, 0.9));
  composer.addPass(new OutputPass());
  return composer;
}

/** Câmera: do enquadramento aberto ao mergulho no chip. No desktop o chip fica à direita do texto;
 *  no celular, acima dele — e os dois voltam ao centro durante o mergulho. */
function enquadrar(camera: THREE.PerspectiveCamera, tela: { largura: number; altura: number }, p: number, inicial: THREE.Vector3, olhar: THREE.Vector3) {
  const aspecto = tela.largura / tela.altura;
  const recuo = aspecto < 0.9 ? THREE.MathUtils.clamp(0.75 / aspecto, 1, 1.7) : THREE.MathUtils.clamp(1.55 / aspecto, 1, 2.3);
  inicial.set(0, 9.6 * recuo, 14.2 * recuo);
  camera.position.lerpVectors(inicial, CAMERA_FINAL, p);
  camera.lookAt(olhar.lerpVectors(OLHAR_INICIAL, OLHAR_FINAL, p));
  const resto = 1 - p;
  if (aspecto > 1.25) camera.setViewOffset(tela.largura, tela.altura, -tela.largura * 0.2 * resto, 0, tela.largura, tela.altura);
  else if (aspecto < 0.9) camera.setViewOffset(tela.largura, tela.altura, 0, tela.altura * 0.3 * resto, tela.largura, tela.altura);
  else camera.clearViewOffset();
}

export function montarCena(canvas: HTMLCanvasElement, opcoes: OpcoesCena): ControleCena {
  const renderer = criarRenderizador(canvas, { alpha: false, qualidade: opcoes.qualidade });
  const cena = new THREE.Scene();
  cena.background = COR_FUNDO;
  cena.fog = new THREE.Fog(COR_FUNDO, 14, 30);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);
  const { luzChip, mapa } = montarIluminacao(renderer, cena);

  const modelo = construirChip();
  const acabamento = vestirModelo(modelo, renderer);
  const brilho = texturaBrilho();
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: brilho, color: 0x1f7bff, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
  halo.scale.set(9, 9, 1);
  halo.position.set(0, 0.2, 0);
  const pulsos = criarPulsos(modelo, brilho);
  const palco = new THREE.Group();
  palco.add(modelo.grupo, halo, pulsos.objeto);
  cena.add(palco);
  const montagem = criarMontagem(modelo);
  const composer = opcoes.qualidade === "alta" ? criarPosProcessamento(renderer, cena, camera) : null;

  const tela = { largura: 1, altura: 1 };
  const pararTamanho = observarTamanho(canvas.parentElement ?? canvas, (w, h) => {
    renderer.setSize(w, h, false);
    composer?.setSize(w, h);
    Object.assign(tela, { largura: w, altura: h });
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

  const alvo = { x: 0, y: 0 };
  const atual = { x: 0, y: 0 };
  const inicial = new THREE.Vector3();
  const olhar = new THREE.Vector3();
  let pronto = false;

  const laco = criarLaco((tempo, delta) => {
    const p = suavizar(limitar(opcoes.obterProgresso?.() ?? 0));
    montagem.atualizar(tempo);
    pulsos.atualizar(tempo, delta);
    (modelo.led.material as THREE.MeshStandardMaterial).emissiveIntensity = Math.sin(tempo * 5) > 0.55 ? 3.2 : 0.6;
    acabamento.topo.emissiveIntensity = 0.75 + Math.sin(tempo * 1.6) * 0.12 + p * 0.9;
    luzChip.intensity = 6 + Math.sin(tempo * 1.6) * 1.5 + p * 10;

    seguir(atual, alvo, delta, 3);
    palco.rotation.y = -0.38 + Math.sin(tempo * 0.22) * 0.07 + atual.x * 0.22 * (1 - p * 0.6) + p * 0.38;
    palco.rotation.x = atual.y * 0.08 * (1 - p);
    palco.position.y = Math.sin(tempo * 0.8) * 0.05;
    enquadrar(camera, tela, p, inicial, olhar);

    if (composer) composer.render(delta);
    else renderer.render(cena, camera);
    if (!pronto) {
      pronto = true;
      opcoes.aoPronto?.();
    }
  });

  return criarControle(laco, alvo, () => {
    pararTamanho();
    acabamento.descartar();
    montagem.descartar();
    modelo.descartar();
    composer?.passes.forEach((pass) => pass.dispose());
    [brilho, halo.material, composer, mapa, ...pulsos.descartaveis, renderer].forEach((d) => d?.dispose());
    if (!canvas.isConnected) renderer.forceContextLoss();
  });
}
