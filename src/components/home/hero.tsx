"use client";

import { ArrowDown } from "lucide-react";
import { useRef, type RefObject } from "react";
import { Revelar } from "@/components/animacao/revelar";
import { TituloRevelado } from "@/components/animacao/titulo-revelado";
import { Cena3D } from "@/components/tres/cena-3d";
import { IconeWhatsApp } from "@/components/ui/icone";
import { hero } from "@/lib/conteudo";
import { ACADEMY_URL } from "@/lib/cursos/academy";
import { COM_MOVIMENTO, gsap, useGSAP } from "@/lib/gsap";
import { linkWhatsApp } from "@/lib/whatsapp";

export function Hero() {
  const secao = useRef<HTMLElement>(null);
  const progresso = useRef(0);

  useMergulho(secao, progresso);

  return (
    <section ref={secao} aria-labelledby="titulo-hero" className="relative h-[100svh] min-h-[600px] overflow-clip">
      <Cena3D
        tipo="chip"
        progresso={progresso}
        rotulo="Modelo 3D de uma placa de circuito da Brimajor com microcontrolador, trilhas de cobre e pulsos de dados"
        imagemEstatica="/modelos/placa-chip.webp"
        className="absolute inset-0"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,5,12,0.35)_0%,transparent_18%,rgba(2,5,12,0.55)_42%,rgba(2,5,12,0.92)_60%,#02050c_100%)] lg:bg-[linear-gradient(90deg,rgba(2,5,12,0.92)_0%,rgba(2,5,12,0.55)_45%,transparent_70%)]" />
      <div
        data-saida
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-fundo opacity-0"
      />

      <div className="container-site relative z-10 flex h-full flex-col justify-end pb-20 lg:justify-center lg:pb-0 lg:pt-16">
        <div data-hero-texto className="max-w-3xl">
          <p className="rotulo-secao mb-6"><span className="pad" />{hero.sobretitulo}</p>
          <TituloRevelado como="h1" id="titulo-hero" imediato className="font-display text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            {hero.titulo[0]} {hero.titulo[1]} <span className="text-neon">{hero.titulo[2]}</span>
          </TituloRevelado>
          <Revelar efeito="desfoque" atraso={0.5} className="mt-7 max-w-xl text-base leading-relaxed text-suave sm:text-lg">
            <p>{hero.subtitulo}</p>
          </Revelar>
          <Revelar emSequencia atraso={0.75} className="mt-9 flex flex-wrap gap-3">
            <a
              data-item
              href={ACADEMY_URL}
              className="group relative inline-flex items-center gap-2 overflow-clip rounded-full bg-primaria px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(0,102,255,0.9)] transition-transform hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Ver cursos na Academy
            </a>
            <a
              data-item
              href={linkWhatsApp("Olá, Brimajor! Quero conversar sobre um projeto.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-linha-forte bg-fundo/40 px-6 py-3.5 text-sm font-semibold text-texto backdrop-blur transition-colors hover:border-whatsapp hover:text-whatsapp"
            >
              <IconeWhatsApp className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </Revelar>
        </div>
      </div>

      <div data-hero-pista className="absolute inset-x-0 bottom-6 z-10">
        <div className="container-site flex items-end justify-between font-mono text-[0.7rem] uppercase tracking-[0.2em] text-apagado">
          <span className="inline-flex items-center gap-3">
            <ArrowDown className="h-4 w-4 animate-bounce text-neon" aria-hidden="true" />
            Role para mergulhar no chip
          </span>
          <span className="hidden sm:inline">PoC · MVP · Edge AI · IoT</span>
        </div>
      </div>
    </section>
  );
}

/** Acompanha o mergulho no chip e escurece a cena ao chegar à próxima seção. */
function useMergulho(secao: RefObject<HTMLElement | null>, progresso: RefObject<number>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: secao.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 0.9 : 1.2)}`,
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              progresso.current = self.progress;
            },
          },
        });
        tl.to("[data-hero-texto]", { yPercent: -18, autoAlpha: 0, ease: "power1.in", duration: 0.45 }, 0)
          .to("[data-hero-pista]", { autoAlpha: 0, duration: 0.15 }, 0)
          .to("[data-saida]", { opacity: 1, ease: "power2.in", duration: 0.3 }, 0.7);
      });
      return () => mm.revert();
    },
    { scope: secao },
  );
}
