import { Metadata } from "next";
import { BarChart3, ShieldCheck, CheckCircle, Users, FileBarChart, Fingerprint, ChevronDown } from "lucide-react";
import { estoqueModules } from "@/lib/data";
import { BrandWatermark } from "@/components/brand-watermark";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Kanban Estoque | Brimajor",
  description: "Sistema Kanban digital para gestão de estoque industrial em Manaus. Elimine rupturas, acompanhe KPIs e audite cada movimentação.",
};

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  FileBarChart: <FileBarChart className="w-5 h-5" />,
  Fingerprint: <Fingerprint className="w-5 h-5" />,
};

export default function EstoquePage() {
  return (
    <div className="bg-brimajor-black text-zinc-100 min-h-screen selection:bg-brimajor-primary selection:text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-24 lg:py-32 border-b border-brimajor-techgray" aria-label="Kanban de Estoque">
        <BrandWatermark />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-brimajor-primary/10 border border-brimajor-primary/20 rounded-full px-3 py-1 text-[10px] uppercase tracking-wider text-brimajor-neon font-bold">
                <span>Fase Final de Desenvolvimento</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                Gestão industrial baseada em <span className="bg-gradient-to-r from-brimajor-neon to-brimajor-primary bg-clip-text text-transparent">realidade</span>
              </h1>
              <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Elimine rupturas imprevistas e tenha auditoria pronta para fiscalização. Um sistema feito para plantas industriais que não podem parar.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-bold text-white">100%</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Auditável</span>
                </div>
                <div className="w-px h-10 bg-brimajor-techgray hidden sm:block" />
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-bold text-white">Zero</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Ruptura Oculta</span>
                </div>
                <div className="w-px h-10 bg-brimajor-techgray hidden sm:block" />
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-bold text-white">Real-time</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Visibilidade</span>
                </div>
              </div>
            </div>

            {/* 3D Kanban Board Simulation (CSS Only) */}
            <div className="relative h-[300px] perspective-[1000px] w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
              <div className="w-full h-full border border-brimajor-techgray bg-brimajor-graphite rounded-xl shadow-2xl p-4 flex gap-4 transform rotate-x-[15deg] rotate-y-[-15deg] hover:rotate-x-0 hover:rotate-y-0 transition-transform duration-700 ease-out preserve-3d">
                {/* Colunas do Kanban */}
                {['Verde (Seguro)', 'Amarelo (Atenção)', 'Vermelho (Crítico)'].map((col, i) => (
                  <div key={col} className="flex-1 flex flex-col gap-2 bg-brimajor-black/50 p-2 rounded-lg border border-brimajor-techgray/50">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">{col}</span>
                    <div className={`h-12 rounded border ${i===0 ? 'bg-emerald-500/10 border-emerald-500/30' : i===1 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-red-500/10 border-red-500/30'} animate-slide-up`} style={{animationDelay: `${i*0.2}s`}} />
                    {i !== 0 && <div className={`h-12 rounded border ${i===1 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-red-500/10 border-red-500/30'} animate-slide-up`} style={{animationDelay: `${i*0.3 + 0.2}s`}} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Engenharia e Arquitetura (Details/Accordion para Jargões) */}
      <section className="py-20 relative border-b border-brimajor-techgray">
        <div className="max-w-4xl mx-auto px-4">
          <AnimateOnScroll>
            <details className="group bg-brimajor-graphite border border-brimajor-techgray rounded-xl overflow-hidden cursor-pointer">
              <summary className="p-6 font-semibold text-lg flex justify-between items-center bg-brimajor-black group-hover:bg-brimajor-graphite transition-colors">
                Arquitetura Técnica (Para Engenharia de Software)
                <ChevronDown className="w-5 h-5 text-zinc-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-6 pt-2 text-sm text-zinc-400 font-mono space-y-4">
                <p>Nossa fundação é construída para resiliência transacional extrema:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-brimajor-neon">Frontend:</strong> React 18 + Vite, TanStack Query para cache sync, Zustand (State), e Tailwind CSS.</li>
                  <li><strong className="text-brimajor-neon">Backend:</strong> Node.js + Express + PostgreSQL 15, com Redis 7 para sessões e cache L1.</li>
                  <li><strong className="text-brimajor-neon">Data Layer:</strong> Concorrência Pessimista (`FOR UPDATE`) em movimentações para evitar Race Conditions.</li>
                  <li><strong className="text-brimajor-neon">Security:</strong> Role-Based Access Control (RBAC) com assinaturas JWT assinadas criptograficamente.</li>
                  <li><strong className="text-brimajor-neon">Forecasting:</strong> Algoritmos de Suavização Exponencial (Holt-Winters) para previsão de consumo sazonal.</li>
                </ul>
              </div>
            </details>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Módulos do Sistema */}
      <section id="modulos" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-100 mb-4">Capacidades da Plataforma</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {estoqueModules.map((modulo, index) => (
              <AnimateOnScroll key={modulo.id} delay={(index % 3) * 100}>
                <div className="bg-brimajor-graphite border border-brimajor-techgray rounded-xl p-6 h-full hover:border-brimajor-primary/40 transition-all hover:bg-brimajor-graphite/80 group">
                  <div className="bg-brimajor-black w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-brimajor-techgray group-hover:border-brimajor-primary/50 group-hover:text-brimajor-neon transition-colors">
                    {iconMap[modulo.icon]}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 mb-3">{modulo.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{modulo.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Modelo de Engajamento */}
      <section className="py-24 bg-brimajor-graphite border-t border-brimajor-techgray relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-zinc-100 mb-12">Jornada de Implantação</h2>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-10 right-10 h-[1px] bg-brimajor-techgray" />
            
            <AnimateOnScroll delay={0}>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brimajor-black border border-brimajor-primary text-brimajor-primary flex items-center justify-center font-bold text-xl mb-4 shadow-[0_0_15px_rgba(0,102,255,0.2)]">1</div>
                <h4 className="font-bold text-white mb-2">Piloto Controlado</h4>
                <p className="text-sm text-zinc-400">Rodamos em paralelo a um processo pequeno (ex: 1 máquina ou setor) sem interrupção.</p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll delay={150}>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brimajor-black border border-brimajor-techgray text-zinc-500 flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h4 className="font-bold text-white mb-2">Implantação Gradual</h4>
                <p className="text-sm text-zinc-400">Treinamento dos operadores e integração com sistemas legados da planta.</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brimajor-black border border-brimajor-techgray text-zinc-500 flex items-center justify-center font-bold text-xl mb-4">3</div>
                <h4 className="font-bold text-white mb-2">Suporte Contínuo</h4>
                <p className="text-sm text-zinc-400">Manutenção preventiva, monitoramento de uptime e evolução sob demanda.</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="py-24 relative overflow-hidden" id="contato">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <AnimateOnScroll>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Fale com a Engenharia</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">Agende uma demonstração do Kanban de Estoque rodando em ambiente real e valide as regras de negócio para sua operação.</p>
            </div>
            {/* O ContactForm pega o initial state do value para pré-selecionar */}
            <ContactForm initialInterest="gestao-estoque" />
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
