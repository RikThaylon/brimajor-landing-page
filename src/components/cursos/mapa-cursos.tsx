"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IconeWhatsApp } from "@/components/ui/icone";
import { filtrarCursos } from "@/lib/cursos/filtro";
import { layoutMapa, type MapaLayout } from "@/lib/cursos/mapa-layout";
import { NIVEIS, ROTULO_NIVEL, ROTULO_STATUS, type Catalogo, type Curso, type Nivel, type Trilha } from "@/lib/cursos/tipos";
import { COM_MOVIMENTO, gsap, useGSAP } from "@/lib/gsap";
import { linkWhatsApp, mensagemCurso, rotuloAcaoCurso } from "@/lib/whatsapp";
import { PainelCurso } from "./painel-curso";

/** Mapa de Cursos (RF-05..RF-08): metrô no desktop, ramal vertical no celular, painel de detalhe e lista filtrável. */
export function MapaCursos({ catalogo }: { catalogo: Catalogo }) {
  const { trilhas, cursos } = catalogo;
  const horizontal = useMemo(() => layoutMapa(trilhas, cursos, "horizontal"), [trilhas, cursos]);
  const vertical = useMemo(() => layoutMapa(trilhas, cursos, "vertical"), [trilhas, cursos]);
  const porTrilha = useMemo(() => new Map(trilhas.map((t) => [t.id, t])), [trilhas]);
  const [selecionado, setSelecionado] = useState<Curso | null>(null);
  const raiz = useRef<HTMLDivElement>(null);

  const abrir = useCallback((curso: Curso) => {
    setSelecionado(curso);
    history.replaceState(null, "", `#${curso.id}`);
  }, []);
  const fecharPainel = useCallback(() => {
    setSelecionado(null);
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  // link direto: /cursos#engenharia-contexto abre o painel
  useEffect(() => {
    const abrirPeloHash = () => {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        setSelecionado(null);
        return;
      }
      setSelecionado(cursos.find((c) => c.id === id) ?? null);
    };
    const quadro = requestAnimationFrame(abrirPeloHash);
    window.addEventListener("hashchange", abrirPeloHash);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("hashchange", abrirPeloHash);
    };
  }, [cursos]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        for (const mapa of gsap.utils.toArray<HTMLElement>("[data-mapa]")) {
          const linhas = mapa.querySelectorAll<SVGPathElement>("[data-linha]");
          linhas.forEach((l) => {
            const comprimento = l.getTotalLength();
            gsap.set(l, { strokeDasharray: comprimento, strokeDashoffset: comprimento });
          });
          const tl = gsap.timeline({ scrollTrigger: { trigger: mapa, start: "top 75%", once: true } });
          tl.to(linhas, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", stagger: 0.18 })
            .from(mapa.querySelectorAll("[data-estacao]"), { scale: 0, autoAlpha: 0, duration: 0.5, ease: "back.out(2.4)", stagger: 0.04 }, 0.5)
            .from(mapa.querySelectorAll("[data-rotulo-mapa]"), { autoAlpha: 0, y: 10, duration: 0.6, stagger: 0.03 }, 0.8);
        }
      });
      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <div ref={raiz}>
      {/* Desktop: metrô horizontal. Em telas menores, o mapa vertical evita rótulos comprimidos. */}
      <div
        className="hidden overflow-x-auto pb-4 lg:block"
        role="region"
        aria-label="Mapa horizontal das trilhas de cursos. Use as setas para rolar quando necessário."
        tabIndex={0}
      >
        <MapaHorizontal layout={horizontal} abrir={abrir} />
      </div>
      {/* Celular e tablet: ramais verticais legíveis. */}
      <div className="lg:hidden">
        <MapaVertical layout={vertical} abrir={abrir} />
      </div>

      <ListaCursos catalogo={catalogo} porTrilha={porTrilha} abrir={abrir} />

      {selecionado && <PainelCurso curso={selecionado} trilha={porTrilha.get(selecionado.trilhaId)} aoFechar={fecharPainel} />}
    </div>
  );
}

function Estacao({ curso, cor, abrir, className, style, rotulo }: { curso: Curso; cor: string; abrir: (c: Curso) => void; className?: string; style?: React.CSSProperties; rotulo: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => abrir(curso)}
      aria-label={`${curso.titulo} — ${ROTULO_NIVEL[curso.nivel]}, ${ROTULO_STATUS[curso.status]}. Ver detalhes`}
      className={`group absolute rounded-xl text-left ${className ?? ""}`}
      style={style}
    >
      <span
        data-estacao
        className="absolute h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-fundo transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125"
        style={{ borderColor: cor, boxShadow: `0 0 16px ${cor}` }}
      >
        <span className="absolute inset-[4px] rounded-full bg-white/90 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      {rotulo}
    </button>
  );
}

