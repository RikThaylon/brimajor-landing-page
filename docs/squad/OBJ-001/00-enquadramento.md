# Enquadramento — OBJ-001

> Gate 0. Uma página. Quem ler precisa saber o que será entregue, o que não será e como saberemos que acabou.
> Projeto: site · Data: 2026-11-21

## Pedido original

criar o site institucional da Brimajor com animações e modelos 3D, mapa de cursos e treinamentos de IA lido de um banco Neon, contato e inscrição pelo WhatsApp, deploy na Render

Pedido do responsável (Rik Thaylon), resumido: "um site bem bonito sobre a minha empresa", com imagens autorais, transições no estilo After Effects, itens modelados em 3D, um mapa de cursos e treinamentos de IA (os cursos reais serão enviados depois), banco na Neon, publicação na Render e pagamento/inscrição conversados pelo WhatsApp.

## Objetivo observável

Uma pessoa de fora abre o site, vê a abertura animada com a marca da Brimajor, navega pela página inicial com modelos 3D (chip e placa de circuito, rede neural) e transições de cena, entende o que a empresa faz, abre o **Mapa de Cursos e Treinamentos de IA**, escolhe um curso e cai numa conversa de WhatsApp com a mensagem já escrita com o nome do curso.

## Escopo

- Página inicial nova: abertura animada, hero com chip/placa 3D animado por scroll e mouse, manifesto, frentes de atuação, produtos (Kanban Estoque e Brimajor Squad SDD), modelo de trabalho, iniciações, chamada para os cursos e contato.
- Página `/cursos`: mapa em estilo "linhas de metrô" com trilhas e níveis, painel de detalhe do curso, lista filtrável (alternativa acessível ao mapa), formatos de treinamento e passo a passo de inscrição pelo WhatsApp.
- Página `/squad`: apresentação do produto Brimajor Squad SDD.
- Páginas `/estoque`, `/estoque/dossie-tecnico` e `/iniciacoes` preservadas (conteúdo do site atual), no visual novo, para não quebrar links existentes.
- Transição animada entre páginas e revelações de texto e imagem no scroll; tudo respeita "reduzir movimento".
- Catálogo de cursos lido do Postgres da Neon (tabelas `trilhas` e `cursos`), com catálogo local de reserva quando o banco não estiver configurado ou falhar.
- Espaços de foto prontos: a foto aparece sozinha quando o arquivo é colocado em `public/fotos/`; até lá, arte gerada no próprio site.
- Modelos 3D exportáveis em `.glb` para reuso (apresentações, Blender).
- Configuração de deploy na Render (`render.yaml`) e guia de publicação.

## Fora do escopo

- Pagamento online: o responsável ainda não decidiu o meio; inscrição e pagamento são combinados pelo WhatsApp.
- Cadastro de interessados no banco: o contato vai direto ao WhatsApp e o site **não guarda dados pessoais** (evita obrigações de LGPD sem necessidade agora).
- Conteúdo definitivo dos cursos: o catálogo inicial é de exemplo, marcado como "em breve", até o responsável enviar os cursos reais.
- Painel administrativo de cursos: a edição é feita por SQL no console da Neon.
- Fotos reais: dependem do envio pelo responsável.
- Publicar (merge e deploy): decisão do responsável no Gate 5A.

## Contexto e restrições

- Modo e natureza: `deliver_slice` · `greenfield` — pasta `site/` nova; reaproveita marca, cores, textos e páginas do site atual (`RikThaylon/brimajor-landing-page`).
- Restrições técnicas: Next.js 16 + React 19 + Tailwind 4 + GSAP (mesmo stack do site atual) e three.js; precisa rodar no plano gratuito da Render (Node, sem GPU no servidor; o 3D roda no navegador) e funcionar no celular.
- Restrição de ambiente: nesta sessão em nuvem só há permissão de escrita no repositório `squad-framework-brimajor`; o site fica em `site/` e a Render publica com *Root Directory* `site`.
- Dependências externas: Neon (banco, conta do responsável), Render (hospedagem, conta do responsável), WhatsApp (92) 98522-4523.

## Critério de encerramento

Site constrói (`npm run build`) e passa em lint, tipos e testes; quality gate da squad aprovado no estágio build; páginas conferidas no navegador em desktop e celular sem erro de console; catálogo lido da Neon; especificação e liberação decididas pelo responsável (Gates 2 e 5A).

## Dúvidas em aberto

| # | Dúvida | Recomendação da squad | Quem decide |
|---|---|---|---|
| 1 | Quais cursos, cargas horárias e preços entram no catálogo? | Publicar o mapa com cursos de exemplo marcados "em breve" e trocar pelos reais via SQL quando chegarem | Rik Thaylon |
| 2 | Quais fotos usar? | Enviar fotos reais (equipe, bancada, protótipos, aulas); até lá, arte gerada no site | Rik Thaylon |
| 3 | O site novo substitui o atual em `brimajor.onrender.com`? | Sim, depois da aprovação no Gate 5A; o repositório do site atual pode receber a pasta `site/` depois | Rik Thaylon |
