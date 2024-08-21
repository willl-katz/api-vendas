import { DataSource } from 'typeorm';

const pathOriginMigrations =
  process.env.STATE_PROJECT === 'production'
    ? './dist/shared/infra/typeorm/migrations/*.js'
    : './src/shared/infra/typeorm/migrations/*.ts';
const pathOriginEntities =
  process.env.STATE_PROJECT === 'production'
    ? './dist/modules/**/infra/typeorm/entities/*.js'
    : './src/modules/**/infra/typeorm/entities/*.ts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5532,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  migrations: [pathOriginMigrations],
  entities: [pathOriginEntities],
});

// Irá inicializa o BD, e dar uma resposta
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source inicializado com sucesso!');
  })
  .catch(error => console.error('Erro ao inicializar Data Source', error));
