import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dossiê Técnico Reservado | Brimajor",
  description: "Material restrito sob Acordo de Sigilo (NDA).",
  robots: "noindex, nofollow"
};

export default function DossieTecnico() {
  return (
    <div className="bg-brimajor-black text-zinc-100 min-h-screen pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4">
        <div className="border border-red-500/30 bg-red-500/10 p-4 rounded-xl mb-8 flex items-start gap-4">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-bold text-red-400 mb-1">PROPRIEDADE INTELECTUAL PROTEGIDA</h3>
            <p className="text-sm text-zinc-400">Este documento detalha parâmetros estritos de segurança e a árvore de decisão matemática do algoritmo de forecasting. A cópia, reprodução ou compartilhamento sem autorização constitui quebra do Acordo de Sigilo (NDA).</p>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-8">Kanban Estoque: Especificações de Arquitetura</h1>

        <div className="space-y-12 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-brimajor-techgray pb-2">1. Algoritmo de Previsão de Demanda (Forecasting)</h2>
            <p className="mb-4">O motor estocástico avalia o consumo histórico para adequar a curva ABC dinamicamente:</p>
            <div className="bg-brimajor-graphite p-4 rounded-lg font-mono text-sm border border-brimajor-techgray text-zinc-400">
              <p className="text-purple-400">const<span className="text-zinc-300"> engine = </span>async<span className="text-zinc-300"> (sku) =&gt; {"{"}</span></p>
              <p className="pl-4">const history = await db.getHistory(sku.id);</p>
              <p className="pl-4 text-emerald-400">if (history.isIntermittent) {"{"}</p>
              <p className="pl-8 text-zinc-500">// Aplica modelagem para demandas esparsas (Croston modificado)</p>
              <p className="pl-8">return applySparseModel(sku, history);</p>
              <p className="pl-4 text-emerald-400">{"}"} else {"{"}</p>
              <p className="pl-8 text-zinc-500">// Demanda contínua sazonal</p>
              <p className="pl-8">return applyDoubleExponentialSmoothing(sku, history);</p>
              <p className="pl-4 text-emerald-400">{"}"}</p>
              <p className="text-zinc-300">{"};"}</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-brimajor-techgray pb-2">2. Parâmetros Estritos de Segurança</h2>
            <ul className="list-disc pl-5 space-y-4">
              <li><strong>Proteção de Força Bruta:</strong> Bloqueio temporário rígido de 15 minutos após 5 tentativas falhas de login usando Redis Rate Limiting.</li>
              <li><strong>Criptografia:</strong> Validação Estrita HMAC (HS256) com payload de expiração curta (15 minutos).</li>
              <li><strong>Sessões:</strong> Rotação de Refresh Tokens via Family ID; qualquer tentativa de reuso indevido invalida toda a árvore de sessão daquele usuário instantaneamente.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
