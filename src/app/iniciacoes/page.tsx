import { Metadata } from "next";
import { IniciacoesContent } from "./iniciacoes-content";

export const metadata: Metadata = {
  title: "Iniciações e Pesquisa | Brimajor",
  description: "Linhas de pesquisa e prototipagem funcional da Brimajor em Manaus. Veja conceitos em validação e solicite testes operacionais.",
};

export default function IniciacoesPage() {
  return <IniciacoesContent />;
}
