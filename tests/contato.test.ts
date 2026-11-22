import { describe, expect, it } from "vitest";
import { LIMITE_DETALHES, LIMITE_NOME, mensagemContato } from "@/lib/whatsapp";

describe("formulário de contato", () => {
  it("nome vazio não monta mensagem — covers: CEN-008", () => {
    expect(mensagemContato({ nome: "", assunto: "Outro assunto" })).toBeNull();
    expect(mensagemContato({ nome: "    ", assunto: "Outro assunto", detalhes: "teste" })).toBeNull();
  });

  it("monta a mensagem com nome, assunto e detalhes", () => {
    const msg = mensagemContato({ nome: " Ana ", assunto: "Cursos e treinamentos de IA", detalhes: " turma à noite " });
    expect(msg).toBe("Olá, Brimajor! Sou Ana.\nAssunto: Cursos e treinamentos de IA.\nDetalhes: turma à noite");
  });

  it("corta nome e detalhes nos limites", () => {
    const msg = mensagemContato({ nome: "N".repeat(200), assunto: "Outro assunto", detalhes: "d".repeat(2000) })!;
    expect(msg).toContain(`Sou ${"N".repeat(LIMITE_NOME)}.`);
    expect(msg).not.toContain("N".repeat(LIMITE_NOME + 1));
    expect(msg.endsWith("d".repeat(LIMITE_DETALHES))).toBe(true);
    expect(msg).not.toContain("d".repeat(LIMITE_DETALHES + 1));
  });
});
