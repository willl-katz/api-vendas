import { AppDataSource } from "@shared/infra/typeorm";
import UserToken from "../entities/UserToken";
import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokensRepository";

export const UserTokensRepository = AppDataSource.getRepository(UserToken).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await UserTokensRepository.findOne({
      where: {
        token,
      }
    })
    return userToken;
  },

  async generate(user_id: string): Promise<UserToken> {
    const userToken = await UserTokensRepository.create({
      user_id,
    })

    await UserTokensRepository.save(userToken);

    return userToken;
  },
} as IUserTokensRepository)
