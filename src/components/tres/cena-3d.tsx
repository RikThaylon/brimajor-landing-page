"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { COM_MOVIMENTO } from "@/lib/gsap";
import type { ControleCena, OpcoesCena } from "@/three/base";

type Tipo = "chip" | "rede";

type ModuloCena = { montarCena: (canvas: HTMLCanvasElement, opcoes: OpcoesCena) => ControleCena };

const CARREGAR: Record<Tipo, () => Promise<ModuloCena>> = {
  chip: () => import("@/three/cena-chip"),
  rede: () => import("@/three/cena-rede"),
};

function observarMovimento(atualizar: () => void) {
  const consulta = window.matchMedia(COM_MOVIMENTO);
  consulta.addEventListener("change", atualizar);
  return () => consulta.removeEventListener("change", atualizar);
}

const permiteMovimento = () => window.matchMedia(COM_MOVIMENTO).matches;
const movimentoNoServidor = () => false;

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
  const animar = useSyncExternalStore(observarMovimento, permiteMovimento, movimentoNoServidor);
  const imagem = (
    // eslint-disable-next-line @next/next/no-img-element -- imagem de reserva já otimizada, tamanho variável
    <img src={imagemEstatica} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
  );
  return (
    <div role="img" aria-label={rotulo} className={className}>
      <div className="relative h-full w-full">
        {animar ? <ModeloAnimado key={tipo} tipo={tipo} progresso={progresso}>{imagem}</ModeloAnimado> : imagem}
      </div>
    </div>
  );
}

function ModeloAnimado({ tipo, progresso, children }: Pick<Props, "tipo" | "progresso"> & { children: React.ReactNode }) {
  const tela = useRef<HTMLCanvasElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const canvas = tela.current;
    if (!canvas) return;
    let controle: ControleCena | null = null;
    let visivel = false;
    let cancelado = false;
    let solicitado = false;
    const toque = window.matchMedia("(pointer: coarse)").matches;
    const qualidade = !toque && window.innerWidth >= 1024 ? "alta" : "baixa";

    const aoMover = (e: PointerEvent) => {
      controle?.ponteiro((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    const sincronizar = () => {
      if (cancelado || !visivel || document.hidden) {
        controle?.parar();
        window.removeEventListener("pointermove", aoMover);
        return;
      }
      if (controle) {
        controle.iniciar();
        if (!toque) window.addEventListener("pointermove", aoMover, { passive: true });
      } else if (!solicitado) {
        solicitado = true;
        CARREGAR[tipo]().then(({ montarCena }) => {
          if (cancelado) return;
          if (!visivel || document.hidden) {
            solicitado = false;
            return;
          }
          controle = montarCena(canvas, {
            qualidade,
            obterProgresso: () => progresso?.current ?? 0,
            aoPronto: () => setPronto(true),
          });
          sincronizar();
        }).catch(() => { /* WebGL indisponível: a imagem estática já está visível. */ });
      }
    };
    const observador = new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting;
      sincronizar();
    });
    const aoPerderContexto = () => {
      cancelado = true;
      sincronizar();
      setPronto(false);
    };
    observador.observe(canvas);
    canvas.addEventListener("webglcontextlost", aoPerderContexto);
    document.addEventListener("visibilitychange", sincronizar);

    return () => {
      cancelado = true;
      observador.disconnect();
      window.removeEventListener("pointermove", aoMover);
      document.removeEventListener("visibilitychange", sincronizar);
      canvas.removeEventListener("webglcontextlost", aoPerderContexto);
      controle?.descartar();
    };
  }, [tipo, progresso]);

  return (
    <>
      {!pronto && children}
      <canvas ref={tela} aria-hidden="true" className={`absolute inset-0 h-full w-full ${pronto ? "opacity-100" : "opacity-0"}`} />
    </>
  );
}
