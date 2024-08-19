import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import path from 'path';
import uploadConfig from "@config/upload";
import fs from "fs";
import DiskStorageProvider from "@shared/storage/DiskStorageProvider";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }:IRequest):Promise<User> {
    const user = await UsersRepository.findById(user_id);
    const storageProvider = new DiskStorageProvider();

    if (!user) {
      throw new AppError('User not found')
    }

    if (user.avatar) {
      /*
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
      */

      await storageProvider.deleteFile(user.avatar);
    }

    const filename = await storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
