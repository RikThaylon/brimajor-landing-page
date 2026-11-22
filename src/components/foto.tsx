import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Icone } from "@/components/ui/icone";
import { ESPACOS_FOTO, EXTENSOES_FOTO, type NomeFoto } from "@/lib/fotos";

/** Procura public/fotos/<nome>.<ext> no build (componente de servidor). */
export function localizarFoto(nome: NomeFoto): string | null {
  for (const ext of EXTENSOES_FOTO) {
    const arquivo = path.join(process.cwd(), "public", "fotos", `${nome}.${ext}`);
    if (fs.existsSync(arquivo)) return `/fotos/${nome}.${ext}`;
  }
  return null;
}

/** Espaço de foto autoral (RF-10 · CEN-011): mostra a foto se ela existir; senão, uma arte de circuito da marca. */
export function Foto({ nome, className, sizes = "(max-width: 768px) 100vw, 50vw", prioridade = false }: { nome: NomeFoto; className?: string; sizes?: string; prioridade?: boolean }) {
  const espaco = ESPACOS_FOTO[nome];
  const src = localizarFoto(nome);
  return (
    <figure className={`relative overflow-clip rounded-[1.5rem] border border-linha bg-superficie ${className ?? ""}`}>
      {src ? (
        <Image src={src} alt={espaco.alt} fill sizes={sizes} priority={prioridade} className="object-cover" />
      ) : (
        <ArteFoto nome={nome} />
      )}
      <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-fundo/70 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-suave backdrop-blur">
        {espaco.legenda}
      </figcaption>
    </figure>
  );
}

function ArteFoto({ nome }: { nome: NomeFoto }) {
  const espaco = ESPACOS_FOTO[nome];
  return (
    <div data-midia className="absolute inset-0" role="img" aria-label={`Ilustração: ${espaco.legenda}`}>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_20%,rgba(0,102,255,0.35),transparent),radial-gradient(50%_50%_at_80%_90%,rgba(127,227,255,0.18),transparent),linear-gradient(160deg,#0b1a3a,#040914)]" />
      <svg className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300" aria-hidden="true">
        <g fill="none" stroke="#33aaff" strokeOpacity="0.35" strokeWidth="1.2">
          <path d="M0 60h90l30 30h80l20-20h180" />
          <path d="M0 150h60l40-40h120l30 30h150" />
          <path d="M0 240h120l30-30h90l30 30h130" />
          <path d="M200 0v70l20 20v120l-20 20v70" />
          <path d="M320 0v110l-30 30v160" />
        </g>
        <g fill="#33aaff" fillOpacity="0.5">
          <circle cx="90" cy="60" r="3" /><circle cx="220" cy="110" r="3" /><circle cx="240" cy="210" r="3" /><circle cx="290" cy="140" r="3" /><circle cx="120" cy="240" r="3" />
        </g>
        <rect x="150" y="105" width="100" height="90" rx="8" fill="#050b18" stroke="#33aaff" strokeOpacity="0.6" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icone nome={espaco.icone} className="h-14 w-14 text-neon drop-shadow-[0_0_16px_rgba(51,170,255,0.7)]" />
      </div>
    </div>
  );
}
