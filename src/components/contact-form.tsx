"use client";

import { useState } from "react";
import { iniciacoes } from "@/lib/data";
import { Loader2, MessageCircle } from "lucide-react";

export function ContactForm() {
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const phone = "5592985224523";

  function buildWhatsAppLink() {
    const area = iniciacoes.find(i => i.id === selected)?.title ?? selected;
    const msg = encodeURIComponent(
      `Olá, sou ${name}.\nTenho interesse em: ${area || "um projeto"}.\n${details ? `Detalhes: ${details}` : ""}`.trim()
    );
    return `https://wa.me/${phone}?text=${msg}`;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-brimajor-graphite border border-brimajor-techgray p-8 rounded-xl shadow-2xl animate-slide-up delay-200">
      <h3 className="text-2xl font-semibold mb-6 text-center text-brimajor-white">Inicie uma Prova de Conceito</h3>

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1.5">Nome Completo</label>
          <input
            required type="text" id="name" value={name} onChange={e => setName(e.target.value)}
            className="w-full bg-brimajor-black border border-brimajor-techgray rounded-md px-4 py-2.5 text-zinc-100 transition-colors duration-300 focus:outline-none focus:border-brimajor-primary focus:ring-1 focus:ring-brimajor-primary"
          />
        </div>

        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-zinc-400 mb-1.5">Área de Interesse</label>
          <select
            id="interest" value={selected} onChange={e => setSelected(e.target.value)}
            className="w-full bg-brimajor-black border border-brimajor-techgray rounded-md px-4 py-2.5 text-zinc-100 transition-colors duration-300 focus:outline-none focus:border-brimajor-primary focus:ring-1 focus:ring-brimajor-primary"
          >
            <option value="">Selecione uma Iniciação</option>
            {iniciacoes.map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
            <option value="custom">Um Novo Projeto Customizado</option>
          </select>
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-zinc-400 mb-1.5">Detalhes Operacionais (Opcional)</label>
          <textarea
            id="details" rows={3} value={details} onChange={e => setDetails(e.target.value)}
            className="w-full bg-brimajor-black border border-brimajor-techgray rounded-md px-4 py-2.5 text-zinc-100 transition-colors duration-300 focus:outline-none focus:border-brimajor-primary focus:ring-1 focus:ring-brimajor-primary placeholder:text-zinc-600"
            placeholder="Descreva brevemente o cenário que precisa de validação..."
          />
        </div>

        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-2 bg-[#25D366] hover:bg-[#1ebe59] text-white font-medium py-3.5 rounded-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(37,211,102,0.5)] flex justify-center items-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Solicitar via WhatsApp
        </a>
      </div>
    </div>
  );
}
