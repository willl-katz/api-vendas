import 'reflect-metadata';
import { FakeUsersRepository } from '../domain/repositories/fakes/FakeUsersRepository';
import CreateSessionService from './CreateSessionService';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

describe('CreateSession', () => {
  it('should create the session', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createSession = new CreateSessionService(fakeUsersRepository);
    const rawPassword = 'testpassword';

    const hashedPassword = await hash(rawPassword, 8);

    // Crie um usuário de teste
    const { email } = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    // Execute a função para criar a sessão
    const session = await createSession.execute({
      email,
      password: rawPassword,
    });

    // Verifique se a sessão retornada contém os campos esperados
    expect(session).toHaveProperty('user');
    expect(session).toHaveProperty('token');
    expect(session.user).toHaveProperty('email');
  });

  it('should not find the specified email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createSession = new CreateSessionService(fakeUsersRepository);
    const rawPassword = 'testpassword';

    const hashedPassword = await hash(rawPassword, 8);

    // Crie um usuário de teste
    await fakeUsersRepository.create({
      email: 'teste@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    expect(
      createSession.execute({
        email: 'testenaofunciona@teste.com',
        password: rawPassword,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an error for incorrect password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createSession = new CreateSessionService(fakeUsersRepository);
    const rawPassword = '31231313123';

    const hashedPassword = await hash(rawPassword, 8);

    // Crie um usuário de teste
    await fakeUsersRepository.create({
      email: 'teste30@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    // Tente criar uma sessão com uma senha incorreta
    await expect(
      createSession.execute({
        email: 'teste30@teste.com',
        password: 'senha_incorreta',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
