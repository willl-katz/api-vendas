import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { IResetPassword } from '../domain/models/IResetPassword';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserTokensRepository')
    private usersTokensRepository: IUserTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) throw new AppError('User Token does not exists.');

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User does not exists.');

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired.');

    const hashedPassword = await hash(password, 8);
    user.password = hashedPassword;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
