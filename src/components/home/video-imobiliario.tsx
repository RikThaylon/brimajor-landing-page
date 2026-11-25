"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const mp4 = "/videos/imovel-3d-v2.mp4";
const webm = "/videos/imovel-3d-v2.webm";

export function VideoImobiliario() {
  const video = useRef<HTMLVideoElement>(null);
  const [pronto, setPronto] = useState(false);
  const [iniciado, setIniciado] = useState(false);
  const [falhou, setFalhou] = useState(false);
  const vincularVideo = useCallback((elemento: HTMLVideoElement | null) => {
    video.current = elemento;
    if (elemento) {
      setPronto(true);
      if (elemento.error || elemento.networkState === elemento.NETWORK_NO_SOURCE) setFalhou(true);
    }
  }, []);

  function reproduzir() {
    if (!video.current) return;
    video.current.focus({ preventScroll: true });
    void video.current.play().catch((erro: Error) => {
      if (erro.name !== "AbortError") setFalhou(true);
    });
  }

  return (
    <figure id="video-visualizacao-imobiliaria" className="min-w-0 scroll-mt-24">
      <div className="relative">
        <video
          ref={vincularVideo}
          aria-label="Da planta ao imóvel em 3D, apresentação da Brimajor"
          className="block aspect-video h-auto w-full rounded-2xl border border-linha-forte bg-fundo"
          width={1280}
          height={720}
          controls
          playsInline
          preload="metadata"
          poster="/videos/imovel-3d-v2.webp"
          tabIndex={0}
          onLoadedMetadata={() => setFalhou(false)}
          onPlay={() => setIniciado(true)}
          onPlaying={() => setFalhou(false)}
          onError={(evento) => {
            if (evento.target === evento.currentTarget) setFalhou(true);
          }}
        >
          <source src={mp4} type={'video/mp4; codecs="avc1.42C01F, mp4a.40.2"'} />
          <source src={webm} type={'video/webm; codecs="vp9, opus"'} onError={() => setFalhou(true)} />
          <track kind="captions" src="/videos/visualizacao-imobiliaria.vtt" srcLang="pt-BR" label="Português" default />
        </video>
        {pronto && !iniciado && !falhou && (
          <button
            type="button"
            onClick={reproduzir}
            aria-label="Assistir ao vídeo de apresentação do imóvel em 3D"
            className="absolute left-1/2 top-1/2 inline-flex min-h-12 -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/50 bg-fundo/90 px-5 text-sm font-semibold text-white shadow-lg hover:border-ciano hover:text-ciano"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Assistir ao vídeo
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-suave">
        {falhou && (
          <p role="status" className="mb-2 text-texto">
            O vídeo não carregou neste player. Você também pode{" "}
            <a href={webm} target="_blank" rel="noopener noreferrer" className="font-medium text-neon underline">assistir à versão WebM em nova aba</a>.
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <span>Imagens ilustrativas · Áudio e legendas em português</span>
          <a href={mp4} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 font-medium text-neon hover:underline">
            Abrir vídeo em nova aba <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <details className="mt-1">
          <summary className="w-fit cursor-pointer py-2 font-medium text-neon">Ler a transcrição do vídeo</summary>
          <p className="mt-2">Já imaginou apresentar um imóvel antes mesmo de ele ficar pronto? A Brimajor transforma sua planta em uma visualização em três dimensões, ajudando seu cliente a entender cada ambiente. Para imobiliárias, corretores e construtoras. Envie sua planta e peça um orçamento.</p>
        </details>
      </figcaption>
    </figure>
  );
}
