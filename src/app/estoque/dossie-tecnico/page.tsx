import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dossiê Técnico | Brimajor",
  description: "Material técnico detalhado disponível mediante contato qualificado.",
  robots: "noindex, nofollow",
};

/**
 * Esta página contém especificações técnicas de alto nível do Kanban Estoque.
 * O conteúdo detalhado (parâmetros de segurança, algoritmos) é compartilhado
 * individualmente após contato via WhatsApp, dentro do processo:
 * Alinhamento Inicial → Acordo de Sigilo (NDA) → Material Técnico.
 */
export default function DossieTecnico() {
  return (
    <div className="bg-brimajor-black text-zinc-100 min-h-screen pt-24 pb-32">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="border border-brimajor-techgray bg-brimajor-graphite p-10 rounded-xl">
          <div className="text-5xl mb-6">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-4">Material Técnico Detalhado</h1>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            As especificações aprofundadas de arquitetura, algoritmos e parâmetros de segurança do Kanban Estoque
            são compartilhadas individualmente após um breve alinhamento inicial.
          </p>
          <p className="text-zinc-500 text-sm mb-8">
            Processo: Alinhamento → Acordo de Sigilo (se aplicável) → Envio do Material Técnico
          </p>
          <a
            href="https://wa.me/5592985224523?text=Olá,%20tenho%20interesse%20no%20dossiê%20técnico%20do%20Kanban%20Estoque."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe59] text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Solicitar via WhatsApp
          </a>
          <div className="mt-6">
            <Link href="/estoque" className="text-sm text-brimajor-neon hover:underline">← Voltar para o Kanban Estoque</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
