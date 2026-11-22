import type { Metadata } from "next";
import { ArrowLeft, FileLock2 } from "lucide-react";
import { LinkTransicao } from "@/components/layout/link-transicao";
import { IconeWhatsApp } from "@/components/ui/icone";
import { linkWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Dossiê técnico do Kanban Estoque",
  description: "Material técnico detalhado disponível mediante contato qualificado.",
  robots: { index: false, follow: false },
};

/** As especificações aprofundadas são compartilhadas individualmente: alinhamento → NDA → material técnico. */
export default function DossieTecnico() {
  return (
    <section aria-labelledby="titulo-dossie" className="pb-16 pt-36 md:pt-44">
      <div className="container-site max-w-2xl">
        <div className="cartao p-8 text-center md:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-neon/30 bg-neon/10">
            <FileLock2 className="h-8 w-8 text-neon" aria-hidden="true" />
          </span>
          <h1 id="titulo-dossie" className="mt-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">Material técnico detalhado</h1>
          <p className="mt-5 leading-relaxed text-suave">
            As especificações de arquitetura, algoritmos e parâmetros de segurança do Kanban Estoque são compartilhadas individualmente, depois de um breve alinhamento.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-apagado">Alinhamento → Acordo de sigilo (se aplicável) → Envio do material</p>
          <a href={linkWhatsApp("Olá, Brimajor! Tenho interesse no dossiê técnico do Kanban Estoque.")} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-black">
            <IconeWhatsApp className="h-5 w-5" /> Solicitar pelo WhatsApp
          </a>
          <div className="mt-8">
            <LinkTransicao href="/estoque" className="inline-flex items-center gap-2 text-sm text-neon hover:text-white">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar para o Kanban Estoque
            </LinkTransicao>
          </div>
        </div>
      </div>
    </section>
  );
}
