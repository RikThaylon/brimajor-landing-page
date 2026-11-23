"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { aguardarAbertura, COM_MOVIMENTO, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Efeito = "subir" | "mascara" | "desfoque";

interface Props {
  children: ReactNode;
  como?: ElementType;
  efeito?: Efeito;
  /** anima os filhos marcados com data-item em sequência */
  emSequencia?: boolean;
  atraso?: number;
  className?: string;
  id?: string;
}

/** Revela o conteúdo quando ele entra na tela. Sem movimento: aparece direto (o CSS só esconde com movimento). */
export function Revelar({ children, como: Tag = "div", efeito = "subir", emSequencia = false, atraso = 0, className, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const alvos = emSequencia ? el.querySelectorAll("[data-item]") : [el];
        if (emSequencia) gsap.set(el, { autoAlpha: 1 });
        const de =
          efeito === "mascara"
            ? { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 1 }
            : efeito === "desfoque"
              ? { autoAlpha: 0, y: 24, filter: "blur(14px)" }
              : { autoAlpha: 0, y: 56 };
        const para =
          efeito === "mascara"
            ? { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }
            : { autoAlpha: 1, y: 0, ...(efeito === "desfoque" && { filter: "blur(0px)", clearProps: "filter" }), duration: 1.1, ease: "expo.out" };
        gsap.set(alvos, de);
        const tl = gsap.timeline({ paused: true, delay: atraso });
        tl.to(alvos, { ...para, stagger: emSequencia ? 0.09 : 0 });
        if (efeito === "mascara") {
          const midia = el.querySelector("img, [data-midia]");
          if (midia) tl.fromTo(midia, { scale: 1.3 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);
        }
        let ativo = true;
        let gatilho: ScrollTrigger | undefined;
        aguardarAbertura().then(() => {
          if (ativo) gatilho = ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, animation: tl });
        });
        return () => {
          ativo = false;
          gatilho?.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} data-revelar={efeito === "mascara" ? "mascara" : "sim"}>
      {children}
    </Tag>
  );
}
