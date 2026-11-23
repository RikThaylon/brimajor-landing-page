export const ACADEMY_URL = "https://brimajor-academy.onrender.com";

const PRODUTO_POR_CURSO: Readonly<Record<string, string>> = {
  "ia-na-pratica-empresas": "MOD-01",
  "engenharia-contexto": "MOD-02",
  "uso-seguro-ia": "MOD-03",
  "ia-processos-empresa": "MOD-04",
  "agentes-supervisionados": "MOD-05",
};

export function codigoProdutoAcademy(cursoId: string): string | null {
  return PRODUTO_POR_CURSO[cursoId] ?? null;
}

export function linkCompraAcademy(cursoId: string): string | null {
  const codigo = codigoProdutoAcademy(cursoId);
  return codigo ? `${ACADEMY_URL}/comprar/${codigo}` : null;
}
