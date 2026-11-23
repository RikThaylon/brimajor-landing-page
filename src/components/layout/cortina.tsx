"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navegacao } from "@/lib/conteudo";

export function Cortina() {
  const rota = usePathname();
  const anterior = useRef(rota);
  const painel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anterior.current === rota) return;
    anterior.current = rota;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // A rota já mudou. O painel volta ao estado oculto ao fim da animação,
    // mesmo se a thread principal estiver ocupada montando a cena 3D.
    const animacao = painel.current?.animate([
      { visibility: "visible", opacity: 0.92, transform: "translateY(0)" },
      { visibility: "visible", opacity: 0, transform: "translateY(-6%)" },
    ], { duration: 360, easing: "ease-out" });
    return () => animacao?.cancel();
  }, [rota]);

  return (
    <div ref={painel} data-cortina aria-hidden="true" className="invisible pointer-events-none fixed inset-0 z-[85] flex flex-col items-center justify-center gap-4 bg-fundo">
      <Image src="/marca/brimajor-icone.png" alt="" width={56} height={62} />
      <span className="font-mono text-xs uppercase tracking-[0.35em] text-suave">
        {navegacao.find((item) => item.href === rota)?.rotulo ?? "Brimajor"}
      </span>
    </div>
  );
}
