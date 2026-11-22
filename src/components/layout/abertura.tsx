"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const CHAVE = "brimajor-abertura";

/** Abertura de marca (RF-01 · CEN-001): uma vez por sessão, pulável, desligada com movimento reduzido.
 *  Quem decide se ela aparece é o script do <head> (html[data-abertura="mostrar"]), antes da primeira pintura. */
export function Abertura() {
  const raiz = useRef<HTMLDivElement>(null);
  const linha = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = raiz.current;
    if (!el || html.dataset.abertura !== "mostrar") return;

    const encerrar = () => {
      try {
        sessionStorage.setItem(CHAVE, "1");
      } catch {
        /* armazenamento indisponível: a abertura pode voltar na próxima visita, sem problema */
      }
      html.dataset.abertura = "";
      window.dispatchEvent(new Event("brimajor:abertura-fim"));
    };

    const tl = criarLinhaDoTempo(el, encerrar);
    linha.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  function pular() {
    linha.current?.progress(1);
  }

  return (
    <div id="abertura" ref={raiz} className="fixed inset-0 z-[95] items-center justify-center" role="dialog" aria-modal="true" aria-label="Abertura do site da Brimajor">
      <div data-metade="cima" className="absolute inset-x-0 top-0 h-1/2 bg-fundo" />
      <div data-metade="baixo" className="absolute inset-x-0 bottom-0 h-1/2 bg-fundo" />

      <div data-conteudo className="relative flex flex-col items-center gap-6 px-6 text-center">
        <div className="relative drop-shadow-[0_0_28px_rgba(51,170,255,0.7)]">
          <Image data-icone src="/marca/brimajor-icone.png" alt="" width={132} height={145} priority />
          <span data-scan className="pointer-events-none absolute inset-x-[-20%] h-[2px] bg-ciano shadow-[0_0_18px_4px_rgba(127,227,255,0.8)]" />
        </div>
        <p className="font-sans text-5xl font-extrabold italic tracking-tight sm:text-7xl" aria-label="Brimajor">
          {"Brimajor".split("").map((letra, i) => (
            <span key={i} className="inline-block overflow-clip align-bottom" aria-hidden="true">
              <span data-letra className={`inline-block ${i < 3 ? "text-white" : "text-[#1f8bff]"}`}>{letra}</span>
            </span>
          ))}
        </p>
        <p data-lema className="font-mono text-[0.7rem] uppercase text-suave sm:text-xs">Sistemas embarcados &amp; IA</p>
      </div>

      <div data-rodape className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 font-mono text-xs text-apagado sm:p-8">
        <span aria-hidden="true"><span data-contador className="text-3xl text-texto sm:text-5xl">000</span> %</span>
        <span className="hidden sm:inline">Manaus · AM · 03°06′S 60°01′W</span>
        <button type="button" onClick={pular} className="rounded-full border border-linha-forte px-4 py-2.5 text-texto transition-colors hover:border-neon hover:text-neon">
          Pular abertura
        </button>
        <span data-barra className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-primaria via-neon to-ciano" />
      </div>
    </div>
  );
}

/** Linha do tempo da abertura: escaneia o ícone, conta até 100, sobe as letras e abre a tela em duas metades. */
function criarLinhaDoTempo(el: HTMLElement, encerrar: () => void) {
  const q = gsap.utils.selector(el);
  const contador = { v: 0 };
  const numero = q("[data-contador]")[0] as HTMLElement;
  const tl = gsap.timeline({ onComplete: encerrar });
  tl.set(q("[data-icone]"), { clipPath: "inset(100% 0 0 0)" })
    .set(q("[data-letra]"), { yPercent: 115 })
    .set(q("[data-lema]"), { autoAlpha: 0, letterSpacing: "0.05em" })
    .to(q("[data-icone]"), { clipPath: "inset(0% 0 0 0)", duration: 1.0, ease: "power3.inOut" }, 0.1)
    .fromTo(q("[data-scan]"), { top: "100%", autoAlpha: 1 }, { top: "0%", duration: 1.0, ease: "power3.inOut" }, 0.1)
    .to(q("[data-scan]"), { autoAlpha: 0, duration: 0.2 }, 1.05)
    .to(contador, {
      v: 100,
      duration: 1.7,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numero) numero.textContent = String(Math.round(contador.v)).padStart(3, "0");
      },
    }, 0)
    .to(q("[data-barra]"), { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0)
    .to(q("[data-letra]"), { yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.045 }, 0.55)
    .to(q("[data-lema]"), { autoAlpha: 1, letterSpacing: "0.38em", duration: 0.9, ease: "power2.out" }, 1.0)
    .to(q("[data-conteudo]"), { scale: 1.08, autoAlpha: 0, filter: "blur(6px)", duration: 0.5, ease: "power2.in" }, 1.85)
    .to(q("[data-metade='cima']"), { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, 2.0)
    .to(q("[data-metade='baixo']"), { yPercent: 100, duration: 0.85, ease: "expo.inOut" }, 2.0)
    .to(q("[data-rodape]"), { autoAlpha: 0, duration: 0.3 }, 1.9);
  return tl;
}
