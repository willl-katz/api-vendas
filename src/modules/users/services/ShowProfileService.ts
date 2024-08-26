import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IShowProfile } from '../domain/models/IShowProfile';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

class ShowProfileService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ user_id }: IShowProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    return user;
  }
}

export default ShowProfileService;
