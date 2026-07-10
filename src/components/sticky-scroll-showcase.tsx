"use client";
import React, { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/use-gsap-context";

interface StickyScrollStep {
  id: string;
  content: React.ReactNode;
}

interface StickyScrollShowcaseProps {
  steps: StickyScrollStep[];
  renderVisual: (activeId: string) => React.ReactNode;
  side?: "left" | "right";
  className?: string;
}

export function StickyScrollShowcase({
  steps,
  renderVisual,
  side = "right",
  className = "",
}: StickyScrollShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>(steps[0]?.id || "");

  useGsapContext((ctx) => {
    if (!containerRef.current || !visualRef.current || !narrativeRef.current) return;

    ScrollTrigger.matchMedia({
      // Desktop: pin and sync scroll
      "(min-width: 768px)": () => {
        // Pin visual element inside visualContainerRef
        gsap.to(visualRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            pin: visualRef.current,
            start: "top 12%",
            end: () => {
              const diff = narrativeRef.current!.offsetHeight - visualRef.current!.offsetHeight;
              return diff > 0 ? `+=${diff}` : "+=0";
            },
            pinSpacing: false,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Set up scroll triggers for each step to toggle the active visual
        const stepElements = narrativeRef.current!.querySelectorAll(".showcase-step");
        stepElements.forEach((el) => {
          const stepId = el.getAttribute("data-step-id");
          if (!stepId) return;

          ScrollTrigger.create({
            trigger: el,
            start: "top 35%",
            end: "bottom 35%",
            onToggle: (self) => {
              if (self.isActive) {
                setActiveId(stepId);
              }
            },
          });
        });
      },
    });
  }, [steps], containerRef);

  useEffect(() => {
    // Global ScrollTrigger refresh after images/fonts loaded
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
    <div
      ref={containerRef}
      className={`flex flex-col md:flex-row gap-12 relative w-full ${
        side === "left" ? "md:flex-row-reverse" : ""
      } ${className}`}
    >
      {/* Narrative Column */}
      <div ref={narrativeRef} className="w-full md:w-1/2 flex flex-col gap-12 md:gap-32 pb-[10vh]">
        {steps.map((step) => (
          <div
            key={step.id}
            data-step-id={step.id}
            className="showcase-step min-h-[30vh] md:min-h-[50vh] flex flex-col justify-center gap-6"
          >
            {step.content}
            {/* Inline visual for mobile only (avoids empty scroll/hidden state) */}
            <div className="md:hidden w-full max-w-lg mx-auto py-4">
              {renderVisual(step.id)}
            </div>
          </div>
        ))}
      </div>

      {/* Visual Column (hidden on mobile, pinned on desktop) */}
      <div
        ref={visualContainerRef}
        className="hidden md:flex w-full md:w-1/2 flex-col items-center justify-start relative min-h-[300px] md:min-h-[500px]"
      >
        <div
          ref={visualRef}
          className="w-full max-w-lg p-4 transition-all duration-300 ease-out"
        >
          {renderVisual(activeId)}
        </div>
      </div>
    </div>
  );
}
