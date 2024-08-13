import AppError from "@shared/errors/AppError";
import { CustomerRepository } from "../typeorm/repositories/CustomerRepository";

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }:IRequest):Promise<void> {
    const customer = await CustomerRepository.findOne({
      where: {
        id
      }
    });

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await CustomerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
