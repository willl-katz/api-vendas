import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import { ISearchByIdOrder } from '../domain/models/ISearchByIdOrder';

class ShowOrderService {
  public async execute({ id }: ISearchByIdOrder): Promise<Order> {
    const order = await OrdersRepository.findById(id);

    // Condição para gerar um erro caso já exista um produto com tal nome.
    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
