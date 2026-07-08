import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brimajor | Sistemas Embarcados & IA",
  description: "Prototipagem Ágil, Sistemas Embarcados & Inteligência Artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-brimajor-black text-zinc-50 min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-1 flex flex-col pt-16">
          {children}
        </main>
        
        <footer className="border-t border-brimajor-techgray bg-brimajor-black py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-sm text-zinc-400">
            <p>WhatsApp: <a href="https://wa.me/5592985224523" className="hover:text-brimajor-neon transition-colors" target="_blank" rel="noopener noreferrer">(92) 98522-4523</a> | Manaus - Amazonas</p>
            <p className="mt-4 text-xs text-zinc-500 max-w-2xl mx-auto">
              Nota: Abstrações matemáticas e inteligência de software resguardadas sob sigilo industrial de propriedade intelectual. Soluções apresentadas configuram Iniciações Tecnológicas e Conceitos Funcionais de Engenharia em fase de validação inicial.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
