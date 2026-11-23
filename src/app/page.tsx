import { MapPin } from "lucide-react";
import { TituloRevelado } from "@/components/animacao/titulo-revelado";
import { Foto } from "@/components/foto";
import { FormularioContato } from "@/components/formulario-contato";
import { Frentes } from "@/components/home/frentes";
import { Hero } from "@/components/home/hero";
import { ModeloTrabalho } from "@/components/home/modelo-trabalho";
import { ChamadaCursos, FaixaLetreiro, Iniciacoes, Manifesto, Solucoes } from "@/components/home/secoes";
import { IconeInstagram, IconeWhatsApp } from "@/components/ui/icone";
import { empresa } from "@/lib/conteudo";
import { getCatalogo } from "@/lib/cursos/repositorio";
import { linkWhatsApp, WHATSAPP_EXIBICAO } from "@/lib/whatsapp";

export const revalidate = 300;

export default async function Inicio() {
  const catalogo = await getCatalogo();
  return (
    <>
      <Hero />
      <Manifesto totalCursos={catalogo.cursos.length} />
      <FaixaLetreiro />
      <Frentes />
      <Solucoes />
      <ModeloTrabalho foto={<Foto nome="bancada" className="h-full w-full" sizes="(max-width: 1024px) 100vw, 38vw" />} />
      <Iniciacoes />
      <ChamadaCursos catalogo={catalogo} />

      <section id="contato" aria-labelledby="titulo-contato" className="py-28 md:py-36">
        <div className="container-site grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="rotulo-secao"><span className="pad" />07 — Contato</h2>
            <TituloRevelado id="titulo-contato" className="mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.98] tracking-tight">
              Vamos tirar sua ideia do papel?
            </TituloRevelado>
            <p className="mt-6 max-w-md leading-relaxed text-suave">
              Conte o desafio — de uma prova de conceito a um treinamento para a sua equipe. A conversa começa no WhatsApp e a resposta vem da própria engenharia.
            </p>
            <ul className="mt-10 space-y-4 text-sm">
              <li>
                <a href={linkWhatsApp("Olá, Brimajor! Vim pelo site.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-whatsapp hover:underline">
                  <IconeWhatsApp className="h-5 w-5" /> {WHATSAPP_EXIBICAO}
                </a>
              </li>
              <li>
                <a href={empresa.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-suave hover:text-white">
                  <IconeInstagram className="h-5 w-5" /> {empresa.instagram.usuario}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-suave">
                <MapPin className="h-5 w-5 text-neon" aria-hidden="true" /> {empresa.cidade}
              </li>
            </ul>
          </div>
          <FormularioContato />
        </div>
      </section>
    </>
  );
}
