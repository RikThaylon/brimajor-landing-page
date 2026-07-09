"use client";

import { useState, useRef, useCallback } from "react";

interface Card { sku: string; qty: string; status: "ok" | "warning" | "critical" }

const columns: { label: string; color: string; cards: Card[] }[] = [
  {
    label: "Verde — Seguro",
    color: "emerald",
    cards: [
      { sku: "SKU-1042", qty: "480 un", status: "ok" },
      { sku: "SKU-2318", qty: "230 un", status: "ok" },
      { sku: "SKU-3007", qty: "155 un", status: "ok" },
    ],
  },
  {
    label: "Amarelo — Atenção",
    color: "amber",
    cards: [
      { sku: "SKU-0891", qty: "42 un", status: "warning" },
      { sku: "SKU-1567", qty: "18 un", status: "warning" },
      { sku: "SKU-2231", qty: "9 un",  status: "warning" },
    ],
  },
  {
    label: "Vermelho — Crítico",
    color: "red",
    cards: [
      { sku: "SKU-4400", qty: "2 un",  status: "critical" },
      { sku: "SKU-5012", qty: "0 un",  status: "critical" },
      { sku: "SKU-6789", qty: "1 un",  status: "critical" },
    ],
  },
];

const colStyles: Record<string, { border: string; bg: string; badge: string; dot: string }> = {
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/8", badge: "bg-emerald-900/60 text-emerald-300", dot: "bg-emerald-400" },
  amber:   { border: "border-amber-500/30",   bg: "bg-amber-500/8",   badge: "bg-amber-900/60 text-amber-300",   dot: "bg-amber-400" },
  red:     { border: "border-red-500/30",      bg: "bg-red-500/8",     badge: "bg-red-900/60 text-red-300",       dot: "bg-red-400" },
};

export function KanbanPreview() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isTouchOnly = typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches;

  // tilt via state puro: sem scroll envolvido, GSAP não traria benefício aqui
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchOnly || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * 8;  // max ±8deg
    const ry = -((e.clientX - cx) / (rect.width / 2)) * 8;
    setTilt({ x: rx, y: ry });
  }, [isTouchOnly]);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div
      ref={boardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-lg mx-auto"
      style={{ perspective: "900px" }}
    >
      <div
        className="border border-brimajor-techgray bg-brimajor-graphite rounded-xl shadow-2xl p-4 flex gap-3 transition-transform duration-150 ease-out will-change-transform"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {columns.map((col) => {
          const s = colStyles[col.color];
          return (
            <div key={col.label} className={`flex-1 flex flex-col gap-2 ${s.bg} p-2 rounded-lg border ${s.border}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-2 h-2 rounded-full ${s.dot} shrink-0`} />
                <span className="text-[9px] font-bold text-zinc-400 uppercase leading-tight">{col.label}</span>
              </div>
              {col.cards.map((card) => (
                <div key={card.sku} className="bg-brimajor-black/70 border border-brimajor-techgray/50 rounded p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-zinc-200">{card.sku}</span>
                    <span className={`text-[9px] px-1 rounded ${s.badge}`}>{card.status === "ok" ? "OK" : card.status === "warning" ? "⚠" : "!"}</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.dot}`}
                      style={{ width: card.status === "ok" ? "75%" : card.status === "warning" ? "30%" : "8%" }}
                    />
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-1 block">{card.qty}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
