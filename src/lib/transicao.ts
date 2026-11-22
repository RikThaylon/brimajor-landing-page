// Ponte entre os links e a cortina de transição (RF-04): o link pede para cobrir a tela,
// navega, e a cortina se revela quando a rota nova monta.
type Cobrir = (destino: string) => Promise<void>;

let cobrir: Cobrir | null = null;

export function registrarCortina(fn: Cobrir | null) {
  cobrir = fn;
}

export async function cobrirTela(destino: string): Promise<boolean> {
  if (!cobrir) return false;
  await cobrir(destino);
  return true;
}

/** Só links internos, sem tecla modificadora, para outra rota (âncora na mesma página segue normal). */
export function deveTransicionar(evento: { metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean; button: number }, href: string, rotaAtual: string) {
  if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey || evento.button !== 0) return false;
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  const rota = href.split(/[?#]/)[0] || "/";
  return rota !== rotaAtual;
}
