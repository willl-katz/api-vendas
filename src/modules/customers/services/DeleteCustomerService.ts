import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';
import { ISearchByIdCustomer } from '../domain/models/ISearchByIdCustomer';

class DeleteCustomerService {
  public async execute({ id }: ISearchByIdCustomer): Promise<void> {
    const customer = await CustomerRepository.findOne({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await CustomerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
