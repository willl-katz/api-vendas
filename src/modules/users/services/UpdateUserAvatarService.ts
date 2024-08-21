import AppError from "@shared/errors/AppError";
import DiskStorageProvider from "@shared/storage/DiskStorageProvider";
import User from "../infra/typeorm/entities/User";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository";
import { IUpdateUser } from "../domain/models/IUpdateUser";

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: IUpdateUser): Promise<User> {
    const user = await UsersRepository.findById(user_id);
    const storageProvider = new DiskStorageProvider();

    if (!user) {
      throw new AppError('User not found');
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
