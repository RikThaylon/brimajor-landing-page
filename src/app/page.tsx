"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, MonitorSmartphone, Network, Workflow } from "lucide-react";
import { heroContent, capacities, timelineSteps } from "@/lib/data";
import { HeroTimeline } from "@/components/hero-timeline";
import { StickyScrollShowcase } from "@/components/sticky-scroll-showcase";

const iconMap: Record<string, React.ReactNode> = {
  MonitorSmartphone: <MonitorSmartphone className="w-8 h-8 text-brimajor-neon" />,
  Cpu: <Cpu className="w-8 h-8 text-brimajor-neon" />,
  Workflow: <Workflow className="w-8 h-8 text-brimajor-neon" />,
  Network: <Network className="w-8 h-8 text-brimajor-neon" />,
};

// Pre-defined particles (avoids layout shift, no JS random on server)
const PARTICLES = [
  { x: '10%', y: '30%', delay: '0s',   dur: '7s',  dx: '30px',  dy: '-80px' },
  { x: '80%', y: '60%', delay: '1s',   dur: '9s',  dx: '-20px', dy: '-60px' },
  { x: '55%', y: '20%', delay: '2s',   dur: '6s',  dx: '15px',  dy: '-50px' },
  { x: '25%', y: '75%', delay: '3.5s', dur: '8s',  dx: '-30px', dy: '-70px' },
  { x: '70%', y: '45%', delay: '0.5s', dur: '11s', dx: '10px',  dy: '-90px' },
  { x: '40%', y: '85%', delay: '2.5s', dur: '7s',  dx: '25px',  dy: '-55px' },
];

