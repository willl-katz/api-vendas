import { isAfter, addHours } from 'date-fns';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import AppError from "@shared/errors/AppError";
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }:IRequest):Promise<void> {
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
