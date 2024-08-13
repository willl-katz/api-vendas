import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({ user_id, email, name, old_password, password }:IRequest):Promise<User> {
    const user = await UsersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const userUpdateEmail = await UsersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user.id) {
      throw new AppError('There is already one user with this email')
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.')
    } else if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) throw new AppError('Old password does not match.')

      user.password = await hash(password, 8)
    }

    user.email = email
    user.name = name

    await UsersRepository.save(user)

    return user;
  }
}

export default UpdateProfileService;
