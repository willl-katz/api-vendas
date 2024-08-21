import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomerRepository';
import Customer from '../infra/typeorm/entities/Customer';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
class UpdateCustomerService {
  public async execute({
    id,
    email,
    name,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await CustomerRepository.findById(id);

    if (!customer) throw new AppError('User not found');

    const customerExists = await CustomerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email');
    }

    customer.email = email;
    customer.name = name;

    await CustomerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
