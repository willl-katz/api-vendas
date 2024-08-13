import { AppDataSource } from "@shared/typeorm";
import Customer from "../entities/Customer";

export const CustomerRepository = AppDataSource.getRepository(Customer).extend({
  async findByName(name: string): Promise<Customer | null> {
    const customer = await CustomerRepository.findOne({
      where: {
        name,
      }
    })
    return customer;
  },

  async findById(id: string): Promise<Customer | null> {
    const customer = await CustomerRepository.findOne({
      where: {
        id,
      }
    })
    return customer;
  },

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await CustomerRepository.findOne({
      where: {
        email,
      }
    })
    return customer;
  }
})
