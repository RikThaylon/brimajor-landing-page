import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Revelar } from "@/components/animacao/revelar";
import { TituloRevelado } from "@/components/animacao/titulo-revelado";
import { MapaCursos } from "@/components/cursos/mapa-cursos";
import { Foto } from "@/components/foto";
import { Cena3D } from "@/components/tres/cena-3d";
import { Icone, IconeWhatsApp } from "@/components/ui/icone";
import { formatosTreinamento } from "@/lib/conteudo";
import type { Catalogo } from "@/lib/cursos/tipos";
import { getCatalogo } from "@/lib/cursos/repositorio";
import { linkWhatsApp } from "@/lib/whatsapp";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Mapa de Cursos e Treinamentos de IA",
  description: "Trilhas de cursos de inteligência artificial da Brimajor: fundamentos, negócios e dados, desenvolvimento com LLMs e agentes, e IA embarcada & IoT. Turmas em Manaus, online e in-company.",
};

const passos = [
  { n: "01", titulo: "Escolha no mapa", texto: "Siga a trilha que combina com você e toque no curso para ver nível, formato e conteúdo." },
  { n: "02", titulo: "Chame no WhatsApp", texto: "O botão já abre a conversa com o nome do curso escrito. É só enviar." },
  { n: "03", titulo: "Combine turma e pagamento", texto: "A nossa equipe passa datas, formato e forma de pagamento direto com você." },
];

export default async function PaginaCursos() {
  const catalogo = await getCatalogo();
  return (
    <>
      <HeroCursos catalogo={catalogo} />
      <SecaoMapa catalogo={catalogo} />
      <SecaoFormatos />
      <SecaoInscricao />
    </>
  );
}

function HeroCursos({ catalogo }: { catalogo: Catalogo }) {
  return (
    <section aria-labelledby="titulo-cursos" className="relative overflow-clip pt-32 md:pt-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_75%_40%,rgba(0,102,255,0.22),transparent)]" />
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="rotulo-secao"><span className="pad" />Cursos e treinamentos · Brimajor</p>
          <TituloRevelado como="h1" id="titulo-cursos" imediato className="mt-6 font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.03em]">
            Mapa de cursos e treinamentos de <span className="text-neon">IA.</span>
          </TituloRevelado>
          <Revelar efeito="desfoque" atraso={0.4} className="mt-7 max-w-xl text-lg leading-relaxed text-suave">
            <p>Quatro trilhas, do primeiro contato com inteligência artificial até modelos rodando dentro de um microcontrolador. Comece na estação &ldquo;Comece aqui&rdquo; e siga a linha da sua cor.</p>
          </Revelar>
          <Revelar emSequencia atraso={0.6} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {catalogo.trilhas.map((t) => (
              <span data-item key={t.id} className="inline-flex items-center gap-2 text-sm">
                <span className="h-1.5 w-8 rounded-full" style={{ background: t.cor, boxShadow: `0 0 10px ${t.cor}` }} aria-hidden="true" />
                {t.nome}
              </span>
            ))}
          </Revelar>
        </div>
        <Cena3D
          tipo="rede"
          rotulo="Modelo 3D do cérebro-circuito da Brimajor com sinais percorrendo a rede neural"
          imagemEstatica="/modelos/cerebro-circuito.webp"
          className="mx-auto aspect-square w-full max-w-lg"
        />
      </div>
    </section>
  );
}

function SecaoMapa({ catalogo }: { catalogo: Catalogo }) {
  return (
    <section aria-labelledby="titulo-mapa" className="py-16 md:py-24">
      <div className="container-site">
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-neon/25 bg-neon/5 p-5 text-sm leading-relaxed text-suave">
          <Info className="mt-0.5 h-5 w-5 flex-none text-neon" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-texto">Catálogo em construção.</strong> Esta é a grade que estamos preparando — os cursos estão marcados como <em>Em breve</em>. Toque num curso e peça para ser avisado quando a turma abrir.
          </p>
        </div>
        <h2 id="titulo-mapa" className="sr-only">Mapa das trilhas</h2>
        <MapaCursos catalogo={catalogo} />
      </div>
    </section>
  );
}

function SecaoFormatos() {
  return (
    <section aria-labelledby="titulo-formatos" className="py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <Revelar efeito="mascara" className="aspect-[4/3] w-full">
          <Foto nome="aulas" className="h-full w-full" sizes="(max-width: 1024px) 100vw, 40vw" />
        </Revelar>
        <div>
          <p className="rotulo-secao"><span className="pad" />Formatos</p>
          <TituloRevelado id="titulo-formatos" className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-tight">
            Do jeito que a sua rotina pede.
          </TituloRevelado>
          <Revelar emSequencia className="mt-10 grid gap-4">
            {formatosTreinamento.map((f) => (
              <div data-item key={f.titulo} className="cartao flex gap-5 p-6">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-neon/30 bg-neon/10">
                  <Icone nome={f.icone} className="h-6 w-6 text-neon" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{f.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-suave">{f.texto}</p>
                </div>
              </div>
            ))}
          </Revelar>
        </div>
      </div>
    </section>
  );
}

function SecaoInscricao() {
  return (
    <section aria-labelledby="titulo-inscricao" className="py-20 md:py-28">
      <div className="container-site">
        <p className="rotulo-secao"><span className="pad" />Como se inscrever</p>
        <TituloRevelado id="titulo-inscricao" className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-tight">
          Três passos e você está na turma.
        </TituloRevelado>
        <Revelar como="ol" emSequencia className="mt-12 grid gap-5 md:grid-cols-3">
          {passos.map((p) => (
            <li data-item key={p.n} className="cartao p-7">
              <span className="font-display text-5xl font-semibold text-neon">{p.n}</span>
              <h3 className="mt-6 font-display text-xl font-semibold">{p.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-suave">{p.texto}</p>
            </li>
          ))}
        </Revelar>
        <div className="cartao mt-10 flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold">Treinamento para a sua equipe?</h3>
            <p className="mt-2 max-w-xl text-suave">Montamos uma turma in-company com exemplos do seu negócio. Conte o tamanho da equipe e o objetivo.</p>
          </div>
          <a
            href={linkWhatsApp("Olá, Brimajor! Quero um treinamento de IA in-company para a minha equipe.")}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex flex-none items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            <IconeWhatsApp className="h-5 w-5" /> Pedir proposta in-company
          </a>
        </div>
      </div>
    </section>
  );
}
