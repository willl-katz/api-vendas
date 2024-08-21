import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1723131038647 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      // Tabela Product
      name: 'products',
      columns: [
        // id
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        // name
        {
          name: 'name',
          type: 'varchar',
        },
        // price
        {
          name: 'price',
          type: 'decimal',
          precision: 10,
          scale: 2,
        },
        // quantity
        {
          name: 'quantity',
          type: 'int',
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
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }

}
