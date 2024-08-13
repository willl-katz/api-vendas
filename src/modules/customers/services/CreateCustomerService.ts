import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import Customer from "../typeorm/entities/Customer";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }:IRequest):Promise<Customer> {
    const emailExists = await CustomerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already user.');
    }

    const customer = CustomerRepository.create({
      name,
      email
    })

    await CustomerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
