"use client";

import { useEffect, useState } from "react";

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
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brimajor-black">
      {/* Background Orbs */}
      <div className="pointer-events-none fixed w-72 h-72 rounded-full top-20 left-10 bg-brimajor-primary/5 blur-3xl animate-float" />
      <div className="pointer-events-none fixed w-48 h-48 rounded-full bottom-20 right-10 bg-brimajor-neon/5 blur-2xl animate-float-slow" />

      {/* Spinner rings */}
      <div className="relative w-20 h-20 mb-8" style={{ perspective: '400px' }}>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brimajor-primary border-r-brimajor-primary/20 animate-spin3d" />
        <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-brimajor-neon border-l-brimajor-neon/20 animate-spin3d" style={{ animationDirection: 'reverse', animationDuration: '1.8s' }} />
        <div className="absolute inset-[26px] rounded-full bg-brimajor-primary shadow-[0_0_16px_#0066FF,0_0_32px_rgba(0,102,255,0.4)] animate-glow" />
      </div>

      <p className="text-xl font-bold tracking-tight text-white mb-1">
        Bri<span className="text-brimajor-neon">major</span>
      </p>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-zinc-900 rounded-full overflow-hidden mt-6 mb-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brimajor-primary to-brimajor-neon shadow-[0_0_8px_rgba(0,102,255,0.5)]"
          style={{ animation: 'loadBar 3.5s ease-in-out forwards' }}
        />
      </div>

      <p className="text-[10px] tracking-widest uppercase text-zinc-500 font-mono">
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
