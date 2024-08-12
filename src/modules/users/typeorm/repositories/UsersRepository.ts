import { AppDataSource } from "@shared/typeorm";
import User from "../entities/User";

export const UsersRepository = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    const user = await UsersRepository.findOne({
      where: {
        name,
      }
    })
    return user;
  },

  async findById(id: string): Promise<User | null> {
    const user = await UsersRepository.findOne({
      where: {
        id,
      }
    })
    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    const user = await UsersRepository.findOne({
      where: {
        email,
      }
    })
    return user;
  }
})