export default function Home() {
  const showcaseSteps = [
    // Capabilities
    ...capacities.map((cap) => ({
      id: cap.id,
      content: (
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-brimajor-primary/20 text-brimajor-neon border border-brimajor-primary/30">
            Capacidade de Engenharia
          </span>
          <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-brimajor-neon">
            {cap.title}
          </h3>
          <p className="text-zinc-400 leading-relaxed font-light text-base">
            {cap.description}
          </p>
        </div>
      ),
    })),
    // Model steps
    ...timelineSteps.map((step) => ({
      id: `model-step${step.step}`,
      content: (
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            Modelo de Trabalho Seguro
          </span>
          <h3 className="text-2xl font-bold text-white">
            {step.step}. {step.title}
          </h3>
          <p className="text-zinc-400 leading-relaxed font-light text-base">
            {step.description}
          </p>
        </div>
      ),
    })),
  ];

  const renderHomeVisual = (activeId: string) => {
    const isCapability = ["web-mobile", "embarcados-iot", "digitalizacao", "apis"].includes(activeId);

    if (isCapability) {
      const currentCap = capacities.find((c) => c.id === activeId);
      if (!currentCap) return null;
      return (
        <div className="bg-brimajor-graphite border border-brimajor-techgray rounded-xl p-8 w-full max-w-sm space-y-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center transition-all duration-500">
          <div className="absolute -inset-px bg-gradient-to-r from-brimajor-primary/10 to-brimajor-neon/10 opacity-50 rounded-xl" />
          <div className="relative p-6 inline-block bg-brimajor-black border border-brimajor-primary/30 rounded-2xl shadow-[0_0_20px_rgba(0,102,255,0.2)] text-brimajor-neon scale-110">
            {iconMap[currentCap.icon]}
          </div>
          <div className="relative space-y-2">
            <h4 className="text-xl font-bold text-white">{currentCap.title}</h4>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">{currentCap.description}</p>
          </div>
          <div className="relative pt-4">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-brimajor-primary/20 text-brimajor-neon border border-brimajor-primary/30 animate-pulse">
              Foco Técnico
            </span>
          </div>
        </div>
      );
    } else {
      const currentStepNum = activeId.replace("model-step", "");
      return (
        <div className="bg-brimajor-graphite border border-brimajor-techgray rounded-xl p-8 w-full max-w-sm space-y-6 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center transition-all duration-500">
          <h3 className="text-zinc-100 font-bold text-lg border-b border-brimajor-techgray pb-3 w-full text-center">Modelo de Trabalho</h3>
          <div className="flex gap-2 items-center justify-center py-6 w-full">
            {["01", "02", "03", "04"].map((num, idx) => {
              const stepVal = parseInt(currentStepNum);
              const curVal = idx + 1;
              const isCurrent = currentStepNum === num;
              const isPassed = stepVal >= curVal;
              return (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                    isCurrent
                      ? "bg-brimajor-primary text-white border-brimajor-neon shadow-[0_0_15px_rgba(0,242,254,0.5)] scale-110"
                      : isPassed
                      ? "bg-brimajor-primary/40 text-zinc-200 border-brimajor-primary/60"
                      : "bg-brimajor-black text-zinc-600 border-brimajor-techgray"
                  }`}>
                    {num}
                  </div>
                  {idx < 3 && (
                    <div className={`w-4 h-[2px] mx-1 transition-all duration-500 ${
                      stepVal > curVal ? "bg-brimajor-primary" : "bg-zinc-800"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-zinc-500 font-mono text-center">Etapa {currentStepNum} de 4: Mitigação de Riscos</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Hero Section */}
      <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.x, top: p.y,
              animationDelay: p.delay,
              animationDuration: p.dur,
              '--dx': p.dx,
              '--dy': p.dy,
            } as React.CSSProperties}
          />
        ))}

        {/* Floating orbs — GPU composited only */}
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brimajor-primary/5 blur-3xl animate-float pointer-events-none" />
        <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-brimajor-neon/8 blur-2xl animate-float-slow pointer-events-none" />

        {/* 3D Glow Ring behind logo */}
        <div className="absolute inset-0 flex items-center justify-center -z-20 perspective-[800px]">
          {/* Spinning ring */}
          <div className="absolute w-[min(70vw,480px)] aspect-square rounded-full border border-brimajor-primary/10 animate-spin3d" />
          <div className="absolute w-[min(55vw,380px)] aspect-square rounded-full border border-brimajor-neon/8 animate-spin3d" style={{ animationDirection: 'reverse', animationDuration: '14s' }} />

          {/* Logo mark */}
          <div className="relative w-[min(80vw,600px)] aspect-square">
            <Image
              src="/hero-bg.jpg"
              alt="Brimajor — Sistemas Embarcados & IA"
              fill priority
              sizes="(max-width: 768px) 80vw, 600px"
              className="object-contain opacity-[0.08] mix-blend-lighten"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,#000_70%)]" />
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brimajor-black -z-10" />

        {/* Light beam sweep */}
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-transparent via-brimajor-primary/5 to-transparent animate-beam" />
        </div>

        <HeroTimeline>
          <h1 className="text-[clamp(2.5rem,5vw,5.5rem)] font-extrabold tracking-tight text-brimajor-white mb-6 leading-[1.05]">
            {heroContent.title}
          </h1>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-zinc-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            {heroContent.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* PRIMARY — produto pronto */}
            <Link
              href="/estoque"
              className="group relative inline-flex items-center justify-center gap-2 bg-brimajor-primary text-brimajor-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-brimajor-neon overflow-hidden animate-glow shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_10px_40px_rgba(0,153,255,0.7)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver Kanban Estoque
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />
            </Link>

            {/* SECONDARY — conceitos */}
            <Link
              href="/iniciacoes"
              className="group inline-flex items-center justify-center gap-2 border border-brimajor-techgray text-zinc-300 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-brimajor-primary/60 hover:text-white active:scale-95"
            >
              Ver Outras Iniciações
              <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </div>
        </HeroTimeline>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Unificação: Capacidades + Modelo de Trabalho Seguro via StickyScrollShowcase */}
      <section className="py-24 relative overflow-hidden" aria-label="Como Trabalhamos">
        <div className="fluid-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-bold text-zinc-100 mb-4 tracking-tight">Como Estruturamos Soluções</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">Nossas frentes tecnológicas combinadas com a jornada de validação e redução contínua de risco.</p>
          </div>

          <StickyScrollShowcase
            steps={showcaseSteps}
            renderVisual={renderHomeVisual}
            side="right"
          />
        </div>
      </section>
    </div>
  );
}
