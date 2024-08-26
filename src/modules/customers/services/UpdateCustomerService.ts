import AppError from '@shared/errors/AppError';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    id,
    email,
    name,
  }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) throw new AppError('User not found');

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email');
    }

    customer.email = email;
    customer.name = name;

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
