"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";

export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!ref.current) return;

    gsap.set(ref.current, { opacity: 0, y: 32 });

    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: delay / 1000,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none", // roda uma vez, não reverte no scroll-up
      },
    });
  }, [delay], ref);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
