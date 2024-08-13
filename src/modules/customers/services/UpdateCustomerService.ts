import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, email, name }:IRequest):Promise<Customer> {
    const customer = await CustomerRepository.findById(id);

    if (!customer) throw new AppError('User not found');

    const customerExists = await CustomerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email')
    }

    customer.email = email;
    customer.name = name;

    await CustomerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
