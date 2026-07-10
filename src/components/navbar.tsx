"use client";

import Link from "next/link";
import { Cpu, LayoutGrid, Beaker, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          // Calculate scroll progress
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
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
            ? "bg-black/90 backdrop-blur-xl border-brimajor-techgray/80 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brimajor-primary via-brimajor-neon to-brimajor-primary shadow-[0_0_8px_rgba(0,153,255,0.5)] transition-transform duration-150 ease-out origin-left"
            style={{ transform: `scaleX(${scrollProgress / 100})` }}
          />
        </div>

        <div className="fluid-container h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Brimajor - Página Inicial"
            className="group flex items-center gap-2.5 text-white hover:text-brimajor-neon transition-colors duration-300"
          >
            <div className="relative">
              <Cpu
                className="w-7 h-7 md:w-8 md:h-8 text-brimajor-primary group-hover:scale-110 transition-transform duration-300"
                style={{ filter: "drop-shadow(0 0 8px rgba(0,102,255,0.7))" }}
              />
              {/* Subtle glow ring behind logo */}
              <div className="absolute inset-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-brimajor-primary/10 blur-md group-hover:bg-brimajor-neon/20 transition-colors duration-300" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight">
              Bri<span className="text-brimajor-neon">major</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className={`text-sm font-medium transition-all duration-200 hover:-translate-y-[2px] relative ${
                isActive("/") ? "text-brimajor-neon" : "text-zinc-400 hover:text-white"
              }`}
            >
              Home
              {isActive("/") && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brimajor-neon rounded-full" />}
            </Link>
            <Link
              href="/iniciacoes"
              className={`text-sm font-medium transition-all duration-200 hover:-translate-y-[2px] relative ${
                isActive("/iniciacoes") ? "text-brimajor-neon" : "text-zinc-400 hover:text-white"
              }`}
            >
              Iniciações & Prototipagem
              {isActive("/iniciacoes") && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brimajor-neon rounded-full" />}
            </Link>
            <Link
              href="/estoque"
              className={`text-xs font-bold tracking-wide text-white px-5 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-[3px] active:scale-95 border ${
                isActive("/estoque")
                  ? "bg-brimajor-primary border-brimajor-primary shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                  : "bg-brimajor-graphite/80 border-brimajor-techgray hover:bg-brimajor-primary hover:border-brimajor-primary hover:shadow-[0_0_16px_rgba(0,102,255,0.3)]"
              }`}
            >
              Kanban Estoque
            </Link>
          </div>
        </div>
      </nav>

      {/* ── BOTTOM NAV BAR (Mobile apenas) ── */}
      <nav
        aria-label="Navegação mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-brimajor-techgray/80 safe-bottom"
        style={{ backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
      >
        <div className="grid grid-cols-3 h-16">
          {[
            { href: "/", icon: Home, label: "Home" },
            { href: "/iniciacoes", icon: Beaker, label: "Iniciações" },
            { href: "/estoque", icon: LayoutGrid, label: "Estoque" },
          ].map(({ href, icon: Icon, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-wide transition-colors duration-200 ${
                  active ? "text-brimajor-neon" : "text-zinc-500 active:text-white"
                }`}
              >
                <div className="relative">
                  <Icon
                    className="w-5 h-5"
                    style={active ? { filter: "drop-shadow(0 0 6px rgba(0,153,255,0.7))" } : {}}
                  />
                  {active && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brimajor-neon shadow-[0_0_6px_rgba(0,153,255,0.8)]" />
                  )}
                </div>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}