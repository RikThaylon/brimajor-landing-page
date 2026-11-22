import { describe, expect, it } from "vitest";
import { catalogoLocal } from "@/lib/cursos/catalogo-local";
import { layoutMapa } from "@/lib/cursos/mapa-layout";
import { NIVEIS } from "@/lib/cursos/tipos";

const { trilhas, cursos } = catalogoLocal;

describe("layout do mapa de cursos", () => {
  it("uma linha por trilha e estações por nível — covers: CEN-004", () => {
    const mapa = layoutMapa(trilhas, cursos, "horizontal");
    expect(mapa.linhas.map((l) => l.trilha.id)).toEqual(trilhas.map((t) => t.id));
    expect(mapa.estacoes).toHaveLength(cursos.length);
    for (const trilha of trilhas) {
      const doTrilha = mapa.estacoes.filter((e) => e.trilhaId === trilha.id);
      expect(new Set(doTrilha.map((e) => e.y)).size).toBe(1); // mesma linha
      const xs = doTrilha.map((e) => e.x);
      expect([...xs].sort((a, b) => a - b)).toEqual(xs); // da esquerda para a direita
      const niveis = doTrilha.map((e) => NIVEIS.indexOf(e.curso.nivel));
      expect([...niveis].sort()).toEqual(niveis); // iniciante → avançado
      for (const e of doTrilha) {
        const coluna = mapa.niveis.find((n) => n.nivel === e.curso.nivel)!;
        expect(e.x).toBeGreaterThan(coluna.inicio);
        expect(e.x).toBeLessThan(coluna.fim);
      }
    }
    expect(mapa.estacoes.every((e) => e.x < mapa.largura && e.y < mapa.altura)).toBe(true);
  });

  it("orientação vertical troca os eixos — covers: CEN-004B", () => {
    const mapa = layoutMapa(trilhas, cursos, "vertical");
    expect(mapa.estacoes).toHaveLength(cursos.length);
    expect(new Set(mapa.estacoes.map((e) => e.x)).size).toBe(1); // todas na mesma coluna
    const ys = mapa.estacoes.map((e) => e.y);
    expect([...ys].sort((a, b) => a - b)).toEqual(ys); // de cima para baixo
    expect(mapa.tronco).toMatch(/^M \d+ \d+ V \d+/);
    expect(mapa.altura).toBeGreaterThan(ys[ys.length - 1]);
  });

  it("trilha sem curso não desenha linha", () => {
    const vazia = { id: "vazia", nome: "Vazia", descricao: "", cor: "#FFFFFF", ordem: 9 };
    const mapa = layoutMapa([...trilhas, vazia], cursos, "horizontal");
    expect(mapa.linhas.some((l) => l.trilha.id === "vazia")).toBe(false);
  });

  it("é determinístico", () => {
    expect(layoutMapa(trilhas, cursos)).toEqual(layoutMapa(trilhas, cursos));
  });
});
