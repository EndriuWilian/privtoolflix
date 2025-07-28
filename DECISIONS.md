# Apresentação

Olá! Estou entregando o projeto na data-prazo. Como trabalho atualmente, mais tempo de transporte, etc, e outras coisas, tive \
que alocar algumas horas noturnas pra fazer o projeto.

Estou à disposição.


# Decisões Técnicas

## 🔹 Estrutura do Projeto
# Backend
O projeto foi organizado em camadas claras:
- `controller`: recebe e responde as requisições HTTP da API, com tratativa de cache e rate-limit
- `service`: tratativas lógicas para chamada da API externa OMDb, fazendo já o request e retornando o model
- `dto`: objetos de transporte para entrada e saída (request/response) da API
- `model`: modelos da resposta API externa OMDb

# Frontend
- `components`: Componentes React JSX para reutilização em vários locais
- `hooks`: Armazenas hooks para reutilização. Há apenas um configurado atualmente, utilizado no menu/Sidebar
- `pages`: Páginas do site (rotas principais, que chamam componentes)
- `services`: Funções JavaScript para utilização em componentes. As chamadas ao backend estão aqui.

## 🔹 Rate Limiting (Backend)
Utilizado `Resilience4j` para evitar sobrecarga de chamadas no OMDb, apesar do cache. O retorno é o padrão 429 em caso de falha. Rate foi definido apenas por IP, apesar de não \
ser somente assim o ideal (pois um CDN ou firewall podem atender a isso). Porém, como não foi criado (poderia...) um método de autenticação JWT / token, foi a \
alternativa.

## 🔹 Cache (Backend)
Configurado utilizando Cacheable do framework para cache das chamadas, evitando muitos acessos desnecessários ao OMDb.

## 🔹 Testes (Backend)
Usei `SpringBootTest` para testar os endpoints simulando chamadas reais.

## 🔹 OpenAPI (Backend)
Esta etapa ainda precisa de alguns ajustes, existe algum problema com o acesso ao swagger. Devido ao tempo, não consegui solucionar este ponto a tempo e preciso entregar a aplicação hoje.

## 🔹 Design Geral (UI / UX) (Frontend)
Não foi utilizado template pronto para o frontend. O desenvolvimento foi realizado com a web e experiência/lógica e ideias próprias. Há muito a melhorar, mas dentro do tempo disponível e como eu não costumo desenvolver muito atualmente em frontend, diria que ficou legal e interessante.

## 🔹 Menu Sidebar (UI / UX) (Frontend)
Na ideia do menu, foi necessário fazer um atraso (em hook) para aparecer a descrição dos itens do menu, se não o efeito na abertura quebrava a linha dos textos \
e ficava um pouco estranho.

## 🔹 Modo Escuro/Claro (UI / UX) (Frontend)
Utilizado funcionalidade da biblioteca tailwindcss (ou um 'framework CSS') para apoiar no modo escuro/claro. A decisão das cores foi a tentativa de utilizar o azul \
para ficar de acordo com as cores da empresa, combinando com o 'nome' adotado para aplicação de 'PrivToolFlix'.

## 🔹 Favoritos (Frontend)
Utilizado o armazenado na sessão do site, devido a não possuir (ainda) banco de dados para login e armazenarmos por sessão.

## 🔹 Carrossel (Frontend)
As imagens foram fixadas no carrosel para apresentação, porque a qualidade da imagem do OMDb fica ruim para essa finalidade.

## 🔹 Pesquisar (Frontend)
A tela de pesquisa utiliza o endpoint de buscar lista, onde não vem no resultado dados a nota. Então, nos cards, só aparecerá o título e o ano. Ao clicar, abrirá o modal
com as informações completas (já utilizando o endpoint de busca específica). 

## 🔹 Modal de Detalhes (Frontend)
Aqui temos dados como sinopse, tipo e nota do item que foi entrado. Caso seja uma série, poderá navegar entre as temporadas em um design legal e intuitivo.

Itens como os cards, modal ou listas horizontais (barra de rolagem em linha, semelhante a sites como Netflix, etc...) foram criados como componentes. Desta forma, \
estão sendo usado em todas as telas, o mesmo componente, facilitando a futura manutenção e identificação de erros.

## 🔹 Justificativas
- **Spring Boot** foi escolhido pela sua produtividade e padrão de mercado.
- A separação por DTOs ajuda a manter a API estável, mesmo com mudanças internas.
- A opção por `POST` nos endpoints é para maior flexibilidade no envio de parâmetros complexos.
- **TailwindCSS** foi escolhido para modernidade e praticidade na configuração HTML/CSS dos componentes JSX.

## ⚠️ Pontos a evoluir
- Tratativa de possíveis erros da API no FrontEnd (como na tela de busca, por exemplo)
- Corrigir o OpenAPI, que está com algum erro na abertura do documento.
- Implementar contêiner PostgreSQL para criação de usuário, tela de login e armazenar os favoritos no banco ao invés de no navegador/sessão.
- No Backend, apesar da não necessidade para o OMDb API, é interessante fazer um método de autenticação JWT, para até mesmo melhorar o rate-limit.
- Algumas telas do front estarão com comentários explicando listas fixadas manualmente. Isso é por conta da API do OMDb não ter endpoint para lista\
de filmes 'em alta' ou etc. Com isso, para ter uma variedade ali, foi fixado uma lista, simulando que viesse de uma 'API' externa por exemplo. Então, \
de melhoria, nesse item, poderia ter criado ele como um serviço JS ao invés de deixar no próprio JSX.
- Volume de requisições JS ao Backend (se deve ao motivo da consulta detalhada (com nota) só ser possível via endpoint individual no OMDb, porém tem que avaliar uma lógica pra não ocorrer tanta chamada AJAX ao backend)
