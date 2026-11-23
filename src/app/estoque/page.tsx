import type { Metadata } from "next";
import { FileLock2 } from "lucide-react";
import { Revelar } from "@/components/animacao/revelar";
import { TituloRevelado } from "@/components/animacao/titulo-revelado";
import { FormularioContato } from "@/components/formulario-contato";
import { KanbanPreview } from "@/components/kanban-preview";
import Link from "next/link";
import { CartaoHolofote } from "@/components/ui/cartao-holofote";
import { Icone } from "@/components/ui/icone";
import { estoqueModulos } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Kanban Estoque",
  description: "Sistema Kanban digital para gestão de estoque industrial em Manaus: elimine rupturas, acompanhe indicadores e audite cada movimentação.",
};

const jornada = [
  { n: "1", titulo: "Piloto controlado", texto: "Rodamos em paralelo a um processo pequeno (uma máquina ou um setor), sem interromper a operação." },
  { n: "2", titulo: "Implantação gradual", texto: "Treinamento dos operadores e integração com os sistemas legados da planta." },
  { n: "3", titulo: "Suporte contínuo", texto: "Manutenção preventiva, monitoramento de disponibilidade e evolução sob demanda." },
];

export default function PaginaEstoque() {
  return (
    <>
      <HeroEstoque />
      <SecaoModulos />
      <SecaoJornada />
      <SecaoContatoEstoque />
    </>
  );
}

function HeroEstoque() {
  return (
    <section aria-labelledby="titulo-estoque" className="relative overflow-clip pb-16 pt-32 md:pt-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_75%_40%,rgba(0,102,255,0.18),transparent)]" />
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="rotulo-secao"><span className="pad" />Produto · fase final de desenvolvimento</p>
          <TituloRevelado como="h1" id="titulo-estoque" imediato className="mt-6 font-display text-[clamp(2.4rem,5.6vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
            Gestão industrial baseada em <span className="text-neon">realidade</span>.
          </TituloRevelado>
          <Revelar efeito="desfoque" atraso={0.3} className="mt-6 max-w-xl text-lg leading-relaxed text-suave">
            <p>Elimine rupturas imprevistas e tenha auditoria pronta para fiscalização. O Kanban Estoque foi feito para plantas industriais que não podem parar.</p>
          </Revelar>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-linha pt-6">
            {[["Auditável", "log imutável"], ["Antifraude", "alçadas duplas"], ["Tempo real", "visibilidade"]].map(([t, s]) => (
              <div key={t} className="flex flex-col-reverse gap-1">
                <dt className="text-xs uppercase tracking-wider text-apagado">{s}</dt>
                <dd className="font-display text-xl font-semibold">{t}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Revelar efeito="desfoque" atraso={0.4} className="mx-auto w-full max-w-lg">
          <KanbanPreview />
        </Revelar>
      </div>
    </section>
  );
}

function SecaoModulos() {
  return (
    <section aria-labelledby="titulo-modulos" className="py-20 md:py-28">
      <div className="container-site">
        <p className="rotulo-secao"><span className="pad" />Módulos</p>
        <TituloRevelado id="titulo-modulos" className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-tight">
          Fundação industrial resiliente, módulo a módulo.
        </TituloRevelado>
        <Revelar emSequencia className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {estoqueModulos.map((m) => (
            <div data-item key={m.id}>
              <CartaoHolofote className="h-full p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-neon/30 bg-neon/10">
                  <Icone nome={m.icone} className="h-6 w-6 text-neon" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{m.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-suave">{m.descricao}</p>
              </CartaoHolofote>
            </div>
          ))}
        </Revelar>
        <div className="mt-8 cartao p-7 font-mono text-sm leading-relaxed text-suave">
          <p><span className="text-neon">Dados:</span> concorrência pessimista (<code>FOR UPDATE</code>) nas movimentações, para evitar condições de corrida.</p>
          <p className="mt-2"><span className="text-neon">Leitura em campo:</span> cache Redis 7 para resposta imediata.</p>
          <p className="mt-2"><span className="text-neon">Segurança:</span> assinaturas JWT e alçadas criptográficas para operações críticas.</p>
        </div>
      </div>
    </section>
  );
}

function SecaoJornada() {
  return (
    <section aria-labelledby="titulo-jornada" className="py-20 md:py-28">
      <div className="container-site">
        <p className="rotulo-secao"><span className="pad" />Jornada de implantação</p>
        <TituloRevelado id="titulo-jornada" className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-tight">
          Sem parar a linha.
        </TituloRevelado>
        <Revelar como="ol" emSequencia className="mt-12 grid gap-5 md:grid-cols-3">
          {jornada.map((j) => (
            <li data-item key={j.n} className="cartao p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-neon font-display text-xl font-semibold text-neon">{j.n}</span>
              <h3 className="mt-6 font-display text-xl font-semibold">{j.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-suave">{j.texto}</p>
            </li>
          ))}
        </Revelar>
        <Link href="/estoque/dossie-tecnico" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neon hover:text-white">
          <FileLock2 className="h-4 w-4" aria-hidden="true" /> Solicitar o dossiê técnico
        </Link>
      </div>
    </section>
  );
}

function SecaoContatoEstoque() {
  return (
    <section id="contato" aria-labelledby="titulo-contato-estoque" className="py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        <div>
          <p className="rotulo-secao"><span className="pad" />Fale com a engenharia</p>
          <TituloRevelado id="titulo-contato-estoque" className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-tight">
            Veja o Kanban rodando na sua realidade.
          </TituloRevelado>
          <p className="mt-6 max-w-md leading-relaxed text-suave">Agende uma demonstração em ambiente real e valide as regras de negócio da sua operação.</p>
        </div>
        <FormularioContato assuntoInicial="Kanban Estoque" />
      </div>
    </section>
  );
}
