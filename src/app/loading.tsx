"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Exibido automaticamente pelo Next.js enquanto qualquer page.tsx carrega.
 * Também serve como splash de cold-start do Render.
 */
export default function Loading() {
  const [dot, setDot] = useState(0);
  const labels = ["Inicializando servidor", "Carregando módulos", "Preparando interface", "Quase pronto"];

  useEffect(() => {
    const t = setInterval(() => setDot(d => (d + 1) % labels.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      {/* Orbs */}
      <div className="pointer-events-none fixed w-72 h-72 rounded-full top-20 left-10 bg-blue-700/10 blur-3xl animate-float" />
      <div className="pointer-events-none fixed w-48 h-48 rounded-full bottom-20 right-10 bg-blue-500/8 blur-2xl animate-float-slow" />

      {/* Spinner rings */}
      <div className="relative w-20 h-20 mb-8" style={{ perspective: '400px' }}>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-600/20 animate-spin3d" />
        <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-blue-400 border-l-blue-400/20 animate-spin3d" style={{ animationDirection: 'reverse', animationDuration: '1.8s' }} />
        <div className="absolute inset-[26px] rounded-full bg-blue-600 shadow-[0_0_16px_#0066FF,0_0_32px_#0066FF60] animate-glow" />
      </div>

      <p className="text-xl font-bold tracking-tight text-white mb-1">
        Bri<span className="text-blue-500">major</span>
      </p>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-zinc-800 rounded-full overflow-hidden mt-6 mb-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-400 shadow-[0_0_8px_#0066FF80]"
          style={{ animation: 'loadBar 3.5s ease-in-out forwards' }}
        />
      </div>

      <p className="text-[11px] tracking-widest uppercase text-zinc-500">
        {labels[dot]}...
      </p>

      <style>{`
        @keyframes loadBar {
          0%  { width: 0% }
          40% { width: 60% }
          80% { width: 85% }
          100%{ width: 100% }
        }
      `}</style>
    </div>
  );
}
