import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';
import Customer from '../infra/typeorm/entities/Customer';
import { ISearchByIdCustomer } from '../domain/models/ISearchByIdCustomer';

class ShowCustomerService {
  public async execute({ id }: ISearchByIdCustomer): Promise<Customer> {
    const customer = await CustomerRepository.findById(id);

    if (!customer) throw new AppError('Customer not found');

    return customer;
  }
}

export default ShowCustomerService;
