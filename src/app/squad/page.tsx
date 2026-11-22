import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Contador, Letreiro } from "@/components/animacao/efeitos";
import { Revelar } from "@/components/animacao/revelar";
import { TituloRevelado } from "@/components/animacao/titulo-revelado";
import { LinkTransicao } from "@/components/layout/link-transicao";
import { LinhaGates } from "@/components/squad/linha-gates";
import { CartaoHolofote } from "@/components/ui/cartao-holofote";
import { IconeWhatsApp } from "@/components/ui/icone";
import { squad } from "@/lib/conteudo";
import { linkWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Brimajor Squad SDD",
  description: "Framework agêntico de desenvolvimento orientado a especificação: uma squad de produto inteira no seu agente de código, com qualidade verificada antes de avançar.",
};

const terminal = [
  { tipo: "cmd", texto: "/squad criar tela de login com recuperação de senha" },
  { tipo: "ok", texto: "Recorte OBJ-001 aberto · modo deliver_slice" },
  { tipo: "info", texto: "sinais: has_ui, has_auth · guardiões: Segurança, UX, Clean code, Testes" },
  { tipo: "info", texto: "decisões suas: Gate 2 (especificação) e Gate 5A (liberação)" },
  { tipo: "ok", texto: "Gate 2 pronto — especificação, BDD, plano de testes, UX e ameaças" },
  { tipo: "pede", texto: "Para aprovar, digite:  aprovo 3FA9C1" },
];

export default function PaginaSquad() {
  return (
    <>
      <HeroSquad />
      <FaixaIdes />
      <SecaoComoFunciona />
      <SecaoCiclo />
      <SecaoPrincipios />
    </>
  );
}

function HeroSquad() {
  return (
    <section aria-labelledby="titulo-squad" className="relative overflow-clip pb-20 pt-32 md:pt-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_80%_30%,rgba(127,227,255,0.12),transparent),radial-gradient(40%_50%_at_10%_60%,rgba(0,102,255,0.18),transparent)]" />
      <div className="container-site grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="rotulo-secao"><span className="pad" />Produto Brimajor · v{squad.versao} (release candidate)</p>
          <TituloRevelado como="h1" id="titulo-squad" imediato className="mt-6 font-display text-[clamp(2.6rem,6.6vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            Brimajor <span className="text-neon">Squad SDD</span>
          </TituloRevelado>
          <Revelar efeito="desfoque" atraso={0.3}>
            <p className="mt-6 font-display text-2xl leading-snug text-texto md:text-3xl">{squad.lema}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-suave">{squad.descricao}</p>
          </Revelar>
          <Revelar emSequencia atraso={0.5} className="mt-9 flex flex-wrap gap-3">
            <a data-item href={linkWhatsApp("Olá, Brimajor! Quero conhecer a Brimajor Squad SDD para a minha empresa.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primaria px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(0,102,255,0.9)]">
              <IconeWhatsApp className="h-4 w-4" /> Quero usar na minha empresa
            </a>
            <LinkTransicao data-item href="/cursos#squad-sdd" className="inline-flex items-center gap-2 rounded-full border border-linha-forte px-6 py-3.5 text-sm font-semibold hover:border-neon">
              Ver o curso da Squad <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkTransicao>
          </Revelar>
        </div>
        <Revelar efeito="mascara" atraso={0.2}>
          <div className="cartao overflow-clip font-mono text-[0.8rem] leading-relaxed shadow-[0_40px_120px_-40px_rgba(0,102,255,0.6)]">
            <div className="flex items-center gap-2 border-b border-linha px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-apagado">claude-code — projeto</span>
            </div>
            <ol className="space-y-2.5 p-5" aria-label="Exemplo de sessão com a Squad">
              {terminal.map((l, i) => (
                <li key={i} className={l.tipo === "cmd" ? "text-white" : l.tipo === "ok" ? "text-[#5ee39a]" : l.tipo === "pede" ? "rounded-lg border border-neon/40 bg-neon/10 px-3 py-2 text-neon" : "text-suave"}>
                  {l.tipo === "cmd" ? <span className="text-neon">❯ </span> : l.tipo === "ok" ? "✓ " : l.tipo === "info" ? "· " : ""}
                  {l.texto}
                </li>
              ))}
            </ol>
          </div>
        </Revelar>
      </div>
    </section>
  );
}

function FaixaIdes() {
  return (
    <div className="border-y border-linha bg-superficie/50 py-5">
      <Letreiro className="font-mono text-lg uppercase tracking-[0.2em] text-suave" itens={squad.ides} />
    </div>
  );
}

function SecaoComoFunciona() {
  return (
    <section aria-labelledby="titulo-como" className="py-24 md:py-32">
      <div className="container-site">
        <p className="rotulo-secao"><span className="pad" />Como funciona</p>
        <TituloRevelado id="titulo-como" className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">
          Você descreve em uma frase. A squad faz o resto — e para nas decisões que são suas.
        </TituloRevelado>
        <Revelar como="ol" emSequencia className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {squad.passos.map((p, i) => (
            <li data-item key={p.titulo}>
              <CartaoHolofote className="h-full p-7">
                <span className="font-mono text-xs text-neon">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold">{p.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-suave">{p.texto}</p>
              </CartaoHolofote>
            </li>
          ))}
        </Revelar>
        <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-linha pt-10 md:grid-cols-4">
          {squad.numeros.map((n) => (
            <div key={n.rotulo} className="flex flex-col-reverse gap-2">
              <dt className="text-sm text-apagado">{n.rotulo}</dt>
              <dd className="font-display text-5xl font-semibold md:text-7xl"><Contador valor={n.valor} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function SecaoCiclo() {
  return (
    <section aria-labelledby="titulo-ciclo" className="py-24 md:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="rotulo-secao"><span className="pad" />O ciclo</p>
          <TituloRevelado id="titulo-ciclo" className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">
            Oito gates. Nenhum avança sem evidência.
          </TituloRevelado>
          <p className="mt-6 max-w-md leading-relaxed text-suave">
            Três perfis de governança definem quantas decisões são suas: <strong className="text-texto">essential</strong> (duas), <strong className="text-texto">standard</strong> (quatro) e <strong className="text-texto">strict</strong> (todas, para ambiente regulado).
          </p>
        </div>
        <LinhaGates />
      </div>
    </section>
  );
}

function SecaoPrincipios() {
  return (
    <section aria-labelledby="titulo-principios" className="py-24 md:py-32">
      <div className="container-site">
        <p className="rotulo-secao"><span className="pad" />Por que confiar no resultado</p>
        <TituloRevelado id="titulo-principios" className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-tight">
          Qualidade conferida por ferramenta, não prometida em texto.
        </TituloRevelado>
        <Revelar emSequencia className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {squad.principios.map((p) => (
            <div data-item key={p.titulo} className="cartao p-7">
              <h3 className="font-display text-xl font-semibold">{p.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-suave">{p.texto}</p>
            </div>
          ))}
        </Revelar>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-apagado">
          Esta versão é uma <em>release candidate</em>: tudo foi testado de forma automatizada; a observação em sessão real de cada IDE é a condição que falta para a 1.0. Este próprio site foi especificado e verificado com a Squad.
        </p>
      </div>
    </section>
  );
}
