"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { IconeInstagram, IconeWhatsApp } from "@/components/ui/icone";
import { Logotipo } from "@/components/ui/marca";
import { empresa, navegacao } from "@/lib/conteudo";
import { usePrenderFoco } from "@/lib/foco";
import { gsap, movimentoPermitido } from "@/lib/gsap";
import { linkWhatsApp, WHATSAPP_EXIBICAO } from "@/lib/whatsapp";
import { LinkTransicao } from "./link-transicao";

const MENSAGEM = "Olá, Brimajor! Vim pelo site e quero conversar.";
const ativo = (rota: string, href: string) => (href === "/" ? rota === "/" : rota.startsWith(href));

/** Cabeçalho fixo: vidro ao rolar, barra de progresso de leitura e menu em tela cheia no celular. */
export function Navegacao() {
  const rota = usePathname();
  const [aberto, setAberto] = useState(false);
  const barra = useRef<HTMLSpanElement>(null);
  const rolou = useRolagem(barra);
  const fechar = useCallback(() => setAberto(false), []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${rolou ? "border-b border-linha/80 bg-fundo/75 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-20">
        <LinkTransicao href="/" aria-label="Brimajor — página inicial" className="shrink-0 rounded-lg">
          <Logotipo />
        </LinkTransicao>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navegacao.map((item) => (
              <li key={item.href}>
                <LinkTransicao href={item.href} aria-current={ativo(rota, item.href) ? "page" : undefined} className="group relative block rounded-full px-4 py-2 text-sm text-suave transition-colors hover:text-white aria-[current=page]:text-white">
                  {item.rotulo}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-neon transition-transform duration-500 ease-[var(--ease-saida)] group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
                </LinkTransicao>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={linkWhatsApp(MENSAGEM)} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-full border border-whatsapp/40 bg-whatsapp/10 px-4 py-2 text-sm font-medium text-whatsapp transition-colors hover:bg-whatsapp/20 sm:inline-flex">
            <IconeWhatsApp className="h-4 w-4" />
            Falar no WhatsApp
          </a>
          <button type="button" onClick={() => setAberto(true)} aria-expanded={aberto} aria-controls="menu-celular" className="inline-flex h-11 items-center gap-2 rounded-full border border-linha-forte px-4 text-sm text-texto lg:hidden">
            <Menu className="h-4 w-4" aria-hidden="true" />
            Menu
          </button>
        </div>
      </div>
      <span ref={barra} aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-primaria via-neon to-ciano" />
      {aberto && <MenuCelular rota={rota} aoFechar={fechar} />}
    </header>
  );
}

/** Marca se a página rolou e atualiza a barra de progresso de leitura (um quadro por vez). */
function useRolagem(barra: RefObject<HTMLSpanElement | null>) {
  const [rolou, setRolou] = useState(false);
  useEffect(() => {
    let pendente = false;
    const aoRolar = () => {
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(() => {
        pendente = false;
        setRolou(window.scrollY > 24);
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (barra.current) barra.current.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
      });
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [barra]);
  return rolou;
}

function MenuCelular({ rota, aoFechar }: { rota: string; aoFechar: () => void }) {
  const painel = useRef<HTMLDivElement>(null);
  usePrenderFoco(painel, true, aoFechar);
  useEffect(() => {
    const el = painel.current;
    if (!el || !movimentoPermitido()) return;
    gsap.fromTo(el, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.7, ease: "expo.inOut" });
    gsap.fromTo(el.querySelectorAll("[data-item]"), { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out", stagger: 0.05, delay: 0.25 });
  }, []);

  return (
    <div ref={painel} id="menu-celular" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-fundo/98 backdrop-blur-2xl lg:hidden">
      <div className="container-site flex h-16 items-center justify-between">
        <Logotipo />
        <button type="button" onClick={aoFechar} className="inline-flex h-11 items-center gap-2 rounded-full border border-linha-forte px-4 text-sm">
          <X className="h-4 w-4" aria-hidden="true" />
          Fechar
        </button>
      </div>
      <nav aria-label="Principal (celular)" className="container-site flex flex-1 flex-col justify-center">
        <ul className="space-y-2">
          {navegacao.map((item, i) => (
            <li key={item.href} className="overflow-clip">
              <LinkTransicao data-item href={item.href} onClick={aoFechar} aria-current={ativo(rota, item.href) ? "page" : undefined} className="flex items-baseline gap-4 py-2 font-display text-4xl font-semibold tracking-tight text-texto aria-[current=page]:text-neon">
                <span className="font-mono text-xs text-apagado">0{i + 1}</span>
                {item.rotulo}
              </LinkTransicao>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container-site flex flex-wrap gap-3 pb-10">
        <a data-item href={linkWhatsApp(MENSAGEM)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-black">
          <IconeWhatsApp className="h-4 w-4" />
          {WHATSAPP_EXIBICAO}
        </a>
        <a data-item href={empresa.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-linha-forte px-5 py-3 text-sm">
          <IconeInstagram className="h-4 w-4" />
          {empresa.instagram.usuario}
        </a>
      </div>
    </div>
  );
}
