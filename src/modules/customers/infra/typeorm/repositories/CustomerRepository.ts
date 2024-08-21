import { AppDataSource } from '@shared/infra/typeorm';
import Customer from '../entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

export const CustomerRepository = AppDataSource.getRepository(Customer).extend({
  async findByName(name: string): Promise<Customer | null> {
    const customer = await CustomerRepository.findOne({
      where: {
        name,
      },
    });
    return customer;
  },

  async findById(id: string): Promise<Customer | null> {
    const customer = await CustomerRepository.findOne({
      where: {
        id,
      },
    });
    return customer;
  },

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await CustomerRepository.findOne({
      where: {
        email,
      },
    });
    return customer;
  },
} as ICustomersRepository);
