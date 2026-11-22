import type { Curso, Nivel } from "./tipos";

export interface Filtros {
  trilha?: string | null;
  nivel?: Nivel | null;
}

/** Filtra mantendo a ordem recebida (CEN-006). Filtro vazio devolve todos. */
export function filtrarCursos(cursos: Curso[], filtros: Filtros): Curso[] {
  return cursos.filter(
    (c) => (!filtros.trilha || c.trilhaId === filtros.trilha) && (!filtros.nivel || c.nivel === filtros.nivel),
  );
}
