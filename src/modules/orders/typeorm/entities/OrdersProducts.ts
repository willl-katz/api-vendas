import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Order from "./Order";
import Product from "@modules/products/typeorm/entities/Product";

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Aqui podemos ter vários OrdersProducts para cada 1 pedido, referenciado pela coluna 'order_id'.
  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  // Aqui podemos ter vários OrdersProducts para cada 1 produto, referenciado pela coluna 'product_id'.
  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column()
  order_id!: string;

  @Column()
  product_id!: string;

  @Column('decimal')
  price!: number;

  @Column('int')
  quantity!: number;

  @CreateDateColumn()
  created_at!: Date;

  @CreateDateColumn()
  updated_at!: Date;
}

export default OrdersProducts;
