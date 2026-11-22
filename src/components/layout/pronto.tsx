"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __brimajorPronto?: boolean;
  }
}

/** Sinaliza que o JavaScript hidratou (o script do <head> mostra tudo se isso não acontecer)
 *  e recalcula as posições do ScrollTrigger quando as fontes terminam de carregar. */
export function Pronto() {
  useEffect(() => {
    window.__brimajorPronto = true;
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const aoFimAbertura = () => ScrollTrigger.refresh();
    window.addEventListener("brimajor:abertura-fim", aoFimAbertura);
    return () => window.removeEventListener("brimajor:abertura-fim", aoFimAbertura);
  }, []);
  return null;
}
