import {
  ICreateOrderRequest,
  IOrdersProductsRepository,
} from '@modules/orders/domain/repositories/IOrdersRepository';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { v4 as uuidv4 } from 'uuid';

export class FakeOrdersRepository implements IOrdersProductsRepository {
  private orders: IOrder[] = [];

  async findById(id: string): Promise<IOrder | null> {
    const order = this.orders.find(item => item.id === id);
    return order || null;
  }

  async createOrder({
    customer,
    products,
  }: ICreateOrderRequest): Promise<IOrder> {
    const order_id = uuidv4();
    const timestamp = new Date();
    const order: IOrder = {
      id: order_id,
      customer,
      created_at: timestamp, // Adicione a propriedade created_at
      updated_at: timestamp, // Adicione a propriedade updated_at
      order_products: products.map(product => ({
        id: uuidv4(),
        order_id,
        price: product.price,
        product_id: product.product_id,
        quantity: product.quantity,
        created_at: timestamp,
        updated_at: timestamp,
        order: {
          id: order_id,
          customer, // Aqui precisamos ajustar o tipo do customer
          order_products: [], // Defina a propriedade order_products
          created_at: timestamp,
          updated_at: timestamp,
        },
        product: {
          id: product.product_id,
          name: 'juice',
          price: product.price,
          quantity: product.quantity,
          created_at: timestamp,
          updated_at: timestamp,
          order_products: [], // Defina a propriedade order_products
        },
      })),
    };

    this.orders.push(order)

    return order;
  }
}
