"use client";

import { useRef, type ReactNode } from "react";

/** Cartão com um holofote azul que segue o ponteiro (só efeito visual; não muda o conteúdo). */
export function CartaoHolofote({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r || !ref.current) return;
        ref.current.style.setProperty("--hx", `${e.clientX - r.left}px`);
        ref.current.style.setProperty("--hy", `${e.clientY - r.top}px`);
      }}
      className={`group cartao overflow-clip ${className ?? ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--hx, 50%) var(--hy, 50%), rgba(51,170,255,0.14), transparent 60%)" }}
      />
      {children}
    </div>
  );
}
