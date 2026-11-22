import { ArrowLeft } from "lucide-react";
import { LinkTransicao } from "@/components/layout/link-transicao";

export default function NaoEncontrada() {
  return (
    <section aria-labelledby="titulo-404" className="flex min-h-[80svh] items-center pt-24">
      <div className="container-site">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-neon">Erro 404 · sinal perdido</p>
        <h1 id="titulo-404" className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.98] tracking-tight">
          Esta trilha não leva a nenhuma estação.
        </h1>
        <p className="mt-6 max-w-lg text-suave">A página que você procurou não existe ou mudou de lugar.</p>
        <LinkTransicao href="/" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primaria px-6 py-3.5 text-sm font-semibold text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar para o início
        </LinkTransicao>
      </div>
    </section>
  );
}
