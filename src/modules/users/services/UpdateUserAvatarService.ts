import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import path from 'path';
import uploadConfig from "@config/upload";
import fs from "fs";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }:IRequest):Promise<User> {
    const user = await UsersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found')
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
