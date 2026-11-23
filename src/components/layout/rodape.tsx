import Image from "next/image";
import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import { IconeInstagram, IconeWhatsApp } from "@/components/ui/icone";
import { empresa, navegacao } from "@/lib/conteudo";
import { linkWhatsApp, WHATSAPP_EXIBICAO } from "@/lib/whatsapp";
import Link from "next/link";

export function Rodape() {
  return (
    <footer className="relative mt-24 overflow-clip border-t border-linha">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="space-y-5">
          <Image src="/marca/brimajor-logo.png" alt="Brimajor — Sistemas Embarcados & IA" width={260} height={111} className="h-auto w-56" />
          <p className="max-w-sm text-sm leading-relaxed text-suave">{empresa.descricao}</p>
          <p className="inline-flex items-center gap-2 text-sm text-apagado">
            <MapPin className="h-4 w-4 text-neon" aria-hidden="true" />
            {empresa.cidade}, Brasil
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="rotulo-secao mb-5"><span className="pad" />Navegação</h2>
          <ul className="space-y-3 text-sm">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-suave transition-colors hover:text-white">{item.rotulo}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="rotulo-secao mb-5"><span className="pad" />Contato</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={empresa.academy.url} className="inline-flex items-center gap-2 text-neon hover:text-white">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                {empresa.academy.rotulo}
              </a>
            </li>
            <li>
              <a href={linkWhatsApp("Olá, Brimajor! Vim pelo site.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-whatsapp hover:underline">
                <IconeWhatsApp className="h-4 w-4" />
                WhatsApp {WHATSAPP_EXIBICAO}
              </a>
            </li>
            <li>
              <a href={empresa.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-suave hover:text-white">
                <IconeInstagram className="h-4 w-4" />
                Instagram {empresa.instagram.usuario}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-linha py-6 text-xs text-apagado sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {empresa.razao} · CNPJ {empresa.cnpj}</p>
      </div>

      <p aria-hidden="true" className="pointer-events-none select-none px-2 pb-2 text-center font-sans text-[22vw] font-extrabold italic leading-[0.75] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(51,170,255,0.18)]">
        Brimajor
      </p>
    </footer>
  );
}