function MapaHorizontal({ layout, abrir }: { layout: MapaLayout; abrir: (c: Curso) => void }) {
  const pct = (v: number, total: number) => `${(v / total) * 100}%`;
  return (
    <div
      data-mapa
      className="relative mx-auto w-full"
      style={{ minWidth: Math.max(1100, Math.ceil(layout.largura * 0.92)), aspectRatio: `${layout.largura} / ${layout.altura}` }}
    >
      <svg viewBox={`0 0 ${layout.largura} ${layout.altura}`} className="absolute inset-0 h-full w-full" role="img" aria-labelledby="mapa-titulo mapa-desc">
        <title id="mapa-titulo">Mapa de cursos em linhas de metrô</title>
        <desc id="mapa-desc">Cada linha colorida é uma trilha; as estações são os cursos, do nível iniciante, à esquerda, ao avançado, à direita. A lista abaixo traz os mesmos cursos em texto.</desc>
        <defs>
          <filter id="brilho-linha" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        {layout.niveis.map((n) => (
          <g key={n.nivel}>
            <rect x={n.inicio - 8} y={56} width={n.fim - n.inicio + 16} height={layout.altura - 70} rx={18} fill="#0b1426" fillOpacity={0.45} stroke="#17253f" />
            <text x={n.x} y={36} textAnchor="middle" fill="#9fb0c8" fontSize={14} fontFamily="var(--font-mono)" letterSpacing="3">
              {ROTULO_NIVEL[n.nivel].toUpperCase()}
            </text>
          </g>
        ))}
        {layout.linhas.map((l) => (
          <g key={l.trilha.id}>
            <path d={l.d} fill="none" stroke={l.cor} strokeOpacity={0.35} strokeWidth={10} filter="url(#brilho-linha)" />
            <path data-linha d={l.d} fill="none" stroke={l.cor} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={l.fim.x} cy={l.fim.y} r={7} fill={l.cor} />
          </g>
        ))}
        <circle cx={layout.hub.x} cy={layout.hub.y} r={20} fill="#02050c" stroke="#e6edf7" strokeWidth={4} />
        <circle cx={layout.hub.x} cy={layout.hub.y} r={7} fill="#e6edf7" />
      </svg>
      <p data-rotulo-mapa className="absolute -translate-y-1/2 whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.15em] text-texto" style={{ left: pct(Math.max(12, layout.hub.x - 104), layout.largura), top: pct(layout.hub.y, layout.altura) }}>
        Comece aqui
      </p>
      {layout.rotulosTrilha.map((r) => (
        <p key={r.trilha.id} data-rotulo-mapa className="absolute -translate-y-1/2 whitespace-nowrap text-sm font-semibold" style={{ left: pct(r.x, layout.largura), top: pct(r.y, layout.altura), color: r.trilha.cor }}>
          {r.trilha.nome}
        </p>
      ))}
      {layout.estacoes.map((e) => (
        <Estacao
          key={e.curso.id}
          curso={e.curso}
          cor={e.cor}
          abrir={abrir}
          className="h-0 w-0 focus-visible:outline-offset-[14px]"
          style={{ left: pct(e.x, layout.largura), top: pct(e.y, layout.altura) }}
          rotulo={
            <span data-rotulo-mapa className="absolute left-0 top-5 w-[6.75rem] -translate-x-1/2 text-center text-[0.72rem] font-medium leading-[1.3] text-texto transition-colors group-hover:text-white">
              {e.curso.titulo}
            </span>
          }
        />
      ))}
    </div>
  );
}

