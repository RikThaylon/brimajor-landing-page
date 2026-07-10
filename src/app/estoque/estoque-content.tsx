"use client";

import { BarChart3, ShieldCheck, CheckCircle, Users, FileBarChart, Fingerprint } from "lucide-react";
import { estoqueModules } from "@/lib/data";
import { BrandWatermark } from "@/components/brand-watermark";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { ContactForm } from "@/components/contact-form";
import { KanbanPreview } from "@/components/kanban-preview";
import { StickyScrollShowcase } from "@/components/sticky-scroll-showcase";

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  FileBarChart: <FileBarChart className="w-5 h-5" />,
  Fingerprint: <Fingerprint className="w-5 h-5" />,
};

export function EstoqueContent() {
  const steps = [
    {
      id: "arquitetura",
      content: (
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-brimajor-primary/20 text-brimajor-neon border border-brimajor-primary/30">
            Arquitetura de Dados
          </span>
          <h2 className="text-3xl font-bold text-white">Fundação Industrial Resiliente</h2>
          <p className="text-zinc-300 leading-relaxed font-light">
            Construído para resiliência transacional extrema. Evita furos de inventário silenciosos e garante conformidade contínua com as normas fiscais.
          </p>
          <div className="text-sm text-zinc-400 font-mono space-y-2 pt-4">
            <p><strong className="text-brimajor-neon">Data Layer:</strong> Concorrência Pessimista (`FOR UPDATE`) em movimentações para evitar Race Conditions.</p>
            <p><strong className="text-brimajor-neon">Uptime:</strong> Redis 7 atuando como cache L1 para resposta imediata nas leituras em campo.</p>
            <p><strong className="text-brimajor-neon">Security:</strong> Assinaturas JWT e controle de alçadas criptográficas para operações críticas.</p>
          </div>
        </div>
      )
    },
    ...estoqueModules.map((modulo) => ({
      id: modulo.id,
      content: (
        <div className="space-y-4">
          <div className="bg-brimajor-black w-12 h-12 rounded-lg flex items-center justify-center border border-brimajor-techgray text-brimajor-neon">
            {iconMap[modulo.icon]}
          </div>
          <h3 className="text-2xl font-bold text-white">{modulo.title}</h3>
          <p className="text-zinc-300 leading-relaxed font-light">{modulo.description}</p>
        </div>
      )
    }))
  ];

  return (
    <div className="bg-brimajor-black text-zinc-100 min-h-screen selection:bg-brimajor-primary selection:text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-24 lg:py-32 border-b border-brimajor-techgray" aria-label="Kanban de Estoque">
        <BrandWatermark />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-brimajor-primary/10 border border-brimajor-primary/20 rounded-full px-3 py-1 text-[10px] uppercase tracking-wider text-brimajor-neon font-bold">
                <span>Fase Final de Desenvolvimento</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                Gestão industrial baseada em <span className="bg-gradient-to-r from-brimajor-neon to-brimajor-primary bg-clip-text text-transparent">realidade</span>
              </h1>
              <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl mx-auto md:mx-0 font-light leading-relaxed">
                Elimine rupturas imprevistas e tenha auditoria pronta para fiscalização. Um sistema feito para plantas industriais que não podem parar.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-2xl font-bold text-white">Auditável</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Log imutável</span>
                </div>
                <div className="w-px h-10 bg-brimajor-techgray hidden sm:block" />
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-2xl font-bold text-white">Anti-fraude</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Alçadas duplas</span>
                </div>
                <div className="w-px h-10 bg-brimajor-techgray hidden sm:block" />
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-2xl font-bold text-white">Real-time</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wide">Visibilidade</span>
                </div>
              </div>
            </div>

            {/* Kanban Preview interativo padrão no hero */}
            <div className="w-full max-w-lg mx-auto">
              <KanbanPreview />
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Scroll Showcase para Arquitetura e Módulos do Sistema */}
      <section className="py-24 border-b border-brimajor-techgray relative overflow-hidden" aria-label="Detalhes Técnicos do Kanban">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StickyScrollShowcase
            steps={steps}
            renderVisual={(activeId) => (
              <div className="w-full flex flex-col items-center justify-center gap-6">
                <KanbanPreview activeModuleId={activeId} />
                <div className="text-center">
                  <span className="text-xs text-zinc-500 font-mono">
                    Visualização Interativa: {activeId === "arquitetura" ? "Visão Geral do Quadro" : `Módulo ${activeId.toUpperCase()}`}
                  </span>
                </div>
              </div>
            )}
            side="right"
          />
        </div>
      </section>

      {/* Modelo de Engajamento */}
      <section className="py-24 bg-brimajor-graphite border-t border-brimajor-techgray relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-zinc-100 mb-12">Jornada de Implantação</h2>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-10 right-10 h-[1px] bg-gradient-to-r from-brimajor-primary/10 via-brimajor-neon/40 to-brimajor-primary/10" />
            
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
            <ContactForm initialInterest="gestao-estoque" />
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
