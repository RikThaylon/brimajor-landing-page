"use client";

import { useState, FormEvent } from "react";
import { iniciacoes } from "@/lib/data";
import { MessageCircle, User, FileText, ChevronDown, Check } from "lucide-react";

interface ContactFormProps {
  initialInterest?: string;
  value?: string;
  onChange?: (val: string) => void;
}

export function ContactForm({ initialInterest = "", value, onChange }: ContactFormProps) {
  const [internalSelected, setInternalSelected] = useState(initialInterest);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  const isControlled = value !== undefined;
  const selected = isControlled ? value : internalSelected;
  const setSelected = isControlled ? (onChange ?? (() => {})) : setInternalSelected;

  const phone = "5592985224523";

  function buildWhatsAppLink() {
    const area = iniciacoes.find(i => i.id === selected)?.title ?? selected;
    const msg = encodeURIComponent(
      `Olá, sou ${name}.\nTenho interesse em: ${area || "um projeto"}.\n${details ? `Detalhes: ${details}` : ""}`.trim()
    );
    return `https://wa.me/${phone}?text=${msg}`;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;
    window.open(buildWhatsAppLink(), "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="max-w-xl mx-auto mt-12 glass-card p-6 sm:p-8 animate-slide-up delay-200">
      <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center text-brimajor-white">
        Inicie uma Prova de Conceito
      </h3>
      <p className="text-xs text-zinc-500 text-center mb-6">
        Preencha e envie direto pelo WhatsApp — resposta em até 24h.
      </p>

      {sent ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center">
            <Check className="w-8 h-8 text-[#25D366]" />
          </div>
          <p className="text-lg font-semibold text-white">Mensagem enviada!</p>
          <p className="text-sm text-zinc-400 text-center max-w-xs">
            Continue a conversa pela janela do WhatsApp que abriu. Responderemos em breve.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Name */}
          <div className="relative group">
            <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
              Nome Completo <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-brimajor-neon transition-colors" />
              <input
                required
                type="text"
                id="contact-name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full bg-brimajor-black/80 border border-brimajor-techgray rounded-lg pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 transition-all duration-300 focus:outline-none focus:border-brimajor-primary focus:ring-1 focus:ring-brimajor-primary/50 focus:shadow-[0_0_12px_rgba(0,102,255,0.15)]"
              />
            </div>
          </div>

          {/* Interest */}
          <div className="relative group">
            <label htmlFor="contact-interest" className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
              Área de Interesse
            </label>
            <div className="relative">
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
              <select
                id="contact-interest"
                value={selected}
                onChange={e => setSelected(e.target.value)}
                className="w-full appearance-none bg-brimajor-black/80 border border-brimajor-techgray rounded-lg px-4 py-3 text-sm text-zinc-100 transition-all duration-300 focus:outline-none focus:border-brimajor-primary focus:ring-1 focus:ring-brimajor-primary/50 focus:shadow-[0_0_12px_rgba(0,102,255,0.15)]"
              >
                <option value="">Selecione uma Iniciação</option>
                {iniciacoes.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
                <option value="custom">Um Novo Projeto Customizado</option>
              </select>
            </div>
          </div>

          {/* Details */}
          <div className="relative group">
            <label htmlFor="contact-details" className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
              Detalhes Operacionais <span className="text-zinc-700">(Opcional)</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-zinc-600 group-focus-within:text-brimajor-neon transition-colors" />
              <textarea
                id="contact-details"
                rows={3}
                value={details}
                onChange={e => setDetails(e.target.value)}
                className="w-full bg-brimajor-black/80 border border-brimajor-techgray rounded-lg pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-700 transition-all duration-300 focus:outline-none focus:border-brimajor-primary focus:ring-1 focus:ring-brimajor-primary/50 focus:shadow-[0_0_12px_rgba(0,102,255,0.15)] resize-none"
                placeholder="Descreva brevemente o cenário que precisa de validação..."
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full mt-2 bg-[#25D366] hover:bg-[#1ebe59] text-white font-semibold py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_-6px_rgba(37,211,102,0.5)] flex justify-center items-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none text-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Solicitar via WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
