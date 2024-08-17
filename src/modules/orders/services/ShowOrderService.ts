import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const order = await OrdersRepository.findById(id);

    // Condição para gerar um erro caso já exista um produto com tal nome.
    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
