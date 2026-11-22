// Exporta os modelos 3D da Brimajor para .glb (glTF binário): abre no Blender, PowerPoint, Windows 3D Viewer etc.
// Uso: npm run models:export  → public/modelos/brimajor-placa-chip.glb e brimajor-cerebro-circuito.glb
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { construirChip } from "../src/three/modelos/chip.ts";
import { construirRedeNeural } from "../src/three/modelos/rede-neural.ts";

// O exportador usa FileReader (API do navegador); no Node basta um equivalente com Blob.arrayBuffer().
globalThis.FileReader ??= class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = buffer;
      this.onload?.({ target: this });
      this.onloadend?.({ target: this });
    });
  }
};

const destino = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "modelos");
mkdirSync(destino, { recursive: true });

async function exportar(nome, objeto) {
  const exportador = new GLTFExporter();
  const glb = await exportador.parseAsync(objeto, { binary: true });
  const arquivo = join(destino, nome);
  writeFileSync(arquivo, Buffer.from(glb));
  process.stdout.write(`${nome}: ${(glb.byteLength / 1024).toFixed(0)} KB\n`);
}

const chip = construirChip();
const rede = construirRedeNeural();
process.stdout.write(`placa: ${chip.trilhas.length} trilhas, ${chip.componentes.length} componentes · cérebro: ${rede.posicoes.length / 3} neurônios, ${rede.arestas.length} ligações\n`);
await exportar("brimajor-placa-chip.glb", chip.grupo);
await exportar("brimajor-cerebro-circuito.glb", rede.grupo);
chip.descartar();
rede.descartar();
