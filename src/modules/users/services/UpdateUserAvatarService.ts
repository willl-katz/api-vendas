import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/storage/DiskStorageProvider';
import { IUpdateUser } from '../domain/models/IUpdateUser';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

class UpdateUserAvatarService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IUpdateUser): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);
    const storageProvider = new DiskStorageProvider();

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      /*
      --- Old line of code ---

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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
