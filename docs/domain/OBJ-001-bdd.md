# Cenários BDD — Site institucional e Mapa de Cursos da Brimajor

> Modelo da Brimajor Squad SDD (tríade obrigatória: principal, variações aceitas e não aceitos).
> Cada cenário recebe um ID estável com `@id:`. Nos testes, o ID é citado como `covers: CEN-00N`.

## Fluxo principal

@principal @id:CEN-001
Cenário: Abertura animada na primeira visita
  Dado que a pessoa abre o site pela primeira vez nesta sessão
  Quando a página carrega
  Então o logo da Brimajor é desenhado e uma cortina revela a página
  E um botão "Pular abertura" fica disponível durante a animação

@principal @id:CEN-002
Cenário: Chip 3D reage ao mouse e ao scroll
  Dado que o navegador suporta WebGL e não pede movimento reduzido
  Quando a pessoa move o mouse sobre o hero e rola a página
  Então o chip inclina na direção do mouse
  E a câmera se aproxima da placa conforme a rolagem

@principal @id:CEN-003
Cenário: Transição entre páginas
  Dado que a pessoa está na página inicial
  Quando ela clica em "Cursos" no menu
  Então uma cortina em camadas cobre a tela
  E a página /cursos é revelada com o título animado

@principal @id:CEN-004
Cenário: Mapa de cursos em linhas de metrô
  Dado que o catálogo tem trilhas com cursos
  Quando a pessoa abre /cursos
  Então cada trilha aparece como uma linha colorida com seu nome
  E as estações seguem a ordem iniciante, intermediário, avançado

@principal @id:CEN-005
Cenário: Detalhe do curso pelo mapa
  Dado que a pessoa está no mapa de cursos
  Quando ela clica numa estação ou foca nela e tecla Enter
  Então um painel mostra título, trilha, nível, modalidades, tópicos e status
  E o botão do WhatsApp do curso fica disponível

@principal @id:CEN-007
Cenário: Interesse num curso pelo WhatsApp
  Dado que o painel do curso "Engenharia de Prompt na Prática" está aberto
  Quando a pessoa clica em "Quero ser avisado"
  Então abre wa.me/5592985224523 em nova aba
  E a mensagem já contém o título do curso, a trilha e o nível

@principal @id:CEN-009
Cenário: Catálogo vindo da Neon
  Dado que DATABASE_URL está configurada e o banco responde
  Quando a página /cursos é gerada
  Então as trilhas e cursos exibidos são os das tabelas trilhas e cursos
  E cursos com status encerrado não aparecem

## Variações aceitas

@variacao @id:CEN-004B
Cenário: Variação — mapa vertical no celular
  Dado uma tela com largura menor que 768 px
  Quando a pessoa abre /cursos
  Então as linhas do mapa correm de cima para baixo
  E não há rolagem horizontal na página

@variacao @id:CEN-006
Cenário: Variação — filtrar a lista de cursos
  Dado a lista de cursos
  Quando a pessoa escolhe a trilha "IA Embarcada & IoT" e o nível "avançado"
  Então só aparecem cursos dessa trilha e desse nível
  E se nenhum curso atender, aparece "Nenhum curso com esses filtros" e o botão "Limpar filtros"

@variacao @id:CEN-010
Cenário: Variação — catálogo local quando não há banco
  Dado que DATABASE_URL não está configurada
  Quando a página /cursos é gerada
  Então o catálogo local é exibido
  E o log do servidor registra a origem local, sem segredo

@variacao @id:CEN-011
Cenário: Variação — foto autoral substitui a arte
  Dado que o arquivo public/fotos/equipe.jpg existe
  Quando a seção "Quem somos" é exibida
  Então a foto aparece no lugar da arte gerada, com texto alternativo

@variacao @id:CEN-012
Cenário: Variação — movimento reduzido
  Dado que o sistema pede prefers-reduced-motion
  Quando a pessoa navega pelo site
  Então não há abertura, cortina, parallax nem rotação contínua
  E o modelo 3D aparece como imagem estática

## Cenários não aceitos

@negative @id:CEN-008
Cenário: Rejeição — formulário de contato sem nome
  Dado o formulário de contato da página inicial
  Quando a pessoa tenta enviar sem preencher o nome
  Então o botão "Conversar no WhatsApp" fica desabilitado e o campo mostra "Informe seu nome"
  E nenhuma janela do WhatsApp é aberta e nada é gravado

@negative @id:CEN-013
Cenário: Rejeição — linha inválida no banco
  Dado que a tabela cursos tem um curso com nível "expert" ou trilha inexistente
  Quando o catálogo é carregado
  Então esse curso é descartado e não aparece no mapa
  E o log registra o id do curso descartado

@negative @id:CEN-014
Cenário: Rejeição — banco fora do ar
  Dado que DATABASE_URL está configurada mas a Neon não responde
  Quando a página /cursos é gerada
  Então a página exibe o catálogo local sem erro para o visitante
  E o log registra a falha sem expor a connection string

@negative @id:CEN-015
Cenário: Rejeição — texto malicioso na mensagem do WhatsApp
  Dado que a pessoa digita "<script>alert(1)</script> & ?text=x" na mensagem
  Quando o link do WhatsApp é montado
  Então o texto vai codificado no parâmetro text, sem alterar a URL nem executar nada
  E a mensagem é cortada em 1.000 caracteres

## Checklist da tríade

- Não aceitos por regra de negócio: CEN-008 (nome obrigatório), CEN-013 (catálogo válido), CEN-014 (falha de dependência).
- Entrada maliciosa: CEN-015 (injeção na URL do WhatsApp). O catálogo não recebe entrada do visitante.
- Dados pessoais: o site não grava nome nem mensagem; logs só levam o id do curso e a origem do catálogo.
