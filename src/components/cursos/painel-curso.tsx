"use client";

import { Clock, GraduationCap, Layers, MapPin, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { IconeWhatsApp } from "@/components/ui/icone";
import { usePrenderFoco } from "@/lib/foco";
import { gsap, movimentoPermitido } from "@/lib/gsap";
import { linkCompraAcademy } from "@/lib/cursos/academy";
import { ROTULO_MODALIDADE, ROTULO_NIVEL, ROTULO_STATUS, type Curso, type Trilha } from "@/lib/cursos/tipos";
import { linkWhatsApp, mensagemCurso, rotuloAcaoCurso } from "@/lib/whatsapp";

/** Painel de detalhe do curso (RF-06 · CEN-005): diálogo modal com foco preso, Esc fecha e o foco volta. */
export function PainelCurso({ curso, trilha, aoFechar }: { curso: Curso; trilha?: Trilha; aoFechar: () => void }) {
  const painel = useRef<HTMLDivElement>(null);
  const fundo = useRef<HTMLButtonElement>(null);

  usePrenderFoco(painel, true, aoFechar);
  useEffect(() => {
    const el = painel.current;
    if (!el || !movimentoPermitido()) return;
    const celular = window.innerWidth < 768;
    gsap.fromTo(el, celular ? { yPercent: 100 } : { xPercent: 100 }, { yPercent: 0, xPercent: 0, duration: 0.6, ease: "expo.out" });
    gsap.fromTo(fundo.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
    gsap.fromTo(el.querySelectorAll("[data-anima]"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.6, ease: "expo.out", delay: 0.15 });
  }, []);

  const cor = trilha?.cor ?? "#33aaff";
  const aberto = curso.status === "inscricoes_abertas";
  const academyHref = aberto ? linkCompraAcademy(curso.id) : null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button ref={fundo} type="button" tabIndex={-1} aria-label="Fechar detalhes do curso" onClick={aoFechar} className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm" />
      <div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-painel-curso"
        className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-[1.75rem] border border-linha-forte bg-superficie md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[min(30rem,100vw)] md:rounded-none md:rounded-l-[1.75rem]"
      >
        <div className="h-1.5 w-full" style={{ background: cor, boxShadow: `0 0 24px ${cor}` }} />
        <div className="space-y-7 p-7 md:p-9">
          <div className="flex items-start justify-between gap-4">
            <p data-anima className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: cor }}>{trilha?.nome}</p>
            <button type="button" onClick={aoFechar} className="-mr-2 -mt-2 inline-flex h-11 items-center gap-1.5 rounded-full border border-linha-forte px-4 text-sm">
              <X className="h-4 w-4" aria-hidden="true" /> Fechar
            </button>
          </div>
          <div data-anima>
            <span className={`inline-block rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] ${aberto ? "bg-whatsapp/15 text-whatsapp" : "bg-neon/10 text-neon"}`}>
              {ROTULO_STATUS[curso.status]}
            </span>
            <h2 id="titulo-painel-curso" className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight">{curso.titulo}</h2>
            <p className="mt-4 leading-relaxed text-suave">{curso.resumo}</p>
          </div>
          <dl data-anima className="grid gap-3 text-sm">
            <div className="flex items-center gap-3"><Layers className="h-4 w-4 text-neon" aria-hidden="true" /><dt className="text-apagado">Nível</dt><dd className="ml-auto font-medium">{ROTULO_NIVEL[curso.nivel]}</dd></div>
            <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-neon" aria-hidden="true" /><dt className="text-apagado">Carga horária</dt><dd className="ml-auto font-medium">{curso.cargaHoraria ? `${curso.cargaHoraria} h` : "a definir"}</dd></div>
            <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-neon" aria-hidden="true" /><dt className="text-apagado">Formato</dt><dd className="ml-auto text-right font-medium">{curso.modalidades.map((m) => ROTULO_MODALIDADE[m]).join(" · ") || "a definir"}</dd></div>
          </dl>
          {curso.topicos.length > 0 && (
            <div data-anima>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-apagado">O que você vai ver</h3>
              <ul className="mt-4 space-y-2.5">
                {curso.topicos.map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 h-2 w-2 flex-none rounded-full" style={{ background: cor }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div data-anima className="space-y-3 border-t border-linha pt-7">
            {academyHref ? (
              <>
                <a href={academyHref} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon px-6 py-4 font-semibold text-black transition-transform hover:-translate-y-0.5">
                  <GraduationCap className="h-5 w-5" /> Conhecer na Academy
                </a>
                <p className="text-center text-xs leading-relaxed text-apagado">
                  R$ 297,90 por pessoa. Inclui apostila, apresentação, acesso permanente e três meses de mentoria.
                </p>
              </>
            ) : (
              <>
                <a href={linkWhatsApp(mensagemCurso(curso, trilha))} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 font-semibold text-black transition-transform hover:-translate-y-0.5">
                  <IconeWhatsApp className="h-5 w-5" /> {rotuloAcaoCurso(curso)}
                </a>
                <p className="text-center text-xs leading-relaxed text-apagado">
                  Fale com a equipe para receber informações sobre abertura e formato.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
