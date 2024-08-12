import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5532,
  username: "postgres",
  password: "docker",
  database: "apivendas",
  migrations: [
    "src/shared/typeorm/migrations/*.ts"
  ],
  entities: [
    "./src/modules/**/typeorm/entities/*.ts"
  ]
})

// Irá inicializa o BD, e dar uma resposta
AppDataSource.initialize().then(() => {
    console.log("Data Source inicializado com sucesso!");
})
.catch((error) => console.error("Erro ao inicializar Data Source", error));
