"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";

export function CapacitiesParallax({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!sectionRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".capability-card", sectionRef.current);
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: i % 2 === 0 ? -24 : -8,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // suaviza o acompanhamento do scroll (1s de "lag" controlado)
        },
      });
    });
  }, [], sectionRef);

  return (
    <div ref={sectionRef} className="w-full">
      {children}
    </div>
  );
}
