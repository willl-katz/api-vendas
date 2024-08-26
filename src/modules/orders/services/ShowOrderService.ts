import AppError from '@shared/errors/AppError';
import { ISearchByIdOrder } from '../domain/models/ISearchByIdOrder';
import { IOrder } from '../domain/models/IOrder';
import { IOrdersProductsRepository } from '../domain/repositories/IOrdersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersProductsRepository,
  ) {}

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
