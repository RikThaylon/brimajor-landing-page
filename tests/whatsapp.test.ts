import { describe, expect, it } from "vitest";
import { catalogoLocal } from "@/lib/cursos/catalogo-local";
import { LIMITE_MENSAGEM, linkWhatsApp, mensagemCurso, rotuloAcaoCurso, WHATSAPP_NUMERO } from "@/lib/whatsapp";

const contexto = catalogoLocal.cursos.find((c) => c.id === "engenharia-contexto")!;
const trilhaContexto = catalogoLocal.trilhas.find((t) => t.id === "negocios")!;

describe("link do WhatsApp", () => {
  it("mensagem do curso leva título, trilha e nível — covers: CEN-007", () => {
    const msg = mensagemCurso(contexto, trilhaContexto);
    expect(msg).toContain('"Engenharia de Contexto"');
    expect(msg).toContain("Engenharia de Contexto");
    expect(msg).toContain("nível iniciante");
    expect(msg).toContain("Quero me inscrever");
    const url = new URL(linkWhatsApp(msg));
    expect(url.origin + url.pathname).toBe(`https://wa.me/${WHATSAPP_NUMERO}`);
    expect(url.searchParams.get("text")).toBe(msg);
  });

  it("curso com inscrições abertas pede inscrição, não aviso", () => {
    expect(mensagemCurso(contexto, trilhaContexto)).toContain("Quero me inscrever");
    expect(rotuloAcaoCurso(contexto)).toBe("Quero me inscrever");
    const futuro = { ...contexto, status: "em_breve" as const };
    expect(mensagemCurso(futuro, trilhaContexto)).toContain("avisado");
    expect(rotuloAcaoCurso(futuro)).toBe("Quero ser avisado");
  });

  it("codifica texto malicioso e corta em 1000 — covers: CEN-015", () => {
    const ataque = "<script>alert(1)</script> & ?text=x #frag " + "á".repeat(2000);
    const link = linkWhatsApp(ataque);
    const url = new URL(link);
    expect(url.hostname).toBe("wa.me");
    expect([...url.searchParams.keys()]).toEqual(["text"]);
    expect(url.hash).toBe("");
    expect(link).not.toContain("<script>");
    const texto = url.searchParams.get("text")!;
    expect(texto.startsWith("<script>alert(1)</script> & ?text=x #frag")).toBe(true);
    expect(Array.from(texto)).toHaveLength(LIMITE_MENSAGEM);
  });

  it("sem texto devolve o link simples", () => {
    expect(linkWhatsApp("   ")).toBe(`https://wa.me/${WHATSAPP_NUMERO}`);
  });
});
