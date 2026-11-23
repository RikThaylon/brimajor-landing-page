# Materiais — IA na Prática para Empresas

Materiais editáveis da capacitação empresarial da Brimajor, com foco em empresas iniciantes e intermediárias. A trilha avançada apresenta agentes supervisionados e squads de agentes sem tratar nenhuma squad interna específica como produto.

## Arquivos finais

- `apostila-ia-na-pratica.pdf` — apostila curta, em A4.
- `apresentacao-ia-na-pratica.pptx` — apresentação editável, em 16:9.

## Fontes e regeneração

```bash
# Apostila (execute nesta pasta)
xelatex -interaction=nonstopmode -halt-on-error apostila-ia-na-pratica.tex
xelatex -interaction=nonstopmode -halt-on-error apostila-ia-na-pratica.tex

# Apresentação
node gerar-apresentacao.cjs
```

A apostila usa Open Sans e o logotipo em `public/marca`. A apresentação é gerada com PptxGenJS e contém notas curtas para quem for apresentar.

## Estrutura pedagógica

1. IA sem mistério e seleção de tarefas.
2. Engenharia de contexto e cartão reutilizável.
3. Uso seguro, dados e revisão humana.
4. IA nos processos, piloto e métricas.
5. Copilotos, agentes e squads supervisionadas.
6. Plano de aplicação em 30 dias.
