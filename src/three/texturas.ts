// Texturas desenhadas em <canvas> no navegador: serigrafia da placa, marca no topo do chip e brilho dos pulsos.
import * as THREE from "three";
import { PLACA, type Contorno, type Rotulo } from "./modelos/chip";

function canvas(largura: number, altura: number) {
  const c = document.createElement("canvas");
  c.width = largura;
  c.height = altura;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("canvas 2D indisponível");
  return { c, ctx };
}

function finalizar(c: HTMLCanvasElement, renderer?: THREE.WebGLRenderer) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (renderer) t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  t.needsUpdate = true;
  return t;
}

/** Face de cima da placa: máscara de solda azul, plano de terra hachurado e serigrafia branca. */
export function texturaSerigrafia(rotulos: Rotulo[], contornos: Contorno[], renderer?: THREE.WebGLRenderer) {
  const L = 2048;
  const A = Math.round((L * PLACA.profundidade) / PLACA.largura);
  const { c, ctx } = canvas(L, A);
  const px = (x: number) => ((x + PLACA.largura / 2) / PLACA.largura) * L;
  const pz = (z: number) => ((z + PLACA.profundidade / 2) / PLACA.profundidade) * A;
  const escala = L / PLACA.largura;

  const fundo = ctx.createLinearGradient(0, 0, L, A);
  fundo.addColorStop(0, "#0a2150");
  fundo.addColorStop(1, "#061533");
  ctx.fillStyle = fundo;
  ctx.fillRect(0, 0, L, A);

  // plano de terra: hachura fina
  ctx.strokeStyle = "rgba(80,150,255,0.07)";
  ctx.lineWidth = 2;
  for (let i = -A; i < L; i += 18) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + A, A);
    ctx.stroke();
  }
  // borda de serigrafia
  ctx.strokeStyle = "rgba(214,226,240,0.35)";
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, L - 56, A - 56);

  ctx.strokeStyle = "rgba(214,226,240,0.55)";
  ctx.lineWidth = 5;
  for (const k of contornos) {
    const w = k.largura * escala;
    const h = k.profundidade * escala;
    const x = px(k.x) - w / 2;
    const y = pz(k.z) - h / 2;
    const canto = Math.min(w, h) * 0.18;
    ctx.beginPath();
    for (const [cx, cy, dx, dy] of [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]]) {
      ctx.moveTo(cx + dx * canto, cy);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + dy * canto);
    }
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(214,226,240,0.62)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const r of rotulos) {
    ctx.save();
    ctx.translate(px(r.x), pz(r.z));
    ctx.rotate(r.rotacao ?? 0);
    ctx.font = `700 ${Math.round((r.tamanho ?? 0.25) * escala)}px "JetBrains Mono", ui-monospace, monospace`;
    ctx.fillText(r.texto, 0, 0);
    ctx.restore();
  }
  return finalizar(c, renderer);
}

/** Desenha a imagem do ícone da marca (o cérebro-circuito do logo) e o nome no topo do chip. */
export function texturaTopoChip(icone: HTMLImageElement | null, renderer?: THREE.WebGLRenderer) {
  const T = 1024;
  const { c, ctx } = canvas(T, T);
  const g = ctx.createRadialGradient(T / 2, T * 0.42, 40, T / 2, T / 2, T * 0.75);
  g.addColorStop(0, "#0d2b6b");
  g.addColorStop(1, "#040a18");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, T, T);

  ctx.strokeStyle = "rgba(51,170,255,0.10)";
  ctx.lineWidth = 2;
  for (let i = 64; i < T; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, T);
    ctx.moveTo(0, i);
    ctx.lineTo(T, i);
    ctx.stroke();
  }

  if (icone && icone.complete && icone.naturalWidth > 0) {
    const h = T * 0.5;
    const w = (icone.naturalWidth / icone.naturalHeight) * h;
    ctx.shadowColor = "#1a8cff";
    ctx.shadowBlur = 40;
    ctx.drawImage(icone, (T - w) / 2, T * 0.12, w, h);
    ctx.shadowBlur = 0;
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = 'italic 800 118px "Inter", Arial, sans-serif';
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#3aa0ff";
  ctx.shadowBlur = 24;
  ctx.fillText("BRIMAJOR", T / 2, T * 0.75);
  ctx.shadowBlur = 0;
  ctx.font = '500 44px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillStyle = "rgba(160,200,255,0.85)";
  ctx.fillText("BMJ-IA 01 · MANAUS", T / 2, T * 0.87);
  return finalizar(c, renderer);
}

/** Bolinha de luz com borda suave (pulsos, halos). */
export function texturaBrilho() {
  const { c, ctx } = canvas(128, 128);
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.2, "rgba(170,220,255,0.9)");
  g.addColorStop(0.5, "rgba(51,170,255,0.35)");
  g.addColorStop(1, "rgba(0,102,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function carregarImagem(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolver) => {
    const img = new Image();
    img.onload = () => resolver(img);
    img.onerror = () => resolver(null);
    img.src = src;
  });
}
