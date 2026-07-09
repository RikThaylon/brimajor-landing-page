"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function TimelinePin({ children }: { children: React.ReactNode }) {
  const pinRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!pinRef.current) return;

    const steps = gsap.utils.toArray<HTMLElement>(".timeline-step", pinRef.current);
    
    // Initial state for steps
    gsap.set(steps, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        pin: true,
        start: "top top",
        end: "+=1500",
        scrub: 1,
      },
    });

    tl.to(steps, {
      opacity: 1,
      y: 0,
      stagger: 0.2, // Proportional to scroll progress
      ease: "power2.out",
    });

  }, [], pinRef);

  useEffect(() => {
    // Refresh ScrollTrigger after assets (fonts/images) load to recalculate pin heights correctly
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div ref={pinRef} className="w-full bg-brimajor-black">
      {children}
    </div>
  );
}
