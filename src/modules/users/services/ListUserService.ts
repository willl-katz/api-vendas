import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

class ListUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute(): Promise<IUser[]> {
    const user = this.usersRepository.find();

    return user;
  }
}

export default ListUserService;
