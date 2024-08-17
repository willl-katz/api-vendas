import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrdersProducts1723592973418 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_products',
        columns: [
          // id
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
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
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders_products');
  }

}
