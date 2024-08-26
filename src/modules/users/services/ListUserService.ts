import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUserRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const user = this.usersRepository.find();

    return user;
  }
}

export default ListUserService;
