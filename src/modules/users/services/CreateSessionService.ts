import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import {
  ICreateSessionRequest,
  ICreateSessionResponse,
} from '../domain/models/ICreateSession';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateSessionService {
  authConfig: any;
  constructor(
    @inject('UsersRepository') private productRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessionRequest): Promise<ICreateSessionResponse> {
    const user = await this.productRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    } else {
      const passwordConfirmed = await compare(password, user.password);
      if (!passwordConfirmed) {
        throw new AppError('Incorrect email/password combination.', 401);
      }
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
