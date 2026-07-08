import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, MonitorSmartphone, Network, Workflow } from "lucide-react";
import { heroContent, capacities, timelineSteps } from "@/lib/data";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brimajor-primary/5 blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-brimajor-neon/8 blur-2xl animate-float-slow pointer-events-none" />

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

        <div className="fluid-container text-center max-w-5xl z-10 pt-20">
          <AnimateOnScroll>
            <h1 className="text-[clamp(2.5rem,5vw,5.5rem)] font-extrabold tracking-tight text-brimajor-white mb-6 leading-[1.05]">
              {heroContent.title}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-zinc-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              {heroContent.subtitle}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
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
          </AnimateOnScroll>
        </div>
      </section>

      {/* Capacidades de Engenharia */}
      <section className="py-[clamp(5rem,10vw,10rem)] border-t border-brimajor-techgray/50 relative" aria-label="Capacidades de Engenharia">
        <div className="fluid-container relative z-10">
          <AnimateOnScroll>
            <div className="text-center mb-[clamp(3rem,5vw,5rem)]">
              <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-bold text-zinc-100 mb-4 tracking-tight">Capacidades de Engenharia</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">Nossas frentes de pesquisa e prototipagem abrangem desde a nuvem até o hardware no ambiente físico.</p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {capacities.map((item, index) => (
              <AnimateOnScroll key={item.id} delay={(index % 4) * 100}>
                <div className="group relative rounded-2xl bg-brimajor-graphite/40 border border-brimajor-techgray p-[clamp(1.5rem,3vw,2.5rem)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brimajor-primary/50 hover:bg-brimajor-graphite/80 hover:shadow-[0_8px_30px_rgba(0,102,255,0.15)]">
                  {/* Glow interno */}
                  <div className="absolute -inset-px bg-gradient-to-r from-brimajor-primary/0 via-brimajor-primary/20 to-brimajor-neon/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  {/* Shimmer line top */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brimajor-neon/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                  <div className="relative z-10">
                    <div className="mb-6 p-4 inline-block bg-brimajor-black border border-brimajor-techgray rounded-xl group-hover:scale-110 group-hover:bg-brimajor-dark/30 group-hover:border-brimajor-primary/30 transition-all duration-500 shadow-inner">
                      {iconMap[item.icon]}
                    </div>
                    <h3 className="text-2xl font-semibold text-zinc-100 mb-3 group-hover:text-brimajor-neon transition-colors duration-300">{item.title}</h3>
                    <p className="text-zinc-400 font-light leading-relaxed text-base">{item.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Modelo de Trabalho */}
      <section className="py-[clamp(5rem,10vw,10rem)] relative overflow-hidden border-t border-brimajor-techgray/50" aria-label="Modelo de Trabalho">
        <div className="fluid-container relative z-10">
          <AnimateOnScroll>
            <div className="text-center mb-[clamp(4rem,6vw,6rem)]">
              <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-bold text-zinc-100 mb-4 tracking-tight">Nosso Modelo de Trabalho Seguro</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">Mitigação de riscos em quatro passos essenciais antes de investimentos estruturais.</p>
            </div>
          </AnimateOnScroll>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              <div className="hidden md:block absolute top-10 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-brimajor-primary/30 to-transparent z-0" />

              {timelineSteps.map((step, index) => (
                <AnimateOnScroll key={step.step} delay={index * 150}>
                  <div className="relative z-10 flex flex-col items-center text-center group">
                    <div className="w-20 h-20 rounded-full bg-brimajor-black border border-brimajor-techgray group-hover:border-brimajor-neon flex items-center justify-center text-2xl font-bold text-brimajor-primary mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,136,255,0.4)] group-hover:text-brimajor-neon">
                      {step.step}
                    </div>
                    <h4 className="text-xl font-semibold text-zinc-100 mb-3 tracking-tight">{step.title}</h4>
                    <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-[250px]">{step.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
