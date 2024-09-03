import 'reflect-metadata';
import { FakeUsersRepository } from '../domain/repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '../domain/repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import CreateSessionService from './CreateSessionService';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { addDays } from 'date-fns';

describe('ResetPassword', () => {
  it('should reset the user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const resetPassword = new ResetPasswordService(
      fakeUserTokensRepository,
      fakeUsersRepository,
    );
    const rawPassword = 'testpassword';

    const hashedPassword = await hash(rawPassword, 8);

    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: 'testpassword2024',
      token: userToken.token,
    });

    const userPassword = await fakeUsersRepository.findById(user.id);

    expect(userPassword?.password).not.toEqual('testpassword');
  });

  it('should not find the passed token', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const resetPassword = new ResetPasswordService(
      fakeUserTokensRepository,
      fakeUsersRepository,
    );

    expect(
      resetPassword.execute({
        password: 'testpassword2024',
        token: 'c2eacd0a-bb3d-42f8-b323-3d247cda2ca1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not find the user holding the referenced token', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const resetPassword = new ResetPasswordService(
      fakeUserTokensRepository,
      fakeUsersRepository,
    );

    const userToken = await fakeUserTokensRepository.generate(
      'c2eacd0a-bb3d-42f8-b323-3d247cda2ca1',
    );

    expect(
      resetPassword.execute({
        password: 'testpassword2024',
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should indicate that the users teken has already expired', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const resetPassword = new ResetPasswordService(
      fakeUserTokensRepository,
      fakeUsersRepository,
    );
    const rawPassword = 'testpassword';

    const hashedPassword = await hash(rawPassword, 8);

    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    const userToken = await fakeUserTokensRepository.generateExpired(user.id);

    expect(
      resetPassword.execute({
        password: 'testpassword2024',
        token: userToken.token,
      })
    ).rejects.toBeInstanceOf(AppError)
  });
});
