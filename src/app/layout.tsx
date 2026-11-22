import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Abertura } from "@/components/layout/abertura";
import { Cortina } from "@/components/layout/cortina";
import { Navegacao } from "@/components/layout/navegacao";
import { Pronto } from "@/components/layout/pronto";
import { Rodape } from "@/components/layout/rodape";
import { empresa } from "@/lib/conteudo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], style: ["normal", "italic"], variable: "--fonte-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--fonte-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--fonte-mono", display: "swap", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(empresa.url),
  title: { default: "Brimajor | Sistemas Embarcados & IA", template: "%s | Brimajor" },
  description: empresa.descricao,
  openGraph: {
    title: "Brimajor | Sistemas Embarcados & IA",
    description: empresa.descricao,
    url: empresa.url,
    siteName: "Brimajor",
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Brimajor | Sistemas Embarcados & IA", description: empresa.descricao },
};

export const viewport: Viewport = { themeColor: "#02050c", colorScheme: "dark" };

// Roda antes da primeira pintura: decide se há movimento e se a abertura aparece (uma vez por sessão).
// Se o JavaScript do site não hidratar em 6 s, libera todo o conteúdo escondido para animação.
const scriptInicial = `(function(){try{var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.movimento=r?'reduzido':'ok';var v=null;try{v=sessionStorage.getItem('brimajor-abertura')}catch(e){}if(!r&&!v&&!/[?&]sem-abertura/.test(location.search)){d.dataset.abertura='mostrar'}setTimeout(function(){if(!window.__brimajorPronto){d.dataset.movimento='falhou';d.dataset.abertura=''}},6000)}catch(e){}})();`;

export default function LayoutRaiz({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptInicial }} />{/* squad-ignore: SEC-JS-DANGEROUS-HTML script fixo do próprio site (constante acima), sem nenhuma entrada externa */}
      </head>
      <body className="font-sans antialiased">
        <a href="#conteudo" className="sr-only z-[100] rounded-full bg-neon px-4 py-2 font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Pular para o conteúdo
        </a>
        <Abertura />
        <Navegacao />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Rodape />
        <Cortina />
        <Pronto />
      </body>
    </html>
  );
}
