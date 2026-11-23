import { describe, expect, it } from "vitest";
import { catalogoLocal } from "@/lib/cursos/catalogo-local";
import { carregarCatalogo, mensagemSegura, type FonteCatalogo } from "@/lib/cursos/repositorio";

const trilhasDb = [{ id: "fundamentos", nome: "Começar com IA", descricao: "d", cor: "#33AAFF", ordem: 1 }];
const cursosDb = [
  { id: "a", trilha_id: "fundamentos", titulo: "A", resumo: "", nivel: "iniciante", carga_horaria: null, modalidades: ["online"], topicos: [], status: "inscricoes_abertas", ordem: 1 },
  { id: "b", trilha_id: "fundamentos", titulo: "B", resumo: "", nivel: "avancado", carga_horaria: 8, modalidades: [], topicos: [], status: "encerrado", ordem: 2 },
];

function fonte(trilhas: unknown[], cursos: unknown[]): FonteCatalogo {
  return { trilhas: async () => trilhas as never, cursos: async () => cursos as never };
}

describe("repositório do catálogo", () => {
  it("usa as linhas do banco e omite encerrados — covers: CEN-009", async () => {
    const logs: string[] = [];
    const cat = await carregarCatalogo({ fonte: fonte(trilhasDb, cursosDb), registrar: (m) => logs.push(m) });
    expect(cat.origem).toBe("neon");
    expect(cat.cursos.map((c) => c.id)).toEqual(["a"]);
    expect(logs).toEqual([]);
  });

  it("sem DATABASE_URL usa o catálogo local — covers: CEN-010", async () => {
    const logs: string[] = [];
    const cat = await carregarCatalogo({ url: undefined, registrar: (m) => logs.push(m) });
    expect(cat).toBe(catalogoLocal);
    expect(logs).toEqual(["catalogo: origem local (sem DATABASE_URL)"]);
  });

  it("falha do banco cai para o local sem vazar a URL — covers: CEN-014", async () => {
    const logs: string[] = [];
    const quebrada: FonteCatalogo = {
      trilhas: async () => { throw new Error("connect failed postgresql://user:segredo@ep-x.neon.tech/neondb password=segredo"); }, // squad-ignore: SECRET-URL-CREDENTIALS credencial fictícia: o teste prova que a URL é mascarada no log
      cursos: async () => [],
    };
    const cat = await carregarCatalogo({ fonte: quebrada, registrar: (m) => logs.push(m) });
    expect(cat).toBe(catalogoLocal);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toContain("falha na Neon");
    expect(logs[0]).not.toContain("segredo");
  });

  it("banco lento estoura o tempo limite e cai para o local", async () => {
    const lenta: FonteCatalogo = { trilhas: () => new Promise(() => {}), cursos: async () => [] };
    const logs: string[] = [];
    const cat = await carregarCatalogo({ fonte: lenta, registrar: (m) => logs.push(m), tempoLimiteMs: 20 });
    expect(cat.origem).toBe("local");
    expect(logs[0]).toContain("tempo limite");
  });

  it("banco vazio ou só com linhas inválidas usa o local e registra os descartes — covers: CEN-013", async () => {
    const logs: string[] = [];
    const cat = await carregarCatalogo({
      fonte: fonte(trilhasDb, [{ ...cursosDb[0], id: "x", nivel: "expert" }]),
      registrar: (m) => logs.push(m),
    });
    expect(cat.origem).toBe("local");
    expect(logs).toEqual([
      "catalogo: cursos 'x' descartado (nível desconhecido)",
      "catalogo: banco sem trilhas ou cursos válidos, usando local",
    ]);
  });

  it("mensagemSegura oculta URL de conexão", () => {
    expect(mensagemSegura(new Error("postgres://a:b@c/d falhou"))).toBe("[url-ocultada] falhou");
  });
});
