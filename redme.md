# API-vendas

## Detalhes do processo/motivos das bibliotecas usadas

### Inicialização do npm e typescript

Passo 1 - Iniciar o NPM no projeto

```shell
  npm init
```

Passo 2 - Instalar as dependências do Typescript

```shell
  npm i typescript ts-node-dev @types/node tsconfig-paths -D
```

Passo 3 - Foi criado um arquivo chamado de "tsconfig.json", onde estará sendo configurado o typescript para o projeto. Tudo isso pela linha de comando.

```shell
  npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
```

Passo 4 - Criado também um arquivo gitignore para evitar de subir arquivos desnecessarios via repositório.

Passo 5 - Crio no package.json, um script para compilar os arquivos ts, utilizando a biblioteca "ts-node-dev"

```json
  "scripts": {
    "dev": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/server.ts"
  }
```

Passo 6 - Agora posso executar o porojeto em modo desenvolvimento

```shell
  npm run dev
```

### Ferramentas de padrozização de código

Passo 1 - Utilizo o .editorconfig para ja começar a automatização de identação do código via plugin no vscode.

Passo 2 - Instalo o ESLint com as confirações necessárias para o typescript. Definindo as convenções de código.

```shell
  npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Passo 3 - Crio e configuro o arquivo .eslintrc

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "prettier/prettier": "error"
  }
}
```

Passo 4 - Crio e configuro o .eslintignore

```text
  node_modules
  dist
  build
  /*.js
```

Passo 5 - Crio um script no package.json para aplicar o eslint e fazer verificações.

```json
  "scripts": {
    "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
    "lint": "eslint . --ext .ts"
  }
```

OBS: Posso também configurar regras no eslint para aplicar em tempo de desenvolvimento avisos de off, warn ou error.

Passo 6 - Juntamente com o ESLint, instalei o Prettier, que realizará a formatação automática com base nas regras do ESLint

```shell
  npm i prettier -D
```

Passo 7 - Criei e configurei o arquivo .prettierrc

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

Passo 8 - Instalando config e plugin do prettier

```shell
  npm i eslint-config-prettier@6.15.0 eslint-plugin-prettier@3.2.0 -D
```

### Arctetura de pastas

`config` - Configurações de bibliotecas externas, como por exemplo, autenticação, upload, email, etc.

`modules` - Abrangem as áreas de conhecimento da aplicação, diretamente relacionados com as regras de negócios. A princípio criaremos os seguintes módulos na aplicação: customers, products, orders e users.

`shared` - Módulos de uso geral compartilhados com mais de um módulo da aplicação, como por exemplo, o arquivo server.ts, o arquivo principal de rotas, conexão com banco de dados, etc.

`services` - Estarão dentro de cada módulo da aplicação e serão responsáveis por todas as regras que a aplicação precisa atender, como por exemplo:

- A senha deve ser armazenada com criptografia;
- Não pode haver mais de um produto com o mesmo nome;
- Não pode haver um mesmo email sendo usado por mais de um usuário;
- E muitas outras...

Passo 1 - Coloquei uma config no tsconfig.json, para fornece atalhos as pastas criadas

```json
  "paths": {
    "@config/*": ["src/config/*"],
    "@modules/*": ["src/modules/*"],
    "@shared/*": ["src/shared/*"]
  }
```

### Instalando o Express

Instale o express

```shell
  npm i express cors express-async-errors
```

E também a tipagem do express

```shell
  npm i -D @types/express @types/cors
```

### Instalação do ORM, para manipulação dos Bancos de Dados

Vou utilizar o typeORM para essa funcionalidade, para isso precisei instalar:

```shell
  npm i typeorm reflect-metadata pg
```

Depois da configuração do typeORM, em questão de acesso, crio uma imagem postgres via docker para a utilização do banco de dados, de acordo com as especificações que escolhi no arquivo do typeORM.

```shell
  docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5532:5432 -d postgres
```

Alpliquei scripts no packege.json para facilitar o processo de criação e inicialização dos Migrations do typeorm.

```json
  "migration:create": "npm run typeorm migration:create -- -n",
  "migration:run": "npm run typeorm migration:run -- -d src/shared/typeorm/index.ts"
```

Para poder utilizar as Entidade sem que acuse erro vindo do typescript, precisei habilitar três propriedades no tsconfig.

```json
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strictPropertyInitialization": false,
```

### Instalação do CELEBRATE

Ele é uma biblioteca que validara os dados recebidos pela API

Passo 1: Instalar a biblioteca

```shell
  npm i celebrate
```

Passo 2: Instalar a tipagem do Joi, que é utilizada pela biblioteca.

```shell
  npm i -D @types/joi
```

### Intalação do Bcrypted

Vai ser utilizado para a criptografia das senhas dos usuários

Passo 1: Instalar a biblioteca

```shell
  npm i bcryptjs
```

Passo 2: Instalar a tipagem da biblioteca

```shell
  npm i -D @types/bcryptjs
```

### Instalação do JWT

Será utilizada para gerar o token de autenticação para o usuário

Passo 1: Instalar a biblioteca

```shell
  npm i jsonwebtoken
```

Passo 1: Instalar os tipos da biblioteca

```shell
  npm i -D @types/jsonwebtoken
```

### Instalação do Multer

Seu objetivo é o funcionamento dos uploads da aplicação.

Passo 1: Instalar a biblioteca

```shell
  npm i multer
```

Passo 1: Instalar os tipos da biblioteca

```shell
  npm i -D @types/multer
```

### Instalação do Date-fns

Serve para a manipulação de data e hora, com objetivo de verificar se o token ainda está valido.

```shell
  npm i date-fns
```

### Instalação do Nodemailer

Será a biblioteca que fará as entregas via email da aplicação

Passo 1: Instalar a biblioteca

```shell
  npm i nodemailer
```

Passo 1: Instalar os tipos da biblioteca

```shell
  npm i -D @types/nodemailer
```

### Instalação do Handlebars

Servirá para a criação dos templates para estilizar os emails enviados

```shell
  npm i handlebars
```

### Instalação do Typeorm-easy-pagination

Serve para criar um objeto com paginação, sendo assim limitar a visualização, podendo percorrer a lista completa.

```shell
  npm i typeorm-pagination
```

#### Identificação de bug

A função paginate não funciona por algum motivo, e como solução, utilizei um molde, vindo da biblioteca, e apliquei uma lógica para me trazer um array de acordo com a página, e quantidade total de itens por página.

```typescript
// Função para dividir o array com base na quantidade por página
function dividirArray({
  array,
  tamanho,
}: {
  array: Customer[];
  tamanho: number;
}) {
  let resultado = [];
  for (let i = 0; i < array.length; i += tamanho) {
    resultado.push(array.slice(i, i + tamanho));
  }
  return resultado;
}

const filteredCustomers = dividirArray({
  array: customers,
  tamanho: totalPerPage,
});

const paginateCustomer = paginationObject(
  filteredCustomers[totalCurrentPage - 1], // [...] - seleciona pela página.
  totalCurrentPage,
  totalPerPage,
  totalItems,
);
```
### Instalação do Dotenv

Servirá para configura as variáveis de ambiente do projeto

```shell
  npm i dotenv
```
