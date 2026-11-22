"use client";

import { useRef } from "react";
import { COM_MOVIMENTO, gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/** Texto que "acende" palavra por palavra conforme a rolagem (scrub). */
export function TextoAceso({ texto, className }: { texto: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const divisao = SplitText.create(el, { type: "words" });
        gsap.fromTo(
          divisao.words,
          { opacity: 0.14, color: "#9fb0c8" },
          {
            opacity: 1,
            color: "#e6edf7",
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
          },
        );
        return () => divisao.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <p ref={ref} className={className}>
      {texto}
    </p>
  );
}

/** Número que conta até o valor quando entra na tela. */
export function Contador({ valor, sufixo = "", className }: { valor: number; sufixo?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const estado = { v: 0 };
        el.textContent = `0${sufixo}`;
        gsap.to(estado, {
          v: valor,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(estado.v)}${sufixo}`;
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={className}>
      {valor}
      {sufixo}
    </span>
  );
}

/** Letreiro infinito que acelera com a velocidade da rolagem e troca de sentido ao subir. */
export function Letreiro({ itens, className }: { itens: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const trilho = el.querySelector("[data-trilho]");
        const anim = gsap.to(trilho, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate(self) {
            const v = self.getVelocity();
            const sentido = self.direction === 1 ? 1 : -1;
            gsap.to(anim, { timeScale: sentido * (1 + Math.min(4, Math.abs(v) / 600)), duration: 0.3, overwrite: true });
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  const sequencia = [...itens, ...itens];
  return (
    <div ref={ref} className={`overflow-clip ${className ?? ""}`} aria-hidden="true">
      <div data-trilho className="flex w-max gap-10 whitespace-nowrap">
        {sequencia.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item}
            <span className="inline-block h-3 w-3 rotate-45 border border-neon" />
          </span>
        ))}
      </div>
    </div>
  );
}
