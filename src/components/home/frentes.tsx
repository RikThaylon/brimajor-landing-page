"use client";

import { useRef } from "react";
import { TituloRevelado } from "@/components/animacao/titulo-revelado";
import { ChipIlustracao } from "@/components/ui/chip-ilustracao";
import { frentes } from "@/lib/conteudo";
import { COM_MOVIMENTO, gsap, useGSAP } from "@/lib/gsap";

/** Frentes de atuação: cartões que grudam no topo e se empilham; o de baixo recua quando o próximo chega. */
export function Frentes() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const cartoes = gsap.utils.toArray<HTMLElement>("[data-cartao]");
        cartoes.forEach((cartao, i) => {
          const proximo = cartoes[i + 1];
          if (!proximo) return;
          gsap.to(cartao, {
            scale: 0.92,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: { trigger: proximo, start: "top 70%", end: "top 20%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="titulo-frentes" className="py-28 md:py-36">
      <div className="container-site">
        <h2 className="rotulo-secao"><span className="pad" />02 — Frentes de engenharia</h2>
        <TituloRevelado id="titulo-frentes" className="mt-6 max-w-4xl font-display text-[clamp(2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-tight">
          Hardware, software e IA na mesma bancada.
        </TituloRevelado>
        <div className="mt-16 space-y-8">
          {frentes.map((f, i) => (
            <article
              key={f.id}
              data-cartao
              className="sticky grid origin-top items-center gap-10 overflow-clip rounded-[1.25rem] border border-linha bg-[linear-gradient(180deg,#0b1426,#070d1a)] p-8 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)] md:grid-cols-[1.2fr_1fr] md:p-12"
              style={{ top: `calc(6.5rem + ${i * 1.25}rem)` }}
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-neon">{f.codigo} · Frente 0{i + 1}</span>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-5xl">{f.titulo}</h3>
                <p className="mt-5 max-w-xl leading-relaxed text-suave md:text-lg">{f.descricao}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {f.itens.map((item) => (
                    <li key={item} className="rounded-full border border-linha-forte bg-fundo/60 px-4 py-2 text-sm text-texto">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center md:justify-end">
                <ChipIlustracao icone={f.icone} codigo={f.codigo} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
