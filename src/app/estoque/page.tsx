import { BarChart3, ShieldCheck, CheckCircle, Users, FileBarChart, Fingerprint } from "lucide-react";
import { estoqueModules } from "@/lib/data";
import { BrandWatermark } from "@/components/brand-watermark";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  FileBarChart: <FileBarChart className="w-5 h-5" />,
  Fingerprint: <Fingerprint className="w-5 h-5" />,
};

export default function EstoquePage() {
  return (
    <div className="bg-brimajor-black text-zinc-100 min-h-screen selection:bg-brimajor-primary selection:text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-24 lg:py-32 border-b border-brimajor-techgray" aria-label="Kanban de Estoque">
        <BrandWatermark />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-brimajor-primary/10 border border-brimajor-primary/20 rounded-full px-3 py-1 text-xs text-brimajor-neon font-medium">
                <span>Solução Estrutural por Brimajor Sistemas Embarcados & IA</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                Kanban de Estoque Inteligente orientado a <span className="bg-gradient-to-r from-brimajor-neon to-brimajor-primary bg-clip-text text-transparent">compliance</span>
              </h1>
              <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Conectamos o consumo do chão de fábrica, automação de processos, fluxos hierárquicos de aprovação e manutenção de ativos em um ecossistema auditável. Desenhado para plantas industriais complexas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href="#modulos" className="w-full sm:w-auto bg-brimajor-primary hover:bg-brimajor-neon text-white font-medium text-sm px-6 py-3 rounded-md transition-all text-center shadow-lg shadow-brimajor-primary/10">
                  Explorar Módulos Técnicos
                </a>
                <a href="https://wa.me/5592985224523" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto border border-brimajor-techgray hover:bg-brimajor-graphite text-zinc-300 font-medium text-sm px-6 py-3 rounded-md transition-all text-center flex items-center justify-center gap-2">
                  Fale no WhatsApp
                </a>
              </div>
            </div>
            {/* Code Mockup */}
            <div className="lg:col-span-5 relative">
              <AnimateOnScroll delay={200}>
                <div className="relative bg-brimajor-graphite border border-brimajor-techgray rounded-xl p-4 shadow-2xl font-mono text-xs text-zinc-400 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-brimajor-techgray pb-3 mb-3">
                    <div className="flex space-x-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/40" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                      <span className="w-3 h-3 rounded-full bg-green-500/40" />
                    </div>
                    <span className="text-[10px] text-zinc-500">brimajor_kanban.js</span>
                  </div>
                  <p className="text-brimajor-neon">// Adaptação Estocástica em Tiers</p>
                  <p className="text-purple-400">const<span className="text-zinc-300"> engine = </span>async<span className="text-zinc-300"> (sku) =&gt; {"{"}</span></p>
                  <p className="pl-4">const history = await db.getHistory(sku.id);</p>
                  <p className="pl-4 text-emerald-400">if (history.isIntermittent) {"{"}</p>
                  <p className="pl-8 text-zinc-500">// Executa modelagem para demandas esparsas</p>
                  <p className="pl-8">return applySparseModel(sku, history);</p>
                  <p className="pl-4 text-emerald-400">{"}"} else {"{"}</p>
                  <p className="pl-8">return applyDoubleExponentialSmoothing(sku, history);</p>
                  <p className="pl-4 text-emerald-400">{"}"}</p>
                  <p className="text-zinc-300">{"};"};</p>
                  <div className="mt-4 pt-4 border-t border-brimajor-techgray flex items-center justify-between text-[11px]">
                    <span className="text-emerald-500">● Redis Cache Connected</span>
                    <span className="text-zinc-500">PostgreSQL 15</span>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </header>

      {/* O Desafio Resolvido */}
      <section id="solucao" className="py-20 bg-brimajor-graphite/40" aria-label="Filosofia">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brimajor-neon mb-3">Filosofia da Brimajor</h2>
          <blockquote className="text-xl sm:text-2xl font-light text-zinc-200 italic leading-relaxed">
            &quot;O desafio na indústria complexa não é apenas visualizar dados de inventário, mas transformar requisições isoladas em ações preventivas e auditáveis para quem está no chão de fábrica, mitigando riscos fiscais e operacionais sem travar o ritmo de produção.&quot;
          </blockquote>
        </div>
      </section>

      {/* Core Modules — componentized */}
      <section id="modulos" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Módulos Estruturais">
        <AnimateOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-brimajor-neon">Módulos Estruturais</h2>
            <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Engenharia funcional aplicada ao processo</p>
            <p className="text-zinc-400 font-light text-sm">Funcionalidades desenhadas sob rígidos pilares de controle interno e otimização de fluxo físico.</p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {estoqueModules.map((mod, i) => (
            <AnimateOnScroll key={mod.id} delay={i * 80}>
              <div className="bg-brimajor-graphite/60 border border-brimajor-techgray/80 rounded-xl p-6 space-y-4 hover:border-zinc-700 transition-all h-full">
                <div className="h-10 w-10 rounded-lg bg-brimajor-techgray flex items-center justify-center text-brimajor-neon">
                  {iconMap[mod.icon]}
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">{mod.title}</h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">{mod.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* Arquitetura & Stack */}
      <section id="arquitetura" className="py-24 bg-brimajor-graphite/30 border-t border-b border-brimajor-techgray" aria-label="Arquitetura">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll>
              <div className="space-y-6">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-brimajor-neon">Engenharia de Software</h2>
                <h3 className="text-3xl font-bold tracking-tight text-white">Desenhado para Alta Concorrência Transacional</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Chão de fábrica roda em múltiplos turnos 24 horas por dia. A infraestrutura do backend foi projetada utilizando concorrência pessimista direto em banco de dados para eliminar condições de corrida críticas durante leituras de estoque físico.
                </p>
                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-3">
                    <span className="text-brimajor-neon font-mono text-xs mt-0.5">01</span>
                    <div>
                      <h4 className="text-zinc-200 text-sm font-medium">Bloqueio de Concorrência</h4>
                      <p className="text-zinc-400 text-xs font-light">Uso estruturado de queries isoladas com cláusulas <span className="font-mono text-zinc-300">FOR UPDATE</span> no PostgreSQL garantindo integridade atômica em concorrências severas.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-brimajor-neon font-mono text-xs mt-0.5">02</span>
                    <div>
                      <h4 className="text-zinc-200 text-sm font-medium">Processamento Paralelo Síncrono</h4>
                      <p className="text-zinc-400 text-xs font-light">Background jobs executados e gerenciados via Redis 7, evitando gargalos na thread principal da API Node.js durante relatórios analíticos pesados.</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Stack Visual */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Frontend Core", title: "React 18 & Vite", desc: "TanStack Query para gerenciamento estrito de cache de rede e Zustand para persistência local rápida de estados do cliente." },
                { label: "Backend Core", title: "Node.js Express", desc: "API REST puramente transacional estruturada em camadas, injetada nativamente com barramento WebSockets em tempo real." },
                { label: "Persistência", title: "PostgreSQL 15+", desc: "Modelagem relacional otimizada para logs infinitos e uso do tipo nativo JSONB para flexibilidade de metadados dinâmicos." },
                { label: "Cache & Filas", title: "Redis 7", desc: "Armazenamento em memória para chaves rápidas de sessão, blacklist imediata de segurança e filas CRON assíncronas." },
              ].map((s, i) => (
                <AnimateOnScroll key={s.title} delay={i * 100}>
                  <div className="bg-brimajor-graphite border border-brimajor-techgray p-5 rounded-xl space-y-2 h-full">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">{s.label}</span>
                    <h4 className="text-base font-semibold text-zinc-200">{s.title}</h4>
                    <p className="text-zinc-400 text-xs font-light">{s.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Segurança */}
      <section id="seguranca" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Segurança">
        <AnimateOnScroll>
          <div className="bg-gradient-to-b from-brimajor-graphite to-brimajor-black border border-brimajor-techgray/80 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="max-w-3xl space-y-6 relative z-10">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-brimajor-neon">Defesa Ativa Contra Vetores de Ataque</h2>
              <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Segurança de Nível Corporativo</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Sistemas industriais gerenciam faturamento e ativos físicos de alto valor. Nossa camada de proteção mitiga tentativas de fraude interna e interceptações de sessão maliciosas por meio de políticas sistêmicas rigorosas e automatizadas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  { title: "Refresh Token Rotation", desc: "Estratégia anti-sequestro com Family IDs. Se um token antigo for reutilizado, o sistema invalida a família de conexões instantaneamente." },
                  { title: "Blacklist via Redis", desc: "Mecanismo síncrono que joga tokens JWT em cache de memória expurgada no momento do logout, impedindo reutilização residual do token." },
                  { title: "Account Lockout Ativo", desc: "Bloqueio temporário rígido de 15 minutos em contas após 5 tentativas falhas de autenticação de credenciais, mitigando força bruta." },
                  { title: "Validação Estrita HMAC", desc: "Verificação manual de assinaturas digitais (HS256), protegendo o ecossistema contra ataques do tipo exploit algoritmo nulo." },
                ].map((item) => (
                  <div key={item.title} className="space-y-1">
                    <h4 className="text-zinc-200 text-sm font-semibold flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-brimajor-neon mr-2" />
                      {item.title}
                    </h4>
                    <p className="text-zinc-400 text-xs font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </div>
  );
}
