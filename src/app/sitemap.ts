import type { MetadataRoute } from "next";
import { empresa } from "@/lib/conteudo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/cursos", "/squad", "/estoque", "/iniciacoes"].map((rota) => ({
    url: `${empresa.url}${rota}`,
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : 0.8,
  }));
}
