import type { MetadataRoute } from "next";
import { empresa } from "@/lib/conteudo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/estoque/dossie-tecnico"] },
    sitemap: `${empresa.url}/sitemap.xml`,
  };
}
