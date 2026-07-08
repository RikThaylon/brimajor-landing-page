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
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/iniciacoes"
                className="group relative inline-flex items-center justify-center gap-2 bg-brimajor-primary text-brimajor-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-brimajor-neon overflow-hidden animate-glow shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_10px_40px_rgba(0,153,255,0.7)] active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explorar Conceitos Iniciais
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />
              </Link>

              <a
                href="https://wa.me/5592985224523"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 border border-brimajor-techgray text-zinc-300 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:text-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.84L0 24l6.335-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.87 9.87 0 01-5.03-1.375l-.36-.214-3.742.862.93-3.648-.235-.374A9.868 9.868 0 012.118 12C2.118 6.532 6.532 2.118 12 2.118c5.468 0 9.882 4.414 9.882 9.882 0 5.468-4.414 9.882-9.882 9.882z"/>
                </svg>
                Falar no WhatsApp
              </a>
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
