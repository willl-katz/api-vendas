import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1723232524770 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          // id
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          // name
          {
            name: 'name',
            type: 'varchar',
          },
          // email
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          // password
          {
            name: 'password',
            type: 'varchar'
          },
          // avatar
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true
          },
          // created_at
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          // updated_at
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
