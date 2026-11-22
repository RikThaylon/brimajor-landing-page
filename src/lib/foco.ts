"use client";

import { useEffect, type RefObject } from "react";

/** Diálogo modal acessível: trava a rolagem, prende o Tab dentro do elemento, Esc chama `aoEscapar`
 *  e, ao fechar, devolve o foco para quem abriu. Usado pelo menu do celular e pelo painel do curso. */
export function usePrenderFoco(ref: RefObject<HTMLElement | null>, ativo: boolean, aoEscapar: () => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !ativo) return;
    const anterior = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focaveis = () => Array.from(el.querySelectorAll<HTMLElement>("a[href], button:not([tabindex='-1'])"));
    focaveis()[0]?.focus();

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        aoEscapar();
        return;
      }
      if (e.key !== "Tab") return;
      const lista = focaveis();
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo?.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro?.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", aoTeclar);
      anterior?.focus();
    };
  }, [ref, ativo, aoEscapar]);
}
