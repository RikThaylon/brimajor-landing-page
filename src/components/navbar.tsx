"use client";

import Link from "next/link";
import { Cpu, LayoutGrid, Beaker, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* ── NAVBAR TOP (Desktop + Mobile topo) ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-[#2E2E2E] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="fluid-container h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Brimajor - Página Inicial"
            className="group flex items-center gap-2 text-white hover:text-[#0099FF] transition-colors duration-300"
          >
            <Cpu
              className="w-6 h-6 md:w-7 md:h-7 text-[#0066FF] group-hover:scale-110 transition-transform duration-300"
              style={{ filter: "drop-shadow(0 0 8px rgba(0,102,255,0.7))" }}
            />
            <span className="font-bold text-lg md:text-xl tracking-tight">Brimajor</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className={`text-sm font-medium transition-all duration-200 hover:-translate-y-[2px] ${
                isActive("/") ? "text-[#0099FF]" : "text-zinc-400 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/iniciacoes"
              className={`text-sm font-medium transition-all duration-200 hover:-translate-y-[2px] ${
                isActive("/iniciacoes") ? "text-[#0099FF]" : "text-zinc-400 hover:text-white"
              }`}
            >
              Iniciações & Prototipagem
            </Link>
            <Link
              href="/estoque"
              className={`text-xs font-bold tracking-wide text-white px-5 py-2.5 rounded-md transition-all duration-300 hover:-translate-y-[3px] active:scale-95 border ${
                isActive("/estoque")
                  ? "bg-[#0066FF] border-[#0066FF] shadow-[0_0_16px_rgba(0,102,255,0.4)]"
                  : "bg-[#2E2E2E]/50 border-[#2E2E2E] hover:bg-[#0066FF] hover:border-[#0066FF]"
              }`}
            >
              Kanban Estoque
            </Link>
          </div>
        </div>
      </nav>

      {/* ── BOTTOM NAV BAR (Mobile apenas) ── */}
      {/* Barra de navegação inferior fixa — padrão mobile nativo (como apps iOS/Android) */}
      <nav
        aria-label="Navegação mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#2E2E2E]"
        style={{ backgroundColor: "rgba(0,0,0,0.97)", backdropFilter: "blur(20px)" }}
      >
        <div className="grid grid-cols-3 h-16">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 ${
              isActive("/") ? "text-[#0099FF]" : "text-zinc-500 active:text-white"
            }`}
          >
            <Home
              className="w-5 h-5"
              style={isActive("/") ? { filter: "drop-shadow(0 0 6px rgba(0,153,255,0.7))" } : {}}
            />
            Home
          </Link>

          {/* Iniciações */}
          <Link
            href="/iniciacoes"
            className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 ${
              isActive("/iniciacoes") ? "text-[#0099FF]" : "text-zinc-500 active:text-white"
            }`}
          >
            <Beaker
              className="w-5 h-5"
              style={isActive("/iniciacoes") ? { filter: "drop-shadow(0 0 6px rgba(0,153,255,0.7))" } : {}}
            />
            Iniciações
          </Link>

          {/* Estoque */}
          <Link
            href="/estoque"
            className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 ${
              isActive("/estoque") ? "text-[#0066FF]" : "text-zinc-500 active:text-white"
            }`}
          >
            <LayoutGrid
              className="w-5 h-5"
              style={isActive("/estoque") ? { filter: "drop-shadow(0 0 6px rgba(0,102,255,0.7))" } : {}}
            />
            Estoque
          </Link>
        </div>
      </nav>

      {/* Espaçador para o bottom nav não cobrir o conteúdo no mobile */}
      <div className="md:hidden h-16 fixed bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true" />
    </>
  );
}