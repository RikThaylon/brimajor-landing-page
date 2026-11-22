# Plano de testes — OBJ-001

> Gate 2. Define, antes do código, o que prova que a entrega funciona — e o que prova que ela recusa o que deve recusar.

## Níveis de teste

| Nível | O que cobre neste recorte | Ferramenta e comando |
|---|---|---|
| Unitário | Link e mensagem do WhatsApp, normalização e validação do catálogo, filtro de cursos, layout do mapa, fallback do repositório | Vitest · `npm test` |
| Integração | Repositório de cursos contra a Neon real (somente leitura) e contra cliente simulado que falha | Vitest com cliente injetado · consulta na Neon conferida pelo console MCP |
| Ponta a ponta | Abertura, troca de página, mapa → painel → WhatsApp, filtro, celular 390 px, console sem erro | Playwright (roteiro de conferência visual) |
| Estático | Tipos, lint e build de produção | `npm run typecheck` · `npm run lint` · `npm run build` |

## Casos por cenário do BDD

| Cenário (@id) | Tipo | Teste que o cobre |
|---|---|---|
| CEN-004 | principal | `tests/mapa.test.ts::uma linha por trilha e estações por nível` |
| CEN-004B | variação | `tests/mapa.test.ts::orientação vertical troca os eixos` |
| CEN-006 | variação | `tests/cursos.test.ts::filtra por trilha e nível` e `::filtro sem resultado devolve lista vazia` |
| CEN-007 | principal | `tests/whatsapp.test.ts::mensagem do curso leva título, trilha e nível` |
| CEN-009 | principal | `tests/repositorio.test.ts::usa as linhas do banco e omite encerrados` |
| CEN-010 | variação | `tests/repositorio.test.ts::sem DATABASE_URL usa o catálogo local` |
| CEN-013 | não aceito | `tests/cursos.test.ts::descarta curso com nível ou trilha inválidos` |
| CEN-014 | não aceito | `tests/repositorio.test.ts::falha do banco cai para o local sem vazar a URL` |
| CEN-015 | não aceito | `tests/whatsapp.test.ts::codifica texto malicioso e corta em 1000` |
| CEN-008 | não aceito | `tests/contato.test.ts::nome vazio não monta link` + roteiro Playwright |
| CEN-001, 002, 003, 005, 011, 012 | principal/variação | Roteiro Playwright (conferência visual com captura de tela) |

## Casos negativos e de borda

- Entradas inválidas: nome só com espaços; mensagem acima de 1.000 caracteres; caracteres especiais (`&`, `?`, `#`, emoji, acento) na mensagem.
- Catálogo: nível/status desconhecidos, trilha inexistente, `modalidades` nulo, cor fora do formato hex, trilha sem cursos, catálogo vazio.
- Falhas: banco lança erro; banco devolve zero linhas (usa local); WebGL indisponível (imagem estática).
- Acesso: não se aplica (site público, sem login).

## Metas

- Cobertura de linhas nos módulos de `src/lib/` com regra: ≥ 80% (medida com `vitest --coverage` quando o pacote de cobertura for instalado; até lá, todas as funções públicas com teste).
- Nenhum teste pulado, focado (`.only`) ou sem asserção.

## Dados e ambiente

Dados sintéticos: o próprio catálogo de exemplo e fixtures nos testes. Nenhum dado de pessoa. A Neon é consultada só para leitura.

## Fora do alcance dos testes automáticos

- Qualidade visual das animações e dos modelos 3D: conferência visual com capturas (desktop 1440 px e celular 390 px), pelo executor, e aprovação do responsável.
- Leitor de tela real (NVDA/VoiceOver): recomendado ao responsável antes da 1.0; o roteiro automático confere nomes acessíveis e ordem de foco.
- Deploy na Render: conferido após o Gate 5A, no destino.
