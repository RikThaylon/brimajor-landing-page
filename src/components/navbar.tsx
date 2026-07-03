"use client";

import Link from "next/link";
import { Cpu, Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection
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

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const isActive = useCallback((href: string) => pathname === href, [pathname]);
  const close = () => setIsMobileMenuOpen(false);
  const toggle = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <>
      {/* NAV BAR - z-index 9998 so the overlay (9999) renders above it */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 9998,
          transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
          borderBottom: scrolled && !isMobileMenuOpen ? "1px solid #2E2E2E" : "1px solid transparent",
          backgroundColor: scrolled && !isMobileMenuOpen ? "rgba(0,0,0,0.88)" : "transparent",
          backdropFilter: scrolled && !isMobileMenuOpen ? "blur(16px)" : "none",
          boxShadow: scrolled && !isMobileMenuOpen ? "0 4px 24px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div className="fluid-container h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={close}
            aria-label="Brimajor - Pagina Inicial"
            className="group flex items-center gap-2 text-white hover:text-[#0099FF] transition-colors duration-300"
          >
            <Cpu className="w-7 h-7 text-[#0066FF] group-hover:scale-110 transition-transform duration-300"
              style={{ filter: "drop-shadow(0 0 8px rgba(0,102,255,0.7))" }}
            />
            <span className="font-bold text-xl tracking-tight">Brimajor</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/"
              className={"text-sm font-medium transition-all duration-200 hover:-translate-y-[2px] " + (isActive("/") ? "text-[#0099FF]" : "text-zinc-400 hover:text-white")}
            >Home</Link>
            <Link href="/iniciacoes"
              className={"text-sm font-medium transition-all duration-200 hover:-translate-y-[2px] " + (isActive("/iniciacoes") ? "text-[#0099FF]" : "text-zinc-400 hover:text-white")}
            >Iniciacoes & Prototipagem</Link>
            <Link href="/estoque"
              className="text-xs font-bold tracking-wide text-white px-5 py-2.5 rounded-md transition-all duration-300 hover:-translate-y-[3px] active:scale-95"
              style={{ backgroundColor: "rgba(46,46,46,0.5)", border: "1px solid #2E2E2E" }}
            >Kanban Estoque</Link>
          </div>

          {/* HAMBURGER BUTTON - 52x52px guaranteed touch area */}
          <button
            type="button"
            onClick={toggle}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden active:scale-90"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              flexShrink: 0,
              touchAction: "manipulation",
              cursor: "pointer",
              backgroundColor: "rgba(46,46,46,0.55)",
              border: "1px solid rgba(100,100,100,0.45)",
              borderRadius: "0.75rem",
              color: "white",
              position: "relative",
              zIndex: 9999,
            }}
          >
            {isMobileMenuOpen
              ? <X className="w-7 h-7 pointer-events-none" />
              : <Menu className="w-7 h-7 pointer-events-none" />
            }
          </button>

        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - z-index 9999, above everything */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.97)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
            padding: "0 1.5rem",
          }}
        >
          {/* X button inside overlay */}
          <button
            type="button"
            onClick={close}
            aria-label="Fechar menu"
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(46,46,46,0.65)",
              border: "1px solid rgba(100,100,100,0.4)",
              borderRadius: "0.75rem",
              color: "white",
              cursor: "pointer",
              touchAction: "manipulation",
            }}
          >
            <X className="w-7 h-7 pointer-events-none" />
          </button>

          <Link href="/" onClick={close}
            style={{ fontSize:"2rem", fontWeight:700, letterSpacing:"-0.02em", color: isActive("/") ? "#0099FF" : "#f4f4f5", textDecoration:"none", padding:"0.5rem 1.5rem", touchAction:"manipulation" }}
          >Home</Link>

          <Link href="/iniciacoes" onClick={close}
            style={{ fontSize:"2rem", fontWeight:700, letterSpacing:"-0.02em", color: isActive("/iniciacoes") ? "#0099FF" : "#f4f4f5", textDecoration:"none", padding:"0.5rem 1.5rem", touchAction:"manipulation" }}
          >Iniciacoes</Link>

          <Link href="/estoque" onClick={close}
            style={{ marginTop:"1.5rem", fontSize:"1.2rem", fontWeight:800, letterSpacing:"0.04em", backgroundColor:"#0066FF", color:"#FFFFFF", padding:"1.1rem 3rem", borderRadius:"0.75rem", textDecoration:"none", boxShadow:"0 0 32px rgba(0,102,255,0.5)", touchAction:"manipulation" }}
          >Kanban Estoque</Link>

        </div>
      )}
    </>
  );
}