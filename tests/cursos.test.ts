import { describe, expect, it } from "vitest";
import { catalogoLocal } from "@/lib/cursos/catalogo-local";
import { filtrarCursos } from "@/lib/cursos/filtro";
import { normalizarCursos, normalizarTrilhas } from "@/lib/cursos/normalizar";

const linhaCurso = {
  id: "teste", trilha_id: "fundamentos", titulo: "Curso de teste", resumo: "r", nivel: "iniciante",
  carga_horaria: 12, modalidades: ["online", "teleporte"], topicos: ["a", "", "b"], status: "em_breve", ordem: 1,
};

describe("catálogo", () => {
  it("o catálogo local é consistente: toda trilha existe e todo id é único", () => {
    const ids = new Set(catalogoLocal.trilhas.map((t) => t.id));
    expect(catalogoLocal.cursos.every((c) => ids.has(c.trilhaId))).toBe(true);
    expect(new Set(catalogoLocal.cursos.map((c) => c.id)).size).toBe(catalogoLocal.cursos.length);
    expect(catalogoLocal.cursos.every((c) => c.status === "em_breve")).toBe(true);
  });

  it("normaliza uma linha válida do banco", () => {
    const { cursos, descartes } = normalizarCursos([linhaCurso], catalogoLocal.trilhas);
    expect(descartes).toEqual([]);
    expect(cursos[0]).toMatchObject({ id: "teste", trilhaId: "fundamentos", cargaHoraria: 12, modalidades: ["online"], topicos: ["a", "b"] });
  });

  it("descarta curso com nível ou trilha inválidos — covers: CEN-013", () => {
    const { cursos, descartes } = normalizarCursos(
      [
        { ...linhaCurso, id: "nivel-ruim", nivel: "expert" },
        { ...linhaCurso, id: "trilha-ruim", trilha_id: "nao-existe" },
        { ...linhaCurso, id: "status-ruim", status: "rascunho" },
        { ...linhaCurso, id: "", titulo: "" },
      ],
      catalogoLocal.trilhas,
    );
    expect(cursos).toEqual([]);
    expect(descartes.map((d) => [d.id, d.motivo])).toEqual([
      ["nivel-ruim", "nível desconhecido"],
      ["trilha-ruim", "trilha inexistente"],
      ["status-ruim", "status desconhecido"],
      ["", "id ou título ausente"],
    ]);
  });

  it("omite curso encerrado e trata carga horária ausente como 'a definir'", () => {
    const { cursos } = normalizarCursos(
      [{ ...linhaCurso, id: "fechado", status: "encerrado" }, { ...linhaCurso, id: "sem-carga", carga_horaria: null }],
      catalogoLocal.trilhas,
    );
    expect(cursos.map((c) => c.id)).toEqual(["sem-carga"]);
    expect(cursos[0].cargaHoraria).toBeNull();
  });

  it("descarta trilha com cor fora do formato", () => {
    const { trilhas, descartes } = normalizarTrilhas([
      { id: "ok", nome: "Ok", descricao: "", cor: "#00AAFF", ordem: "2" },
      { id: "ruim", nome: "Ruim", descricao: "", cor: "azul", ordem: 1 },
    ]);
    expect(trilhas.map((t) => [t.id, t.ordem])).toEqual([["ok", 2]]);
    expect(descartes).toHaveLength(1);
  });

  it("filtra por trilha e nível — covers: CEN-006", () => {
    const r = filtrarCursos(catalogoLocal.cursos, { trilha: "embarcada", nivel: "avancado" });
    expect(r.map((c) => c.id)).toEqual(["agentes-supervisionados", "squads-agentes-equipes"]);
    expect(filtrarCursos(catalogoLocal.cursos, {})).toHaveLength(catalogoLocal.cursos.length);
  });

  it("filtro sem resultado devolve lista vazia — covers: CEN-006", () => {
    expect(filtrarCursos(catalogoLocal.cursos, { trilha: "fundamentos", nivel: "avancado" })).toEqual([]);
  });
});
