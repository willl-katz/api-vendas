import Order from '../entities/Order';
import { AppDataSource } from '@shared/infra/typeorm';
import {
  ICreateOrderRequest,
  IOrdersProductsRepository,
} from '@modules/orders/domain/repositories/IOrdersRepository';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { Repository } from 'typeorm';

export class OrdersRepository implements IOrdersProductsRepository {
  private ormRepository: Repository<IOrder>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order);
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  async createOrder({
    customer,
    products,
  }: ICreateOrderRequest): Promise<Order> {
    const order = await this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}
