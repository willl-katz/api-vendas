import {
  ICustomersRepository,
  IReturnProsListCustomers,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { v4 as uuidv4 } from 'uuid';

export class FakeCustomerRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: ICustomer): Promise<void> {
    Object.assign(this.customers, customer);
  }

  public async remove(customer: ICustomer): Promise<void> {
    // Adicione o cliente à lista (se necessário)
    this.customers.push(customer);

    // Encontre o índice do cliente com base no ID
    const indexToRemove = this.customers.findIndex(
      item => item.id === customer.id,
    );

    if (indexToRemove !== -1) {
      // Remova o cliente da lista usando splice
      // this.customers.splice(indexToRemove, 1);
      // OU, se preferir criar uma nova lista sem o cliente:
      this.customers = this.customers.filter(
        item => item.id !== customer.id,
      );
    } else {
      throw Error();
    }
  }

  public async propertiesPagination(): Promise<IReturnProsListCustomers> {
    const customers = await this.customers;
    const totalItems = (await this.customers.length) + 1;

    return {
      countListCustomers: totalItems,
      listCustomers: customers,
    };
  }

  public async findOne(id: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.id === id);
    if (customer === undefined) return null;
    return customer;
  }

  async findByName(name: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.name === name);
    if (customer === undefined) return null;
    return customer;
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.id === id);
    if (customer === undefined) return null;
    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.email === email);
    if (!customer) return null;
    return customer;
  }
}
