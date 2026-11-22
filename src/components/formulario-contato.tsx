"use client";

import { useId, useState, type FormEvent } from "react";
import { IconeWhatsApp } from "@/components/ui/icone";
import { ASSUNTOS_CONTATO, LIMITE_DETALHES, LIMITE_NOME, linkWhatsApp, mensagemContato } from "@/lib/whatsapp";

/** Formulário que só monta a mensagem e abre o WhatsApp (RF-08 · CEN-008). Nada é enviado ao servidor nem gravado. */
export function FormularioContato({ assuntoInicial = ASSUNTOS_CONTATO[0] }: { assuntoInicial?: string }) {
  const id = useId();
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState(assuntoInicial);
  const [detalhes, setDetalhes] = useState("");
  const [tocouNome, setTocouNome] = useState(false);
  const [link, setLink] = useState<string | null>(null);

  const mensagem = mensagemContato({ nome, assunto, detalhes });
  const erroNome = tocouNome && !nome.trim();

  function enviar(e: FormEvent) {
    e.preventDefault();
    setTocouNome(true);
    if (!mensagem) return;
    const url = linkWhatsApp(mensagem);
    setLink(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const campo = "w-full rounded-xl border border-linha-forte bg-fundo/70 px-4 py-3.5 text-texto placeholder:text-apagado transition-colors focus:border-neon focus:outline-none";

  return (
    <form onSubmit={enviar} noValidate className="cartao space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor={`${id}-nome`} className="mb-2 block text-sm font-medium">Seu nome <span className="text-neon">*</span></label>
        <input
          id={`${id}-nome`}
          value={nome}
          maxLength={LIMITE_NOME}
          autoComplete="name"
          onChange={(e) => setNome(e.target.value)}
          onBlur={() => setTocouNome(true)}
          aria-invalid={erroNome}
          aria-describedby={erroNome ? `${id}-erro` : undefined}
          className={campo}
          placeholder="Como podemos te chamar?"
        />
        {erroNome && <p id={`${id}-erro`} className="mt-2 text-sm text-[#ff8a8a]">Informe seu nome.</p>}
      </div>
      <div>
        <label htmlFor={`${id}-assunto`} className="mb-2 block text-sm font-medium">Assunto</label>
        <select id={`${id}-assunto`} value={assunto} onChange={(e) => setAssunto(e.target.value)} className={campo}>
          {ASSUNTOS_CONTATO.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor={`${id}-detalhes`} className="text-sm font-medium">Conte um pouco <span className="text-apagado">(opcional)</span></label>
          <span className="font-mono text-xs text-apagado" aria-live="polite">{detalhes.length}/{LIMITE_DETALHES}</span>
        </div>
        <textarea id={`${id}-detalhes`} rows={4} value={detalhes} maxLength={LIMITE_DETALHES} onChange={(e) => setDetalhes(e.target.value)} className={`${campo} resize-none`} placeholder="Qual problema você quer resolver ou o que quer aprender?" />
      </div>
      <button
        type="submit"
        disabled={!nome.trim()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 font-semibold text-black transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        <IconeWhatsApp className="h-5 w-5" />
        Conversar no WhatsApp
      </button>
      <p className="text-center text-xs text-apagado">O site não guarda seus dados: a mensagem vai direto para o nosso WhatsApp.</p>
      {link && (
        <p role="status" className="rounded-xl border border-whatsapp/30 bg-whatsapp/10 p-4 text-sm text-texto">
          Abrimos o WhatsApp numa nova aba. Se não abriu, <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold text-whatsapp underline">toque aqui</a>.
        </p>
      )}
    </form>
  );
}
