import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository";
import User from "../infra/typeorm/entities/User";
import { ICreateUser } from "../domain/models/ICreateUser";

class CreateUserService {
  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await UsersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already user.');
    }

    const hashedPassword = await hash(password, 8);

    const user = UsersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await UsersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
