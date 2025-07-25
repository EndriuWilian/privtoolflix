# PrivToolFlix API

API RESTful para consulta de dados do OMDB, com endpoints para buscar itens individuais, listas e temporadas de séries (com detalhe dos episódios).

## Tecnologias
- Java 17
- Spring Boot 3.5.3
- Resilience4j (Rate Limiting)
- JUnit 5 + MockMvc
- Maven
- React JS (Vite)
- TailwindCSS

## Como executar:

```bash
# Clone o projeto
git clone git@github.com:EndriuWilian/privtoolflix.git

```

Considerando que está na pasta do projeto
```bash
docker-compose up --build

```

## Como acessar:

Acesse no navegador `http://localhost:3000`

## Atenção!

A chave de API do OMDb usada por ter sido expirada devido a ser uma chave grátis. Se for, acesse o arquivo `docker-compose.yaml` \
na raiz do projeto e altere a variável de ambiente `API_KEY` no contêiner **backend** antes de executar.

