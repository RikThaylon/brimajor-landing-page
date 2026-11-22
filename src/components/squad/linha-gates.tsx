"use client";

import { UserCheck } from "lucide-react";
import { useRef } from "react";
import { squad } from "@/lib/conteudo";
import { COM_MOVIMENTO, gsap, useGSAP } from "@/lib/gsap";

/** Linha do ciclo de gates que acende conforme a rolagem; os gates de decisão humana ganham destaque. */
export function LinhaGates() {
  const ref = useRef<HTMLOListElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        gsap.fromTo("[data-progresso]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: true } });
        gsap.utils.toArray<HTMLElement>("[data-gate]").forEach((gate) => {
          gsap.fromTo(gate, { autoAlpha: 0.25 }, { autoAlpha: 1, duration: 0.4, scrollTrigger: { trigger: gate, start: "top 65%", toggleActions: "play none none reverse" } });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative space-y-4 pl-14">
      <span aria-hidden="true" className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-linha-forte" />
      <span data-progresso aria-hidden="true" className="absolute bottom-6 left-[1.35rem] top-6 w-px origin-top bg-gradient-to-b from-primaria via-neon to-ciano shadow-[0_0_12px_rgba(51,170,255,0.9)]" />
      {squad.gates.map((g) => (
        <li key={g.id} data-gate className={`cartao relative p-5 md:p-6 ${g.humano ? "border-neon/50" : ""}`}>
          <span className={`absolute -left-14 top-5 flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xs font-bold ${g.humano ? "border-neon bg-neon text-black shadow-[0_0_20px_rgba(51,170,255,0.8)]" : "border-linha-forte bg-fundo text-suave"}`}>
            {g.id}
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold">Gate {g.id} · {g.nome}</h3>
            {g.humano && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neon/15 px-3 py-1 text-xs font-medium text-neon">
                <UserCheck className="h-3.5 w-3.5" aria-hidden="true" /> Decisão sua
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-suave">{g.texto}</p>
        </li>
      ))}
    </ol>
  );
}
