import 'reflect-metadata';
import { hash } from 'bcryptjs';
import UpdateProfileService from './UpdateProfileService';
import { FakeUsersRepository } from '../domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

describe('UpdateProfile', () => {
  it('should update the specified user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUser = new UpdateProfileService(fakeUsersRepository);

    const rawPassword = 'testpassword';
    const hashedPassword = await hash(rawPassword, 8);
    const { email, id } = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    const user = await updateUser.execute({
      user_id: id,
      email,
      name: 'Conta Teste Atualizado',
      password: 'testpassword!@1990',
      old_password: rawPassword,
    });

    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
  });

  it('should not accept the old password specified', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUser = new UpdateProfileService(fakeUsersRepository);

    const rawPassword = 'testpassword';
    const hashedPassword = await hash(rawPassword, 8);
    const user = await fakeUsersRepository.create({
      email: 'teste9890@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    expect(
      updateUser.execute({
        user_id: user.id,
        email: user.email,
        name: 'Conta Teste Atualizado',
        password: 'testpassword!@1990',
        old_password: 'ijhnvidksjnbfis',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not find the user by the specified ID', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUser = new UpdateProfileService(fakeUsersRepository);

    expect(
      updateUser.execute({
        user_id: 'c2eacd0a-bb3d-42f8-b323-3d247cda2ca1',
        email: 'teste@teste.com',
        name: 'Conta Teste Atualizado',
        password: 'testpassword!@1990',
        old_password: 'testpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should find another user who is already using the specified email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUser = new UpdateProfileService(fakeUsersRepository);

    const rawPassword = 'testpassword';
    const hashedPassword = await hash(rawPassword, 8);
    const lastUser = await fakeUsersRepository.create({
      email: 'testeYesExists@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    expect(
      updateUser.execute({
        user_id: user.id,
        email: lastUser.email,
        name: 'Conta Teste Atualizado',
        password: 'testpassword!@1990',
        old_password: rawPassword,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not find the password, and also not find the old password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUser = new UpdateProfileService(fakeUsersRepository);

    const rawPassword = 'testpassword';
    const hashedPassword = await hash(rawPassword, 8);
    const user = await fakeUsersRepository.create({
      email: 'teste3123@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    expect(
      updateUser.execute({
        user_id: user.id,
        email: user.email,
        name: 'Conta Teste Atualizado',
        password: 'testpassword!@1990',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
