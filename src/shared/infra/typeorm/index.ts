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
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  migrations: [pathOriginMigrations],
  entities: [pathOriginEntities],
});
