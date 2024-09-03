import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { IUserToken } from '@modules/users/domain/models/IUserToken';
import { v4 as uuidv4 } from 'uuid';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { subDays } from 'date-fns';

export class FakeUserTokensRepository implements IUserTokensRepository {
  private usersToken: UserToken[] = [];

  async findByToken(token: string): Promise<IUserToken | null> {
    const userToken = await this.usersToken.find(item => item.token === token);
    if (!userToken) return null;
    return userToken;
  }

  async generate(user_id: string): Promise<IUserToken> {
    const userToken: IUserToken = {
      user_id,
      id: uuidv4(),
      token: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.usersToken.push(userToken);

    return userToken;
  }

  async generateExpired(user_id: string): Promise<IUserToken> {
    const userToken: IUserToken = {
      user_id,
      id: uuidv4(),
      token: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    userToken.created_at = subDays(userToken.created_at, 3);

    this.usersToken.push(userToken);

    return userToken;
  }
}
