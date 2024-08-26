import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import { ISearchByIdOrder } from '../domain/models/ISearchByIdOrder';
import { IOrder } from '../domain/models/IOrder';
import { IOrdersProductsRepository } from '../domain/repositories/IOrdersRepository';

class ShowOrderService {
  constructor(private ordersRepository: IOrdersProductsRepository) { }

  public async execute({ id }: ISearchByIdOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findById(id);

    // Condição para gerar um erro caso já exista um produto com tal nome.
    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
