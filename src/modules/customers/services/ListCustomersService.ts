import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";


class ListCustomersService {
  public async execute():Promise<Customer[]> {
    const customers = CustomerRepository.find();

    return customers;
  }
}

export default ListCustomersService;
