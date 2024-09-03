import 'reflect-metadata'
import { FakeUsersRepository } from '../domain/repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService';
import { TestContext } from 'node:test';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should create a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      email: 'teste@TestContext.com',
      name: 'teste',
      password: 'testpassword'
    });

    expect(user).not.toBeNull
  })

  it('should find the past email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const { email, name, password } = await createUser.execute({
      email: 'teste@test.com',
      name: 'teste',
      password: 'testpassword',
    });

    expect(
      createUser.execute({
      email,
      name,
      password,
    })
    ).rejects.toBeInstanceOf(AppError);
  });
})
