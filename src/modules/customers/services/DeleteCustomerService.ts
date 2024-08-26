import AppError from '@shared/errors/AppError';
import { ISearchByIdCustomer } from '../domain/models/ISearchByIdCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

class DeleteCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute({ id }: ISearchByIdCustomer): Promise<void> {
    const customer = await this.customersRepository.findOne(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
