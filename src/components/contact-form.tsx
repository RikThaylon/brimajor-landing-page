"use client";

import { useState } from "react";
import { sendContactEmail } from "@/app/actions";
import { iniciacoes } from "@/lib/data";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    try {
      const response = await sendContactEmail(formData);
      if (response.success) {
        setMessage({ text: "Solicitação enviada com sucesso. Nossa engenharia entrará em contato em breve.", type: "success" });
      } else {
        setMessage({ text: "Ocorreu um erro ao enviar sua solicitação.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Falha na comunicação. Tente novamente.", type: "error" });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-brimajor-graphite border border-brimajor-techgray p-8 rounded-xl shadow-2xl animate-slide-up delay-200">
      <h3 className="text-2xl font-semibold mb-6 text-center text-brimajor-white">Inicie uma Prova de Conceito</h3>
      
      <form action={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1.5">Nome Completo</label>
          <input required type="text" id="name" name="name" className="w-full bg-brimajor-black border border-brimajor-techgray rounded-md px-4 py-2.5 text-zinc-100 transition-colors duration-300 focus:outline-none focus:border-brimajor-primary focus:ring-1 focus:ring-brimajor-primary" />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1.5">E-mail Corporativo</label>
          <input required type="email" id="email" name="email" className="w-full bg-brimajor-black border border-brimajor-techgray rounded-md px-4 py-2.5 text-zinc-100 transition-colors duration-300 focus:outline-none focus:border-brimajor-primary focus:ring-1 focus:ring-brimajor-primary" />
        </div>
        
        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-zinc-400 mb-1.5">Área de Interesse</label>
          <select required id="interest" name="interest" className="w-full bg-brimajor-black border border-brimajor-techgray rounded-md px-4 py-2.5 text-zinc-100 transition-colors duration-300 focus:outline-none focus:border-brimajor-primary focus:ring-1 focus:ring-brimajor-primary">
            <option value="">Selecione uma Iniciação</option>
            {iniciacoes.map((item) => (
              <option key={item.id} value={item.title}>{item.title}</option>
            ))}
            <option value="custom">Um Novo Projeto Customizado</option>
          </select>
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-zinc-400 mb-1.5">Detalhes Operacionais (Opcional)</label>
          <textarea id="details" name="details" rows={3} className="w-full bg-brimajor-black border border-brimajor-techgray rounded-md px-4 py-2.5 text-zinc-100 transition-colors duration-300 focus:outline-none focus:border-brimajor-primary focus:ring-1 focus:ring-brimajor-primary placeholder:text-zinc-600" placeholder="Descreva brevemente o cenário que precisa de validação..."></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full mt-2 bg-brimajor-primary hover:bg-brimajor-neon text-brimajor-white font-medium py-3.5 rounded-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(0,93,255,0.4)] flex justify-center items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          Solicitar Contato Técnico
        </button>
        
        {message && (
          <div className={`mt-4 p-4 rounded-md text-sm animate-fade-in ${message.type === "success" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/50" : "bg-red-950/40 text-red-400 border border-red-800/50"}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}
