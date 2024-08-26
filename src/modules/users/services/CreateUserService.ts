import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";

class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already user.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
