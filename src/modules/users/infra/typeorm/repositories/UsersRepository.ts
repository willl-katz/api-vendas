import { AppDataSource } from '@shared/infra/typeorm';
import User from '../entities/User';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { Repository } from 'typeorm';
import { IUser } from '@modules/users/domain/models/IUser';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';

export class UsersRepository implements IUserRepository {
  private ormRepository: Repository<IUser>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = await this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: IUser): Promise<void> {
    await this.ormRepository.save(user);
  }

  public async find(): Promise<IUser[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  async findByName(name: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
