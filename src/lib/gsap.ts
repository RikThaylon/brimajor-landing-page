"use client";
// Registro único do GSAP e plugins (ScrollTrigger, SplitText e o hook useGSAP).
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const COM_MOVIMENTO = "(prefers-reduced-motion: no-preference)";

export function movimentoPermitido() {
  return typeof window !== "undefined" && window.matchMedia(COM_MOVIMENTO).matches;
}

/** Resolve quando a abertura terminou (ou imediatamente, se ela não vai rodar). */
export function aguardarAbertura(): Promise<void> {
  if (typeof document === "undefined" || document.documentElement.dataset.abertura !== "mostrar") return Promise.resolve();
  return new Promise((resolver) => window.addEventListener("brimajor:abertura-fim", () => resolver(), { once: true }));
}
