"use client";

import { useState } from "react";
import { iniciacoes } from "@/lib/data";
import { ContactForm } from "@/components/contact-form";
import { BrandWatermark } from "@/components/brand-watermark";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { StickyScrollShowcase } from "@/components/sticky-scroll-showcase";
import { Beaker, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const concepts = iniciacoes.filter((i) => i.id !== "gestao-estoque");

export function IniciacoesContent() {
  const [selectedInterest, setSelectedInterest] = useState("");

  function selectAndScroll(id: string) {
    setSelectedInterest(id);
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  }

  // Create steps for the StickyScrollShowcase
  const steps = concepts.map((item) => ({
    id: item.id,
    content: (
      <div className="bg-brimajor-black border border-brimajor-techgray rounded-xl overflow-hidden flex flex-col h-full group hover:border-brimajor-primary/40 transition-colors duration-300">
        <div className="bg-brimajor-graphite/50 p-6 border-b border-brimajor-techgray relative">
          <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700">
            Conceito em Validação
          </span>
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-brimajor-neon transition-colors pr-32">
            {item.title}
          </h3>
        </div>

        <div className="p-6 flex-1 flex flex-col gap-6">
          <div>
            <h4 className="text-sm font-semibold text-brimajor-primary uppercase tracking-wider mb-2 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" /> O Desafio
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.challenge}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-brimajor-primary uppercase tracking-wider mb-2 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" /> Abordagem
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.approach}</p>
          </div>

          <div className="bg-brimajor-dark/20 p-4 rounded-lg border border-brimajor-dark/50 mt-auto">
            <h4 className="text-sm font-semibold text-brimajor-neon uppercase tracking-wider mb-2">
              Valor Esperado
            </h4>
            <p className="text-zinc-300 text-sm">{item.value}</p>
          </div>
        </div>

        <div className="p-6 pt-0 mt-auto">
          <button
            onClick={() => selectAndScroll(item.id)}
            className="block w-full text-center bg-brimajor-techgray hover:bg-brimajor-primary text-zinc-100 font-medium py-3 rounded-md transition-colors border border-brimajor-techgray"
          >
            Solicitar Implementação deste Conceito
          </button>
        </div>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header */}
      <section className="relative bg-brimajor-graphite border-b border-brimajor-techgray py-16" aria-label="Linhas de Pesquisa">
        <BrandWatermark />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-brimajor-primary/10 rounded-full mb-6 text-brimajor-neon">
            <Beaker className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-50 mb-6">
            Linhas de Pesquisa e Prototipagem Funcional
          </h1>
          <p className="text-zinc-400 text-lg">
            Conceitos em validação que adaptamos ao seu cenário sob demanda — todos modelados como MVPs de avaliação técnica.
          </p>
        </div>
      </section>

      {/* Destaque Kanban Estoque */}
      <section className="py-10 bg-brimajor-primary/5 border-b border-brimajor-primary/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimateOnScroll>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-brimajor-black border border-brimajor-primary/30 rounded-xl p-6 shadow-[0_0_30px_rgba(0,102,255,0.08)]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-brimajor-primary/20 text-brimajor-neon border border-brimajor-primary/30">
                  Fase Final de Desenvolvimento
                </span>
                <h2 className="text-xl font-bold text-white mt-3 mb-1">Kanban de Estoque Inteligente</h2>
                <p className="text-zinc-400 text-sm max-w-xl">
                  Nosso produto mais maduro — em fase final de desenvolvimento. Sistema completo com Kanban dinâmico, RBAC, auditoria imutável e forecasting inteligente para plantas industriais.
                </p>
              </div>
              <Link
                href="/estoque"
                className="shrink-0 inline-flex items-center gap-2 bg-brimajor-primary hover:bg-brimajor-neon text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 shadow-[0_0_16px_rgba(0,102,255,0.3)]"
              >
                Ver página dedicada <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Showcase Interativo de Iniciações */}
      <section className="py-16" aria-label="Projetos de Iniciação">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold text-zinc-200 mb-8">Conceitos em Validação</h2>
          <StickyScrollShowcase
            steps={steps}
            renderVisual={(activeId) => (
              <div className="bg-brimajor-graphite border border-brimajor-techgray rounded-xl p-6 w-full max-w-sm space-y-6 shadow-xl relative overflow-hidden">
                <h3 className="text-zinc-100 font-bold text-lg border-b border-brimajor-techgray pb-3">Status de Pesquisa</h3>
                <div className="space-y-4">
                  {concepts.map((concept, idx) => {
                    const isActive = activeId === concept.id;
                    return (
                      <div key={concept.id} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            isActive 
                              ? "bg-brimajor-primary text-white border-brimajor-neon shadow-[0_0_10px_rgba(0,102,255,0.4)]" 
                              : "bg-brimajor-black text-zinc-500 border-brimajor-techgray"
                          }`}>
                            {idx + 1}
                          </div>
                          {idx < concepts.length - 1 && (
                            <div className={`w-0.5 h-12 transition-all duration-300 ${isActive ? "bg-brimajor-primary" : "bg-zinc-800"}`} />
                          )}
                        </div>
                        <div>
                          <h4 className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-brimajor-neon" : "text-zinc-400"}`}>
                            {concept.title.replace("Conceito de ", "").replace("Protótipo de ", "").replace("Conceito para ", "")}
                          </h4>
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded transition-all duration-300 ${
                            isActive 
                              ? "bg-brimajor-primary/20 text-brimajor-neon border border-brimajor-primary/30" 
                              : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                          }`}>
                            {isActive ? "Em Foco" : "Aguardando"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            side="right"
          />
        </div>
      </section>

      {/* Seção de Contato */}
      <section id="contato" className="py-16 bg-brimajor-graphite/30" aria-label="Formulário de Contato">
        <div className="container mx-auto px-4">
          <ContactForm value={selectedInterest} onChange={setSelectedInterest} />
        </div>
      </section>
    </div>
  );
}
