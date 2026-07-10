import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ScrollToTop } from "@/components/scroll-to-top";
import Link from "next/link";
import { Cpu, MessageCircle } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Brimajor | Sistemas Embarcados & IA",
  description: "Prototipagem Ágil, Sistemas Embarcados & Inteligência Artificial em Manaus/AM.",
  metadataBase: new URL("https://brimajor.onrender.com"),
  openGraph: {
    title: "Brimajor | Sistemas Embarcados & IA",
    description: "Prototipagem Ágil, Sistemas Embarcados & Inteligência Artificial em Manaus/AM.",
    url: "https://brimajor.onrender.com",
    siteName: "Brimajor",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brimajor | Sistemas Embarcados & IA",
    description: "Prototipagem Ágil, Sistemas Embarcados & Inteligência Artificial.",
  },
  icons: { icon: "/favicon.ico" },
  other: { "theme-color": "#0066FF" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans bg-brimajor-black text-zinc-50 min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-1 flex flex-col pt-16 pb-16 md:pb-0">
          {children}
        </main>

        {/* ── FOOTER PROFISSIONAL ── */}
        <footer className="relative border-t border-brimajor-techgray bg-brimajor-black mt-12">
          {/* Gradient divider */}
          <div className="section-divider" />

          <div className="fluid-container py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

              {/* Coluna 1: Brand */}
              <div className="space-y-4">
                <Link href="/" className="group inline-flex items-center gap-2 text-white hover:text-brimajor-neon transition-colors">
                  <Cpu className="w-6 h-6 text-brimajor-primary group-hover:scale-110 transition-transform" style={{ filter: "drop-shadow(0 0 6px rgba(0,102,255,0.5))" }} />
                  <span className="font-bold text-xl tracking-tight">Brimajor</span>
                </Link>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                  Sistemas embarcados, inteligência artificial e prototipagem ágil. Sediados em Manaus — AM.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://instagram.com/brimajor_ia"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Brimajor"
                    className="w-9 h-9 rounded-lg bg-brimajor-graphite border border-brimajor-techgray flex items-center justify-center text-zinc-400 hover:text-pink-400 hover:border-pink-500/40 hover:shadow-[0_0_12px_rgba(236,72,153,0.3)] transition-all duration-300"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/5592985224523"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Brimajor"
                    className="w-9 h-9 rounded-lg bg-brimajor-graphite border border-brimajor-techgray flex items-center justify-center text-zinc-400 hover:text-[#25D366] hover:border-[#25D366]/40 hover:shadow-[0_0_12px_rgba(37,211,102,0.3)] transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Coluna 2: Navegação */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Navegação</h4>
                <nav className="flex flex-col gap-2.5">
                  <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors w-fit">Home</Link>
                  <Link href="/iniciacoes" className="text-sm text-zinc-400 hover:text-white transition-colors w-fit">Iniciações & Prototipagem</Link>
                  <Link href="/estoque" className="text-sm text-zinc-400 hover:text-brimajor-neon transition-colors w-fit inline-flex items-center gap-1.5">
                    Kanban Estoque
                    <span className="text-[8px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brimajor-primary/20 text-brimajor-neon border border-brimajor-primary/30">Produto</span>
                  </Link>
                </nav>
              </div>

              {/* Coluna 3: Contato */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Contato</h4>
                <a
                  href="https://wa.me/5592985224523"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  (92) 98522-4523
                </a>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Manaus — Amazonas, Brasil
                </p>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-10 pt-6 border-t border-brimajor-techgray/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-zinc-600">
                © {new Date().getFullYear()} Brimajor. Todos os direitos reservados.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 text-[10px] text-zinc-600">
                <span>
                  <strong className="text-zinc-500">Kanban Estoque</strong> — Fase final de desenvolvimento
                </span>
                <span className="hidden sm:inline text-zinc-700">•</span>
                <span>Demais soluções — Conceitos em validação técnica</span>
              </div>
            </div>

            {/* Sigilo notice */}
            <p className="mt-4 text-[10px] text-zinc-700 text-center">
              Abstrações matemáticas e inteligência de software resguardadas sob sigilo industrial.
            </p>
          </div>
        </footer>

        <ScrollToTop />
      </body>
    </html>
  );
}
