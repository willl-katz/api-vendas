import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface IReturnProsListCustomers {
  listCustomers: ICustomer[];
  countListCustomers: number;
}
export interface ICustomersRepository {
  save(customer: ICustomer): Promise<void>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
  findByName(name: string): Promise<ICustomer | null>;
  findById(id: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  findOne(id: string): Promise<ICustomer | null>;
  propertiesPagination(): Promise<IReturnProsListCustomers>;
}
