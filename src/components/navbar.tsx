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
        className={ixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b }
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
              className={	ext-sm font-medium transition-all duration-200 hover:-translate-y-[2px] }
            >
              Home
            </Link>
            <Link
              href="/iniciacoes"
              className={	ext-sm font-medium transition-all duration-200 hover:-translate-y-[2px] }
            >
              Iniciações & Prototipagem
            </Link>
            <Link
              href="/estoque"
              className={	ext-xs font-bold tracking-wide text-white px-5 py-2.5 rounded-md transition-all duration-300 hover:-translate-y-[3px] active:scale-95 border }
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
            className={lex flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 }
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
            className={lex flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 }
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
            className={lex flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 }
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