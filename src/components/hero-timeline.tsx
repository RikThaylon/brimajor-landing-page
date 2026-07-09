"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";

export function HeroTimeline({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!containerRef.current) return;

    // We assume the children structure: h1 (title), p (subtitle), div (buttons)
    const elements = containerRef.current.children;
    if (elements.length < 3) return;

    const title = elements[0];
    const subtitle = elements[1];
    const buttons = elements[2];

    gsap.set([title, subtitle, buttons], { opacity: 0, y: 32 });

    const tl = gsap.timeline();

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "expo.out",
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }, "-=0.8")
    .to(buttons, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }, "-=0.8");

  }, [], containerRef);

  return (
    <div ref={containerRef} className="fluid-container text-center max-w-5xl z-10 pt-20">
      {children}
    </div>
  );
}
