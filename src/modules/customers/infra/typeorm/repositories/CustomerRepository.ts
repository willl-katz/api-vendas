import { AppDataSource } from '@shared/infra/typeorm';
import Customer from '../entities/Customer';
import { ICustomersRepository, IReturnProsListCustomers } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { Repository } from 'typeorm';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';

export class CustomerRepository implements ICustomersRepository {
  private ormRepository: Repository<ICustomer>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: ICustomer): Promise<void> {
    await this.ormRepository.save(customer);
  }

  public async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async propertiesPagination(): Promise<IReturnProsListCustomers> {
    const customers = await this.ormRepository.find();
    const totalItems = await this.ormRepository.count();

    return {
      countListCustomers: totalItems,
      listCustomers: customers,
    };
  }

  public async findOne(id: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  async findByName(name: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return customer;
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return customer;
  }
};
