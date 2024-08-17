import Customer from '@modules/customers/typeorm/entities/Customer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Aqui podemos ter vários pedidos para cada 1 cliente, referenciado pela coluna 'customer_id'.
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  // Aqui podemos ter 1 pedido para muitos 'OrdersProducts'.
  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true, // Quando criar uma order, todos os ordersProducts relacionados serão salvos automaticamente.
  })
  order_products!: OrdersProducts[];

  @CreateDateColumn()
  created_at!: Date;

  @CreateDateColumn()
  updated_at!: Date;
}

export default Order;
