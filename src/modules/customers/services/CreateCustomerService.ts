import AppError from "@shared/errors/AppError";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { CustomerRepository } from "../infra/typeorm/repositories/CustomerRepository";
import Customer from "../infra/typeorm/entities/Customer";

class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await CustomerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already user.');
    }

    const customer = CustomerRepository.create({
      name,
      email,
    });

    await CustomerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
