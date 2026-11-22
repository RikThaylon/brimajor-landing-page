import Image from "next/image";

/** Logotipo: o ícone cérebro-circuito do logo original + o nome no mesmo estilo (Bri branco, major azul, itálico). */
export function Logotipo({ tamanho = "md" }: { tamanho?: "md" | "lg" }) {
  const icone = tamanho === "lg" ? 44 : 32;
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/marca/brimajor-icone.png" alt="" width={icone} height={Math.round(icone * 1.1)} priority className="drop-shadow-[0_0_10px_rgba(51,170,255,0.45)]" />
      <Nome className={tamanho === "lg" ? "text-3xl" : "text-xl"} />
    </span>
  );
}

export function Nome({ className = "" }: { className?: string }) {
  return (
    <span className={`font-sans font-extrabold italic tracking-tight leading-none ${className}`}>
      <span className="text-white">Bri</span>
      <span className="text-[#1f8bff]">major</span>
    </span>
  );
}
