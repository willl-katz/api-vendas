import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface ICustomersRepository {
  findByName(name: string): Promise<ICustomer | null>;
  findById(id: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  // create(data: ICreateCustomer): Promise<ICustomer>;
  // save(customer: ICustomer): Promise<ICustomer>;
}
