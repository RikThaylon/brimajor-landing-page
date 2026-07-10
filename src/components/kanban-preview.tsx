"use client";

import { useState, useRef, useCallback } from "react";

interface Card { sku: string; qty: string; status: "ok" | "warning" | "critical" }

interface KanbanPreviewProps {
  activeModuleId?: string;
}

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
  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/5", badge: "bg-emerald-950/60 text-emerald-300", dot: "bg-emerald-400" },
  amber:   { border: "border-amber-500/20",   bg: "bg-amber-500/5",   badge: "bg-amber-950/60 text-amber-300",   dot: "bg-amber-400" },
  red:     { border: "border-red-500/20",      bg: "bg-red-500/5",     badge: "bg-red-950/60 text-red-300",       dot: "bg-red-400" },
};

export function KanbanPreview({ activeModuleId }: KanbanPreviewProps) {
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

  const isKanbanActive = activeModuleId === "kanban";
  const isAntifraudeActive = activeModuleId === "antifraude";
  const isQaActive = activeModuleId === "qa";
  const isGovernancaActive = activeModuleId === "governanca";

  return (
    <div
      ref={boardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-lg mx-auto transition-all duration-500"
      style={{ perspective: "900px" }}
    >
      <div
        className={`border rounded-xl shadow-2xl p-2.5 sm:p-4 flex gap-1.5 sm:gap-3 transition-all duration-500 ease-out will-change-transform ${
          isKanbanActive
            ? "border-brimajor-neon ring-2 ring-brimajor-neon/30 shadow-[0_0_30px_rgba(0,242,254,0.3)] bg-brimajor-graphite/95"
            : "border-brimajor-techgray bg-brimajor-graphite/90"
        }`}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {columns.map((col) => {
          const s = colStyles[col.color];
          
          // Determine special highlights based on active module
          let highlightClass = "";
          if (isAntifraudeActive && col.color === "red") {
            highlightClass = "ring-2 ring-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] scale-[1.02] border-red-500/50 bg-red-500/10";
          } else if (isQaActive && col.color === "amber") {
            highlightClass = "ring-2 ring-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02] border-amber-500/50 bg-amber-500/10";
          }

          return (
            <div
              key={col.label}
              className={`flex-1 flex flex-col gap-1.5 sm:gap-2 ${s.bg} p-1.5 sm:p-2 rounded-lg border transition-all duration-500 ${
                highlightClass || s.border
              }`}
            >
              <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${s.dot} shrink-0`} />
                  <span className="text-[7.5px] sm:text-[9px] font-bold text-zinc-400 uppercase leading-none">{col.label.split(" — ")[0]}</span>
                </div>
                {isAntifraudeActive && col.color === "red" && (
                  <span className="text-[7px] sm:text-[8px] text-red-400 font-bold animate-pulse leading-none shrink-0">🔒 Alçada</span>
                )}
                {isQaActive && col.color === "amber" && (
                  <span className="text-[7px] sm:text-[8px] text-amber-400 font-bold animate-pulse leading-none shrink-0">⏳ QA</span>
                )}
              </div>
              
              {col.cards.map((card) => (
                <div
                  key={card.sku}
                  className={`border rounded p-1.5 sm:p-2 transition-all duration-500 ${
                    isGovernancaActive
                      ? "bg-zinc-950/95 border-brimajor-neon/30 shadow-[0_0_10px_rgba(0,242,254,0.15)]"
                      : "bg-brimajor-black/85 border-brimajor-techgray/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[8px] sm:text-[10px] font-mono font-bold text-zinc-200 flex items-center gap-0.5 sm:gap-1 leading-none">
                      {isGovernancaActive && <span className="text-[8px] sm:text-[9px] text-brimajor-neon">🔒</span>}
                      {card.sku}
                    </span>
                    <span className={`text-[7px] sm:text-[9px] px-1 rounded font-bold leading-none ${s.badge}`}>
                      {card.status === "ok" ? "OK" : card.status === "warning" ? "⚠" : "!"}
                    </span>
                  </div>
                  <div className="h-1 sm:h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${s.dot} ${
                        isKanbanActive ? "animate-pulse" : ""
                      }`}
                      style={{ width: card.status === "ok" ? "75%" : card.status === "warning" ? "30%" : "8%" }}
                    />
                  </div>
                  <span className="text-[7.5px] sm:text-[9px] text-zinc-500 mt-1 block leading-none">{card.qty}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
