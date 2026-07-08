import { Metadata } from "next";
import { iniciacoes } from "@/lib/data";
import { ContactForm } from "@/components/contact-form";
import { BrandWatermark } from "@/components/brand-watermark";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Beaker, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Iniciações & Prototipagem | Brimajor",
  description: "Conheça nossas Iniciações em IoT, Web e Sistemas Embarcados em Manaus. Soluções customizadas sob demanda.",
};

export default function Iniciacoes() {
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
            Escolha um conceito de partida para adaptarmos ao seu cenário sob demanda. 
            Todas as aplicações abaixo são modeladas como MVPs de avaliação técnica.
          </p>
        </div>
      </section>

      {/* Grid de Projetos */}
      <section className="py-16" aria-label="Projetos de Iniciação">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {iniciacoes.map((item, index) => (
              <AnimateOnScroll key={item.id} delay={index * 100}>
                <div className="bg-brimajor-black border border-brimajor-techgray rounded-xl overflow-hidden flex flex-col h-full group hover:border-brimajor-primary/40 transition-colors duration-300">
                  <div className="bg-brimajor-graphite/50 p-6 border-b border-brimajor-techgray relative">
                    {item.id === "gestao-estoque" ? (
                      <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-brimajor-primary/20 text-brimajor-neon border border-brimajor-primary/30">Fase Final de Dev.</span>
                    ) : (
                      <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700">Conceito em Validação</span>
                    )}
                    <h2 className="text-xl font-bold text-zinc-100 group-hover:text-brimajor-neon transition-colors pr-32">
                      {item.title}
                    </h2>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-brimajor-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" /> O Desafio
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.challenge}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-brimajor-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" /> Abordagem
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.approach}</p>
                    </div>
                    
                    <div className="bg-brimajor-dark/20 p-4 rounded-lg border border-brimajor-dark/50 mt-auto">
                      <h3 className="text-sm font-semibold text-brimajor-neon uppercase tracking-wider mb-2">
                        Valor Esperado
                      </h3>
                      <p className="text-zinc-300 text-sm">{item.value}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-0 mt-auto">
                    <a href="#contato" className="block w-full text-center bg-brimajor-techgray hover:bg-brimajor-primary text-zinc-100 font-medium py-3 rounded-md transition-colors border border-brimajor-techgray">
                      Solicitar Implementação deste Conceito
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Contato */}
      <section id="contato" className="py-16 bg-brimajor-graphite/30" aria-label="Formulário de Contato">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
