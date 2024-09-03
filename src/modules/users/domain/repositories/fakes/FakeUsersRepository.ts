import { AppDataSource } from '@shared/infra/typeorm';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { Repository } from 'typeorm';
import { IUser } from '@modules/users/domain/models/IUser';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { v4 as uuidv4 } from 'uuid';

export class FakeUsersRepository implements IUserRepository {
  private users: IUser[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = {
      id: uuidv4(),
      name,
      email,
      password,
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  public async createAvatarExists({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = {
      id: uuidv4(),
      name,
      email,
      password,
      avatar: 'avatar-teste-exists',
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  public async save(user: IUser): Promise<void> {
    await this.users.push(user);
  }

  public async find(): Promise<IUser[]> {
    const users = await this.users;
    return users;
  }

  async findByName(name: string): Promise<IUser | null> {
    const user = await this.users.find(user => user.name === name);
    if (!user) return null;
    return user;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.users.find(user => user.id === id);
    if (!user) return null;
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.users.find(user => user.email === email);
    if (!user) return null;
    return user;
  }
}
