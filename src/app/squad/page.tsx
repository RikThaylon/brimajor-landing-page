import type { Metadata } from "next";
import { IconeWhatsApp } from "@/components/ui/icone";
import { linkWhatsApp } from "@/lib/whatsapp";

const titulo = "Squads de IA sob medida";
const descricao = "A Brimajor monta squads de agentes de IA para outras equipes. Juntos, escolhemos as tarefas, as ferramentas e os pontos em que uma pessoa revisa a entrega.";

export const metadata: Metadata = {
  title: titulo,
  description: descricao,
  openGraph: { title: titulo, description: descricao, url: "/squad" },
};

export default function PaginaSquad() {
  return (
    <section aria-labelledby="titulo-squad" className="relative overflow-clip pb-24 pt-32 md:pb-32 md:pt-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_80%_30%,rgba(127,227,255,0.12),transparent),radial-gradient(40%_50%_at_10%_60%,rgba(0,102,255,0.18),transparent)]" />
      <div className="container-site grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <p className="rotulo-secao"><span className="pad" />Serviço para equipes</p>
          <h1 id="titulo-squad" className="mt-6 font-display text-[clamp(2.6rem,6.6vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            Squads de IA <span className="text-neon">sob medida</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-suave">
            Montamos uma squad de agentes de IA para trabalhar com a sua equipe. Partimos de uma tarefa que vocês já executam e definimos o que os agentes podem assumir e quem revisa o resultado.
          </p>
          <a href={linkWhatsApp("Olá, Brimajor! Quero conversar sobre montar uma squad de IA para a minha equipe.")} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primaria px-6 py-3.5 text-sm font-semibold text-white">
            <IconeWhatsApp className="h-4 w-4" /> Conversar sobre a minha equipe
          </a>
        </div>
        <div className="cartao p-7 md:p-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Como desenhamos a squad</h2>
          <dl className="mt-6 divide-y divide-linha">
            <div className="pb-5">
              <dt className="font-medium text-texto">O trabalho de hoje</dt>
              <dd className="mt-2 text-sm leading-relaxed text-suave">Escolhemos uma entrega concreta. Pode ser transformar um pedido em requisitos ou revisar mudanças no código.</dd>
            </div>
            <div className="py-5">
              <dt className="font-medium text-texto">Os papéis e as ferramentas</dt>
              <dd className="mt-2 text-sm leading-relaxed text-suave">Definimos a tarefa de cada agente, os materiais a que ele terá acesso e quando chamar alguém da equipe.</dd>
            </div>
            <div className="pt-5">
              <dt className="font-medium text-texto">O primeiro teste</dt>
              <dd className="mt-2 text-sm leading-relaxed text-suave">Experimentamos o fluxo com um caso do dia a dia. Vocês avaliam a entrega e decidimos juntos o que ajustar.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
