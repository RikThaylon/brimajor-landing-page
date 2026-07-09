"use client";
import { useLayoutEffect, useRef, DependencyList } from "react";
import { gsap } from "@/lib/gsap";

export function useGsapContext(
  callback: (context: gsap.Context) => void,
  deps: DependencyList = [],
  scope?: React.RefObject<HTMLElement | null>
) {
  const ctx = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    ctx.current = gsap.context(callback, scope?.current ?? undefined);

    return () => {
      ctx.current?.revert(); // limpa timelines, ScrollTriggers e listeners
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
