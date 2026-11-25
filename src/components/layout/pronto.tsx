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
    const destino = document.querySelector(":target");
    const navegacao = new AbortController();
    if (destino) {
      const cancelar = () => navegacao.abort();
      for (const evento of ["pointerdown", "wheel", "keydown", "hashchange"]) {
        window.addEventListener(evento, cancelar, { passive: true, signal: navegacao.signal });
      }
    }
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
      // O pin do hero insere espaço depois do primeiro salto do navegador para a âncora.
      requestAnimationFrame(() => {
        if (!navegacao.signal.aborted && destino?.matches(":target")) destino.scrollIntoView();
        navegacao.abort();
      });
    });
    const aoFimAbertura = () => ScrollTrigger.refresh();
    window.addEventListener("brimajor:abertura-fim", aoFimAbertura);
    return () => {
      navegacao.abort();
      window.removeEventListener("brimajor:abertura-fim", aoFimAbertura);
    };
  }, []);
  return null;
}
