import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import {
  ICreateSessionRequest,
  ICreateSessionResponse,
} from '../domain/models/ICreateSession';

class CreateSessionService {
  public async execute({
    email,
    password,
  }: ICreateSessionRequest): Promise<ICreateSessionResponse> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (!authConfig.jwt.secret) {
      throw new AppError('Server Internal Error - Token is required.', 500);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
