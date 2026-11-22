"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { movimentoPermitido } from "@/lib/gsap";
import { cobrirTela, deveTransicionar } from "@/lib/transicao";

type Props = ComponentProps<typeof Link> & { href: string };

/** Link interno que cobre a tela com a cortina antes de navegar (RF-04). */
export function LinkTransicao({ href, onClick, ...resto }: Props) {
  const router = useRouter();
  const rota = usePathname();

  async function aoClicar(evento: MouseEvent<HTMLAnchorElement>) {
    onClick?.(evento);
    if (evento.defaultPrevented || !movimentoPermitido() || !deveTransicionar(evento, href, rota)) return;
    evento.preventDefault();
    await cobrirTela(href);
    router.push(href);
  }

  return <Link href={href} onClick={aoClicar} {...resto} />;
}
