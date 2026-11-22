"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { aguardarAbertura, COM_MOVIMENTO, gsap, SplitText, useGSAP } from "@/lib/gsap";

interface Props {
  children: ReactNode;
  como?: ElementType;
  className?: string;
  /** anima ao montar (hero), em vez de esperar o scroll */
  imediato?: boolean;
  atraso?: number;
  id?: string;
}

/** Título que sobe linha por linha de dentro de uma máscara — o "text reveal" clássico de motion design. */
export function TituloRevelado({ children, como: Tag = "h2", className, imediato = false, atraso = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        let divisao: SplitText | null = null;
        let cancelado = false;
        const iniciar = () => {
          if (cancelado) return;
          divisao = SplitText.create(el, {
            type: "lines,words",
            mask: "lines",
            linesClass: "linha-mascara",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { autoAlpha: 1 });
              return gsap.from(self.lines, {
                yPercent: 115,
                rotate: 2,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.1,
                delay: atraso,
                scrollTrigger: imediato ? undefined : { trigger: el, start: "top 88%", once: true },
              });
            },
          });
        };
        const comecar = () => (imediato ? aguardarAbertura().then(iniciar) : iniciar());
        if (document.fonts?.status === "loaded") comecar();
        else document.fonts?.ready.then(comecar);
        return () => {
          cancelado = true;
          divisao?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} data-revelar="titulo">
      {children}
    </Tag>
  );
}
