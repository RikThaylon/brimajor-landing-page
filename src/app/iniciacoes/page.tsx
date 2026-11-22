import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Revelar } from "@/components/animacao/revelar";
import { TituloRevelado } from "@/components/animacao/titulo-revelado";
import { Foto } from "@/components/foto";
import { FormularioContato } from "@/components/formulario-contato";
import { LinkTransicao } from "@/components/layout/link-transicao";
import { IconeWhatsApp } from "@/components/ui/icone";
import { iniciacoes } from "@/lib/conteudo";
import { linkWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Iniciações e prototipagem",
  description: "Linhas de pesquisa e conceitos em validação que a Brimajor adapta ao seu cenário: estoque, inspeção, automação e IoT predial.",
};

export default function PaginaIniciacoes() {
  return (
    <>
      <HeroIniciacoes />
      <DestaqueKanban />
      <SecaoConceitos />
      <SecaoContatoIniciacoes />
    </>
  );
}

function HeroIniciacoes() {
  return (
    <section aria-labelledby="titulo-iniciacoes-pagina" className="relative overflow-clip pb-12 pt-32 md:pt-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_20%_30%,rgba(0,102,255,0.18),transparent)]" />
      <div className="container-site grid items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="rotulo-secao"><span className="pad" />Linhas de pesquisa</p>
          <TituloRevelado como="h1" id="titulo-iniciacoes-pagina" imediato className="mt-6 font-display text-[clamp(2.4rem,5.6vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
            Iniciações e prototipagem funcional.
          </TituloRevelado>
          <Revelar efeito="desfoque" atraso={0.3} className="mt-6 max-w-xl text-lg leading-relaxed text-suave">
            <p>Conceitos em validação que adaptamos ao seu cenário sob demanda — todos modelados como MVPs de avaliação técnica.</p>
          </Revelar>
        </div>
        <Revelar efeito="mascara" className="aspect-[4/3] w-full">
          <Foto nome="prototipos" className="h-full w-full" sizes="(max-width: 1024px) 100vw, 40vw" prioridade />
        </Revelar>
      </div>
    </section>
  );
}

function DestaqueKanban() {
  return (
    <section className="py-10">
      <div className="container-site">
        <div className="cartao flex flex-col items-start justify-between gap-6 border-neon/30 p-7 md:flex-row md:items-center">
          <div>
            <span className="rounded-full bg-neon/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-neon">Fase final de desenvolvimento</span>
            <h2 className="mt-4 font-display text-2xl font-semibold">Kanban de Estoque Inteligente</h2>
            <p className="mt-2 max-w-xl text-sm text-suave">Nosso produto mais maduro: Kanban dinâmico, RBAC, auditoria imutável e previsão de consumo para plantas industriais.</p>
          </div>
          <LinkTransicao href="/estoque" className="inline-flex flex-none items-center gap-2 rounded-full bg-primaria px-6 py-3 text-sm font-semibold text-white">
            Ver página do produto <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkTransicao>
        </div>
      </div>
    </section>
  );
}

function SecaoConceitos() {
  return (
    <section aria-labelledby="titulo-conceitos" className="py-20 md:py-28">
      <div className="container-site">
        <h2 id="titulo-conceitos" className="rotulo-secao"><span className="pad" />Conceitos em validação</h2>
        <Revelar emSequencia className="mt-10 grid gap-6 lg:grid-cols-2">
          {iniciacoes.map((item, i) => (
            <article data-item key={item.id} className="cartao flex flex-col p-8">
              <span className="font-mono text-xs text-apagado">Conceito 0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{item.titulo}</h3>
              <dl className="mt-6 flex-1 space-y-5 text-sm leading-relaxed">
                <div><dt className="font-mono text-xs uppercase tracking-[0.15em] text-neon">O desafio</dt><dd className="mt-1.5 text-suave">{item.desafio}</dd></div>
                <div><dt className="font-mono text-xs uppercase tracking-[0.15em] text-neon">Abordagem</dt><dd className="mt-1.5 text-suave">{item.abordagem}</dd></div>
                <div className="rounded-xl border border-neon/25 bg-neon/5 p-4"><dt className="font-mono text-xs uppercase tracking-[0.15em] text-ciano">Valor esperado</dt><dd className="mt-1.5 text-texto">{item.valor}</dd></div>
              </dl>
              <a href={linkWhatsApp(`Olá, Brimajor! Quero conversar sobre o conceito "${item.titulo}" para a minha operação.`)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-linha-forte px-5 py-3 text-sm font-medium hover:border-whatsapp hover:text-whatsapp">
                <IconeWhatsApp className="h-4 w-4" /> Solicitar este conceito
              </a>
            </article>
          ))}
        </Revelar>
      </div>
    </section>
  );
}

function SecaoContatoIniciacoes() {
  return (
    <section id="contato" aria-labelledby="titulo-contato-iniciacoes" className="py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        <div>
          <p className="rotulo-secao"><span className="pad" />Projeto customizado</p>
          <TituloRevelado id="titulo-contato-iniciacoes" className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-tight">
            Tem um desafio que não está na lista?
          </TituloRevelado>
          <p className="mt-6 max-w-md leading-relaxed text-suave">Descreva o cenário. Respondemos com uma proposta de prova de conceito controlada.</p>
        </div>
        <FormularioContato assuntoInicial="Prova de conceito (PoC)" />
      </div>
    </section>
  );
}
