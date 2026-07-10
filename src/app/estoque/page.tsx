import { Metadata } from "next";
import { EstoqueContent } from "./estoque-content";

export const metadata: Metadata = {
  title: "Kanban Estoque | Brimajor",
  description: "Sistema Kanban digital para gestão de estoque industrial em Manaus. Elimine rupturas, acompanhe KPIs e audite cada movimentação.",
};

export default function EstoquePage() {
  return <EstoqueContent />;
}