function MapaVertical({ layout, abrir }: { layout: MapaLayout; abrir: (c: Curso) => void }) {
  return (
    <div data-mapa className="relative" style={{ height: layout.altura }}>
      <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {layout.tronco && <path data-linha d={layout.tronco} fill="none" stroke="#e6edf7" strokeOpacity={0.5} strokeWidth={4} strokeLinecap="round" />}
        {layout.linhas.map((l) => (
          <g key={l.trilha.id}>
            <path data-linha d={l.d} fill="none" stroke={l.cor} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={l.fim.x} cy={l.fim.y} r={6} fill={l.cor} />
          </g>
        ))}
        <circle cx={layout.hub.x} cy={layout.hub.y} r={14} fill="#02050c" stroke="#e6edf7" strokeWidth={3} />
        <circle cx={layout.hub.x} cy={layout.hub.y} r={5} fill="#e6edf7" />
      </svg>
      <p data-rotulo-mapa className="absolute -translate-y-1/2 font-mono text-xs uppercase tracking-[0.15em]" style={{ left: layout.hub.x + 26, top: layout.hub.y }}>
        Comece aqui
      </p>
      {layout.rotulosTrilha.map((r) => (
        <div key={r.trilha.id} data-rotulo-mapa className="absolute right-0 -translate-y-1/2" style={{ left: r.x, top: r.y }}>
          <p className="font-display text-lg font-semibold" style={{ color: r.trilha.cor }}>{r.trilha.nome}</p>
        </div>
      ))}
      {layout.estacoes.map((e) => (
        <Estacao
          key={e.curso.id}
          curso={e.curso}
          cor={e.cor}
          abrir={abrir}
          className="right-0 flex min-h-[3.25rem] -translate-y-1/2 items-center"
          style={{ left: e.x, top: e.y }}
          rotulo={
            <span data-rotulo-mapa className="ml-8 block py-1">
              <span className="block font-medium leading-snug">{e.curso.titulo}</span>
              <span className="mt-0.5 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-apagado">{ROTULO_NIVEL[e.curso.nivel]} · {ROTULO_STATUS[e.curso.status]}</span>
            </span>
          }
        />
      ))}
    </div>
  );
}

function ListaCursos({ catalogo, porTrilha, abrir }: { catalogo: Catalogo; porTrilha: Map<string, Trilha>; abrir: (c: Curso) => void }) {
  const [trilha, setTrilha] = useState<string | null>(null);
  const [nivel, setNivel] = useState<Nivel | null>(null);
  const resultado = filtrarCursos(catalogo.cursos, { trilha, nivel });
  const chip = (ativo: boolean) =>
    `rounded-full border px-4 py-2.5 text-sm transition-colors ${ativo ? "border-neon bg-neon/15 text-white" : "border-linha-forte text-suave hover:border-neon/60 hover:text-white"}`;

  return (
    <section aria-labelledby="titulo-lista" className="mt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="titulo-lista" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Todos os cursos</h2>
          <p className="mt-2 text-suave">Filtre por trilha e nível. Toque num curso para ver os detalhes.</p>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-apagado" aria-live="polite">
          {resultado.length} de {catalogo.cursos.length} cursos
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <div role="group" aria-label="Filtrar por trilha" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={trilha === null} onClick={() => setTrilha(null)} className={chip(trilha === null)}>Todas as trilhas</button>
          {catalogo.trilhas.map((t) => (
            <button key={t.id} type="button" aria-pressed={trilha === t.id} onClick={() => setTrilha(t.id)} className={`${chip(trilha === t.id)} inline-flex items-center gap-2`}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.cor }} aria-hidden="true" />
              {t.nome}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Filtrar por nível" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={nivel === null} onClick={() => setNivel(null)} className={chip(nivel === null)}>Todos os níveis</button>
          {NIVEIS.map((n) => (
            <button key={n} type="button" aria-pressed={nivel === n} onClick={() => setNivel(n)} className={chip(nivel === n)}>{ROTULO_NIVEL[n]}</button>
          ))}
        </div>
      </div>

      {resultado.length === 0 ? (
        <div className="cartao mt-10 flex flex-col items-start gap-4 p-8">
          <p className="text-lg font-medium">Nenhum curso com esses filtros.</p>
          <button type="button" onClick={() => { setTrilha(null); setNivel(null); }} className="inline-flex items-center gap-2 rounded-full border border-linha-forte px-5 py-2.5 text-sm hover:border-neon">
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Limpar filtros
          </button>
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {resultado.map((curso) => {
            const t = porTrilha.get(curso.trilhaId);
            return (
              <li key={curso.id} className="cartao flex flex-col overflow-clip">
                <span className="h-1 w-full" style={{ background: t?.cor }} aria-hidden="true" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em]" style={{ color: t?.cor }}>{t?.nome}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight">{curso.titulo}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-suave">{curso.resumo}</p>
                  <p className="mt-5 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-linha-forte px-3 py-1">{ROTULO_NIVEL[curso.nivel]}</span>
                    <span className="rounded-full bg-neon/10 px-3 py-1 text-neon">{ROTULO_STATUS[curso.status]}</span>
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button type="button" onClick={() => abrir(curso)} className="inline-flex items-center gap-1.5 rounded-full border border-linha-forte px-4 py-2.5 text-sm hover:border-neon">
                      Ver detalhes <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <a href={linkWhatsApp(mensagemCurso(curso, t))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full px-2 py-2.5 text-sm font-medium text-whatsapp hover:underline">
                      <IconeWhatsApp className="h-4 w-4" /> {rotuloAcaoCurso(curso)}
                      <span className="sr-only"> — {curso.titulo}</span>
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
