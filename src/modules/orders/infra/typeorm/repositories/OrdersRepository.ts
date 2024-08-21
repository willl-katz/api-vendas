import Order from '../entities/Order';
import { AppDataSource } from '@shared/infra/typeorm';
import {
  IOrdersProductsRepository,
  ICreateOrderRequest,
} from '@modules/orders/domain/repositories/IOrdersRepository';

export const OrdersRepository = AppDataSource.getRepository(Order).extend({
  async findById(id: string): Promise<Order | null> {
    const order = await OrdersRepository.findOne({
      where: {
        id,
      },
      relations: ['order_products', 'customer'],
    });

    return order;
  },

  async createOrder({
    customer,
    products,
  }: ICreateOrderRequest): Promise<Order> {
    const order = await OrdersRepository.create({
      customer,
      order_products: products,
    });

    await OrdersRepository.save(order);

    return order;
  },
} as IOrdersProductsRepository);
