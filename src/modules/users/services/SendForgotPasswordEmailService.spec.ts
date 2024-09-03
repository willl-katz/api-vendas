import 'reflect-metadata';
import { FakeUsersRepository } from '../domain/repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '../domain/repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

describe('SendForgotPasswordEmail', () => {
  it('should send the email referring to the email provided for changing the password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const sendForgotPassword = new SendForgotPasswordEmailService(
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

    await sendForgotPassword.execute({
        email: user.email,
    }),

    expect(async () => {
      await fakeUsersRepository.findByEmail(user.email);
    }
    ).not.toThrow();
  });

  it('should not find the specified email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const sendForgotPassword = new SendForgotPasswordEmailService(
      fakeUserTokensRepository,
      fakeUsersRepository,
    );

    expect(
      sendForgotPassword.execute({
        email: 'teste2024@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
