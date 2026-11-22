"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { modeloTrabalho } from "@/lib/conteudo";

/** Modelo de trabalho: no desktop a seção fica presa e as etapas correm na horizontal, com uma trilha
 *  de cobre que acende; no celular (ou com movimento reduzido) vira uma lista vertical. */
export function ModeloTrabalho({ foto }: { foto: ReactNode }) {
  const secao = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = trilho.current;
        if (!el) return;
        const distancia = () => el.scrollWidth - window.innerWidth;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: secao.current, start: "top top", end: () => `+=${distancia()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
        tl.to(el, { x: () => -distancia(), ease: "none" }, 0)
          .fromTo("[data-trilha-cobre]", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
        gsap.utils.toArray<HTMLElement>("[data-etapa]").forEach((etapa) => {
          gsap.fromTo(
            etapa.querySelectorAll("[data-anima]"),
            { y: 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.08, ease: "expo.out", duration: 1, scrollTrigger: { trigger: etapa, containerAnimation: tl, start: "left 75%", once: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: secao },
  );

  return (
    <section ref={secao} aria-labelledby="titulo-modelo" className="relative overflow-clip py-24 lg:flex lg:h-[100svh] lg:items-center lg:py-0">
      <div ref={trilho} className="container-site flex flex-col gap-10 lg:w-max lg:max-w-none lg:flex-row lg:items-center lg:gap-0 lg:pr-[10vw]">
        <div className="lg:w-[38vw] lg:shrink-0 lg:pr-16">
          <h2 className="rotulo-secao"><span className="pad" />04 — Modelo de trabalho seguro</h2>
          <p id="titulo-modelo" className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">
            Quatro etapas para reduzir risco antes do investimento.
          </p>
          <div className="mt-10 aspect-[16/10] w-full">{foto}</div>
        </div>
        <ol className="relative flex flex-col gap-6 lg:flex-row lg:gap-0">
          <span data-trilha-cobre aria-hidden="true" className="absolute left-0 right-0 top-[3.25rem] hidden h-[2px] origin-left bg-gradient-to-r from-primaria via-neon to-ciano shadow-[0_0_14px_rgba(51,170,255,0.8)] lg:block" />
          {modeloTrabalho.map((etapa) => (
            <li key={etapa.passo} data-etapa className="relative lg:w-[30vw] lg:max-w-[26rem] lg:shrink-0 lg:pr-12">
              <div data-anima className="relative z-10 flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full border border-neon/50 bg-fundo font-display text-3xl font-semibold text-neon shadow-[0_0_40px_-10px_rgba(51,170,255,0.9)]">
                {etapa.passo}
              </div>
              <h3 data-anima className="mt-8 font-display text-2xl font-semibold tracking-tight lg:text-3xl">{etapa.titulo}</h3>
              <p data-anima className="mt-4 max-w-sm leading-relaxed text-suave">{etapa.descricao}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
