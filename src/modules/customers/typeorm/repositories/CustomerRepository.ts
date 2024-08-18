import { AppDataSource } from '@shared/typeorm';
import Customer from '../entities/Customer';
import { paginate } from 'typeorm-easy-paginate';

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

  async all(): Promise<any> {
    const customer = await paginate<Customer>(Customer, {
      page: 1,
      perPage: 10,
    }).catch(err => {
      console.error(err);
    });
    return customer;
  },
});
