"use client";

import { useEffect, useRef, useState } from "react";
import { COM_MOVIMENTO } from "@/lib/gsap";
import type { ControleCena, OpcoesCena } from "@/three/base";

type Tipo = "chip" | "rede";

type ModuloCena = { montarCena: (canvas: HTMLCanvasElement, opcoes: OpcoesCena) => ControleCena };

const CARREGAR: Record<Tipo, () => Promise<ModuloCena>> = {
  chip: () => import("@/three/cena-chip"),
  rede: () => import("@/three/cena-rede"),
};

function suportaWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

interface Props {
  tipo: Tipo;
  rotulo: string; // texto alternativo do modelo
  imagemEstatica: string; // usada sem WebGL ou com movimento reduzido
  className?: string;
  /** progresso 0..1 vindo do scroll (lido a cada quadro) */
  progresso?: { current: number };
}

/** Canvas 3D carregado sob demanda, pausado fora da tela, com imagem estática de reserva (RT-02, RT-05, CEN-012). */
export function Cena3D({ tipo, rotulo, imagemEstatica, className, progresso }: Props) {
  const caixa = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const [modo, setModo] = useState<"carregando" | "3d" | "estatico">("carregando");

  useEffect(() => {
    const el = caixa.current;
    const canvas = tela.current;
    if (!el || !canvas) return;
    if (!window.matchMedia(COM_MOVIMENTO).matches || !suportaWebGL()) {
      const quadro = requestAnimationFrame(() => setModo("estatico"));
      return () => cancelAnimationFrame(quadro);
    }
    let controle: ControleCena | null = null;
    let visivel = false;
    let cancelado = false;
    const toque = window.matchMedia("(pointer: coarse)").matches;
    const qualidade = !toque && window.innerWidth >= 1024 ? "alta" : "baixa";

    const observador = new IntersectionObserver(
      ([entrada]) => {
        visivel = entrada.isIntersecting;
        if (!controle) return;
        if (visivel) controle.iniciar();
        else controle.parar();
      },
      { rootMargin: "120px" },
    );
    observador.observe(el);

    const aoMover = (e: PointerEvent) => {
      controle?.ponteiro((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    const aoMudarAba = () => (document.hidden ? controle?.parar() : visivel && controle?.iniciar());

    CARREGAR[tipo]()
      .then(({ montarCena }) => {
        if (cancelado) return;
        controle = montarCena(canvas, {
          qualidade,
          obterProgresso: () => progresso?.current ?? 0,
          aoPronto: () => setModo("3d"),
        });
        if (visivel) controle.iniciar();
        window.addEventListener("pointermove", aoMover, { passive: true });
        document.addEventListener("visibilitychange", aoMudarAba);
      })
      .catch(() => setModo("estatico"));

    return () => {
      cancelado = true;
      observador.disconnect();
      window.removeEventListener("pointermove", aoMover);
      document.removeEventListener("visibilitychange", aoMudarAba);
      controle?.descartar();
    };
  }, [tipo, progresso]);

  return (
    <div role="img" aria-label={rotulo} className={className}>
      <div ref={caixa} className="relative h-full w-full">
        {modo === "estatico" ? (
          // eslint-disable-next-line @next/next/no-img-element -- imagem de reserva já otimizada, tamanho variável
          <img src={imagemEstatica} alt="" className="absolute inset-0 h-full w-full object-contain" />
        ) : (
          <canvas ref={tela} aria-hidden="true" className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${modo === "3d" ? "opacity-100" : "opacity-0"}`} />
        )}
        {modo === "carregando" && (
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <span className="h-40 w-40 animate-pulse rounded-full bg-primaria/20 blur-3xl" />
          </div>
        )}
      </div>
    </div>
  );
}
