import { Icone } from "./icone";

/** Ilustração de um chip com pinos e trilhas por onde corre um pulso de luz (SVG + CSS). */
export function ChipIlustracao({ icone, codigo }: { icone: string; codigo: string }) {
  const pinos = Array.from({ length: 6 }, (_, i) => 70 + i * 16);
  return (
    <div className="relative aspect-square w-full max-w-[22rem]" aria-hidden="true">
      <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`g-${codigo}`} x1="0" x2="1">
            <stop offset="0" stopColor="#0066ff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#7fe3ff" />
            <stop offset="1" stopColor="#0066ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="#24375c" strokeWidth="1.5" fill="none">
          <path d="M0 50h40l20 20" /><path d="M0 190h40l20-20" /><path d="M240 50h-40l-20 20" /><path d="M240 190h-40l-20-20" />
          <path d="M120 0v40" /><path d="M120 200v40" /><path d="M0 120h50" /><path d="M190 120h50" />
        </g>
        <g stroke={`url(#g-${codigo})`} strokeWidth="2.5" fill="none" strokeLinecap="round" className="[stroke-dasharray:28_220] motion-safe:animate-[pulso-trilha_2.8s_linear_infinite]">
          <path d="M0 50h40l20 20" /><path d="M240 190h-40l-20-20" /><path d="M120 0v40" /><path d="M190 120h50" />
        </g>
        {pinos.map((p) => (
          <g key={p} fill="#c9d3df">
            <rect x={p - 3} y="48" width="6" height="14" rx="1" />
            <rect x={p - 3} y="178" width="6" height="14" rx="1" />
            <rect x="48" y={p - 3} width="14" height="6" rx="1" />
            <rect x="178" y={p - 3} width="14" height="6" rx="1" />
          </g>
        ))}
        <rect x="60" y="60" width="120" height="120" rx="12" fill="#070d1a" stroke="#33aaff" strokeOpacity="0.5" />
        <circle cx="74" cy="74" r="4" fill="#24375c" />
        <text x="166" y="172" textAnchor="end" fontFamily="var(--font-mono)" fontSize="11" fill="#7889a3">{codigo}</text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icone nome={icone} className="h-14 w-14 text-neon drop-shadow-[0_0_18px_rgba(51,170,255,0.8)]" />
      </div>
    </div>
  );
}
