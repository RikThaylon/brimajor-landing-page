import { ArrowRight, ArrowUpRight, Box, Clapperboard, FileImage } from "lucide-react";
import { Contador, Letreiro, TextoAceso } from "@/components/animacao/efeitos";
import { Revelar } from "@/components/animacao/revelar";
import { TituloRevelado } from "@/components/animacao/titulo-revelado";
import { Foto } from "@/components/foto";
import Link from "next/link";
import { Cena3D } from "@/components/tres/cena-3d";
import { CartaoHolofote } from "@/components/ui/cartao-holofote";
import { iniciacoes, manifesto } from "@/lib/conteudo";
import { ACADEMY_URL } from "@/lib/cursos/academy";
import type { Catalogo } from "@/lib/cursos/tipos";
import { linkWhatsApp } from "@/lib/whatsapp";

export function Manifesto({ totalCursos }: { totalCursos: number }) {
  const numeros = [
    { valor: 4, rotulo: "frentes de engenharia" },
    { valor: totalCursos, rotulo: "cursos de IA no mapa" },
  ];
  return (
    <section aria-labelledby="titulo-manifesto" className="relative py-28 md:py-40">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div>
          <h2 id="titulo-manifesto" className="rotulo-secao"><span className="pad" />01 — Quem somos</h2>
          <TextoAceso texto={manifesto} className="mt-8 font-display text-[clamp(1.55rem,3.3vw,2.85rem)] font-medium leading-[1.2] tracking-tight" />
          <dl className="mt-14 grid grid-cols-2 gap-4 border-t border-linha pt-8 sm:gap-8">
            {numeros.map((n) => (
              <div key={n.rotulo} className="flex flex-col-reverse gap-2">
                <dt className="text-xs leading-snug text-apagado sm:text-sm">{n.rotulo}</dt>
                <dd className="font-display text-4xl font-semibold text-white sm:text-6xl">
                  <Contador valor={n.valor} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <Revelar efeito="mascara" className="relative aspect-[4/5] w-full">
          <Foto nome="equipe" className="h-full w-full" sizes="(max-width: 1024px) 100vw, 40vw" />
        </Revelar>
      </div>
    </section>
  );
}

export function FaixaLetreiro() {
  return (
    <div className="border-y border-linha bg-superficie/50 py-6">
      <Letreiro
        className="font-display text-3xl font-semibold uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_#33aaff] sm:text-5xl"
        itens={["Sistemas embarcados", "Inteligência artificial", "IoT industrial", "Prototipagem ágil", "Visão computacional", "Treinamentos de IA"]}
      />
    </div>
  );
}

export function Solucoes() {
  return (
    <section aria-labelledby="titulo-solucoes" className="py-28 md:py-36">
      <div className="container-site">
        <h2 className="rotulo-secao"><span className="pad" />03 — Produtos e serviços</h2>
        <TituloRevelado id="titulo-solucoes" className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-tight">
          Tecnologia para sua operação e para apresentar suas ideias.
        </TituloRevelado>
        <Revelar emSequencia className="mt-14 grid gap-6 lg:grid-cols-2">
          <CartaoHolofote className="p-8 md:p-10" >
            <div data-item className="relative flex h-full flex-col">
              <span className="w-fit rounded-full border border-neon/40 bg-neon/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-neon">Fase final de desenvolvimento</span>
              <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">Kanban Estoque</h3>
              <p className="mt-4 max-w-md leading-relaxed text-suave">
                Gestão industrial de suprimentos baseada em realidade: faixas Kanban dinâmicas, alçadas antifraude, retenção para auditoria e log imutável de cada movimentação.
              </p>
              <ul className="mt-8 grid grid-cols-3 gap-3 text-center">
                {["Auditável", "Antifraude", "Tempo real"].map((t) => (
                  <li key={t} className="rounded-xl border border-linha bg-fundo/50 px-2 py-4 text-sm font-medium">{t}</li>
                ))}
              </ul>
              <Link href="/estoque" className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-neon hover:text-white">
                Conhecer o Kanban Estoque <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </CartaoHolofote>
          <CartaoHolofote className="p-8 md:p-10">
            <div data-item className="relative flex h-full flex-col">
              <span className="w-fit rounded-full border border-ciano/40 bg-ciano/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ciano">Serviço sob medida</span>
              <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">Squads de agentes de IA</h3>
              <p className="mt-4 max-w-md leading-relaxed text-suave">Montamos squads para outras equipes. Você traz um fluxo de trabalho e desenhamos juntos os papéis dos agentes, as ferramentas e os momentos de revisão humana.</p>
              <Link href="/squad" className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-neon hover:text-white">
                Ver como montamos a sua squad <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </CartaoHolofote>
          <CartaoHolofote className="p-8 md:p-10 lg:col-span-2">
            <article id="visualizacao-imobiliaria" data-item aria-labelledby="titulo-visualizacao-imobiliaria" className="relative grid scroll-mt-28 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-ciano">Visualização imobiliária · Sob orçamento</p>
                <h3 id="titulo-visualizacao-imobiliaria" className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-4xl">Da planta à apresentação do imóvel em 3D.</h3>
                <p className="mt-5 max-w-xl leading-relaxed text-suave">
                  Criamos visualizações e vídeos de apresentação a partir da planta do imóvel para ajudar imobiliárias, corretores e construtoras a mostrar ambientes aos seus clientes.
                </p>
                <p className="mt-4 max-w-xl leading-relaxed text-suave">
                  Podemos conversar sobre um tour interativo, os ambientes, a mobília e a iluminação desejados. O formato e o orçamento são definidos conforme o projeto.
                </p>
                <a href={linkWhatsApp("Olá, Brimajor! Gostaria de solicitar um orçamento para uma visualização 3D ou vídeo de apresentação de imóvel a partir de uma planta.")} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-primaria px-6 py-3 font-semibold text-white transition-colors hover:bg-neon">
                  Solicitar orçamento
                </a>
                <p className="mt-3 text-sm text-apagado">A conversa continua pelo WhatsApp.</p>
              </div>
              <div className="rounded-2xl border border-linha-forte bg-fundo/60 p-6 md:p-7">
                <h4 className="font-display text-xl font-semibold">Como podemos apresentar seu projeto</h4>
                <ul className="mt-6 space-y-5">
                  <li className="flex gap-4">
                    <FileImage className="mt-1 h-5 w-5 shrink-0 text-ciano" aria-hidden="true" />
                    <div><strong className="font-medium text-texto">Planta e referências</strong><p className="mt-1 text-sm leading-relaxed text-suave">Compartilhe a planta, as medidas disponíveis e o estilo desejado.</p></div>
                  </li>
                  <li className="flex gap-4">
                    <Box className="mt-1 h-5 w-5 shrink-0 text-ciano" aria-hidden="true" />
                    <div><strong className="font-medium text-texto">Ambientes em 3D</strong><p className="mt-1 text-sm leading-relaxed text-suave">Planejamos a visualização dos espaços com materiais e iluminação adequados ao projeto.</p></div>
                  </li>
                  <li className="flex gap-4">
                    <Clapperboard className="mt-1 h-5 w-5 shrink-0 text-ciano" aria-hidden="true" />
                    <div><strong className="font-medium text-texto">Vídeo ou tour</strong><p className="mt-1 text-sm leading-relaxed text-suave">Definimos a apresentação que você poderá compartilhar com seus clientes.</p></div>
                  </li>
                </ul>
              </div>
            </article>
          </CartaoHolofote>
        </Revelar>
      </div>
    </section>
  );
}

export function Iniciacoes() {
  return (
    <section aria-labelledby="titulo-iniciacoes" className="py-28 md:py-36">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="rotulo-secao"><span className="pad" />05 — Iniciações</h2>
          <TituloRevelado id="titulo-iniciacoes" className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">
            Conceitos em validação, prontos para o seu cenário.
          </TituloRevelado>
          <p className="mt-6 max-w-md leading-relaxed text-suave">Linhas de pesquisa que adaptamos sob demanda — todas modeladas como MVPs de avaliação técnica.</p>
          <Revelar efeito="mascara" className="mt-10 aspect-[4/3] w-full">
            <Foto nome="prototipos" className="h-full w-full" sizes="(max-width: 1024px) 100vw, 35vw" />
          </Revelar>
        </div>
        <Revelar emSequencia className="grid gap-5 sm:grid-cols-2">
          {iniciacoes.map((item, i) => (
            <CartaoHolofote key={item.id} className="p-7">
              <article data-item className="relative">
                <span className="font-mono text-xs text-apagado">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{item.titulo}</h3>
                <p className="mt-4 text-sm leading-relaxed text-suave"><strong className="font-medium text-texto">Desafio.</strong> {item.desafio}</p>
                <p className="mt-3 text-sm leading-relaxed text-neon/90"><strong className="font-medium text-neon">Valor.</strong> {item.valor}</p>
              </article>
            </CartaoHolofote>
          ))}
          <Link data-item href="/iniciacoes" className="group flex items-center justify-between rounded-[1.25rem] border border-dashed border-linha-forte p-7 text-suave transition-colors hover:border-neon hover:text-white sm:col-span-2">
            Ver todas as iniciações e solicitar um conceito
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Revelar>
      </div>
    </section>
  );
}

export function ChamadaCursos({ catalogo }: { catalogo: Catalogo }) {
  return (
    <section aria-labelledby="titulo-chamada-cursos" className="relative overflow-clip py-28 md:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_25%_50%,rgba(0,102,255,0.16),transparent)]" />
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <Cena3D
          tipo="rede"
          rotulo="Modelo 3D do cérebro-circuito da Brimajor: neurônios ligados por sinapses com sinais em movimento"
          imagemEstatica="/modelos/cerebro-circuito.webp"
          className="mx-auto aspect-square w-full max-w-xl"
        />
        <div>
          <h2 className="rotulo-secao"><span className="pad" />06 — Cursos e treinamentos</h2>
          <TituloRevelado id="titulo-chamada-cursos" className="mt-6 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-tight">
            IA que entra na rotina da equipe.
          </TituloRevelado>
          <p className="mt-6 max-w-lg leading-relaxed text-suave">
            Trilhas para empresas iniciantes e intermediárias, sem exigir programação. Para equipes mais maduras, avançamos em agentes supervisionados e squads de agentes sob medida.
          </p>
          <Revelar emSequencia className="mt-10 space-y-3">
            {catalogo.trilhas.map((t) => {
              const total = catalogo.cursos.filter((c) => c.trilhaId === t.id).length;
              return (
                <div data-item key={t.id} className="flex items-center gap-4">
                  <span className="h-1.5 w-12 rounded-full" style={{ background: t.cor, boxShadow: `0 0 12px ${t.cor}` }} />
                  <span className="flex-1 font-medium">{t.nome}</span>
                  <span className="font-mono text-xs text-apagado">{total} {total === 1 ? "curso" : "cursos"}</span>
                </div>
              );
            })}
          </Revelar>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a href={ACADEMY_URL} className="inline-flex items-center rounded-full bg-primaria px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(0,102,255,0.9)] transition-transform hover:-translate-y-0.5">
              Ver cursos na Academy
            </a>
            <Link href="/cursos" className="rounded-full px-3 py-3 text-sm font-medium text-neon hover:underline">
              Mapa das trilhas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
