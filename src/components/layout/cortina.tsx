"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { registrarCortina } from "@/lib/transicao";

const NOMES: Record<string, string> = {
  "/": "Início",
  "/cursos": "Cursos de IA",
  "/squad": "Squad SDD",
  "/estoque": "Kanban Estoque",
  "/iniciacoes": "Iniciações",
};

/** Cortina em camadas da troca de página: cobre (de baixo para cima), navega e revela (para cima). */
export function Cortina() {
  const raiz = useRef<HTMLDivElement>(null);
  const coberta = useRef(false);
  const rota = usePathname();

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const paineis = el.querySelectorAll<HTMLElement>("[data-painel]");
    const miolo = el.querySelector<HTMLElement>("[data-miolo]");
    const rotulo = el.querySelector<HTMLElement>("[data-rotulo]");
    registrarCortina(
      (destino) =>
        new Promise<void>((resolver) => {
          coberta.current = true;
          if (rotulo) rotulo.textContent = NOMES[destino.split(/[?#]/)[0]] ?? "Brimajor";
          gsap.set(el, { visibility: "visible" });
          gsap
            .timeline({ onComplete: () => resolver() })
            .set(paineis, { transformOrigin: "50% 100%", scaleY: 0 })
            .to(paineis, { scaleY: 1, duration: 0.55, ease: "expo.inOut", stagger: 0.07 })
            .fromTo(miolo, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.25 }, "-=0.2");
        }),
    );
    return () => registrarCortina(null);
  }, []);

  useEffect(() => {
    const el = raiz.current;
    if (!el || !coberta.current) return;
    coberta.current = false;
    const paineis = Array.from(el.querySelectorAll<HTMLElement>("[data-painel]")).reverse();
    const miolo = el.querySelector<HTMLElement>("[data-miolo]");
    window.scrollTo(0, 0);
    gsap
      .timeline({
        delay: 0.12,
        onComplete: () => {
          gsap.set(el, { visibility: "hidden" });
          window.dispatchEvent(new Event("brimajor:pagina-revelada"));
        },
      })
      .to(miolo, { autoAlpha: 0, y: -12, duration: 0.2 })
      .set(paineis, { transformOrigin: "50% 0%" })
      .to(paineis, { scaleY: 0, duration: 0.6, ease: "expo.inOut", stagger: 0.07 });
  }, [rota]);

  return (
    <div ref={raiz} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[85]" style={{ visibility: "hidden" }}>
      <div data-painel className="absolute inset-0 bg-primaria" />
      <div data-painel className="absolute inset-0 bg-neon" />
      <div data-painel className="absolute inset-0 bg-fundo" />
      <div data-miolo className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0">
        <Image src="/marca/brimajor-icone.png" alt="" width={56} height={62} className="drop-shadow-[0_0_18px_rgba(51,170,255,0.6)]" />
        <span data-rotulo className="font-mono text-xs uppercase tracking-[0.35em] text-suave">Brimajor</span>
      </div>
    </div>
  );
}
