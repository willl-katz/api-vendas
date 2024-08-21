import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { IResetPassword } from '../domain/models/IResetPassword';

class ResetPasswordService {
  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await UserTokensRepository.findByToken(token);

    if (!userToken) throw new AppError('User Token does not exists.');

    const user = await UsersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User does not exists.');

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired.');

    const hashedPassword = await hash(password, 8);
    user.password = hashedPassword;

    await UsersRepository.save(user);
  }
}

export default ResetPasswordService;
