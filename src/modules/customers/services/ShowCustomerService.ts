import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }:IRequest):Promise<Customer> {
    const customer = await CustomerRepository.findById(id);

    if (!customer) throw new AppError('Customer not found');

    return customer;
  }
}

export default ShowCustomerService;
