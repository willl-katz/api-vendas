import { AppDataSource } from '@shared/infra/typeorm';
import UserToken from '../entities/UserToken';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { IUserToken } from '@modules/users/domain/models/IUserToken';
import { Repository } from 'typeorm';

export class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserToken);
  }

  async findByToken(token: string): Promise<IUserToken | null> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }

  async generate(user_id: string): Promise<IUserToken> {
    const userToken = await this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
