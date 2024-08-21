import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository";
import User from "../infra/typeorm/entities/User";
import { IShowProfile } from "../domain/models/IShowProfile";

class ShowProfileService {
  public async execute({ user_id }: IShowProfile): Promise<User> {
    const user = await UsersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    return user;
  }
}

export default ShowProfileService;
