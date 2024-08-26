import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

class UpdateProfileService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    user_id,
    email,
    name,
    old_password,
    password,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user.id) {
      throw new AppError('There is already one user with this email');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    } else if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) throw new AppError('Old password does not match.');

      user.password = await hash(password, 8);
    }

    user.email = email;
    user.name = name;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
