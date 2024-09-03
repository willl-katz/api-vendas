import { FakeUsersRepository } from './../domain/repositories/fakes/FakeUsersRepository';
import 'reflect-metadata';
import ShowProfileService from './ShowProfileService';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

describe('ShowProfile', () => {
  it('should return the user according to the passed id', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const showUser = new ShowProfileService(fakeUsersRepository);

    const rawPassword = 'testpassword';
    const hashedPassword = await hash(rawPassword, 8);
    const { id } = await fakeUsersRepository.create({
      email: 'teste2342@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    const user = await showUser.execute({
      user_id: id,
    });

    expect(user);
  });

  it('should not find the user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const showUser = new ShowProfileService(fakeUsersRepository);

    expect(
      showUser.execute({
        user_id: 'c2eacd0a-bb3d-42f8-b323-3d247cda2ca1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
