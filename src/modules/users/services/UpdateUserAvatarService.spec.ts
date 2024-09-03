import { FakeUsersRepository } from './../domain/repositories/fakes/FakeUsersRepository';
import 'reflect-metadata'
import UpdateUserAvatarService from './UpdateUserAvatarService';
import { hash } from 'bcryptjs';
import FakeDiskStorageProvider from '../domain/repositories/fakes/FakeDiskStorageProvider';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should update the user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeDiskStorageProvider = new FakeDiskStorageProvider;
    const updateAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorageProvider,
    );

    const rawPassword = 'testpassword';
    const hashedPassword = await hash(rawPassword, 8);
    const { id } = await fakeUsersRepository.createAvatarExists({
      email: 'teste9890@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    const user = await updateAvatar.execute({
      avatarFilename: 'avatar-teste',
      user_id: id,
    });

    expect(user.avatar).toBe('avatar-teste');
  });

  it('should not find the user with the specified id', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();
    const updateAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeDiskStorageProvider,
    );

    const rawPassword = 'testpassword';
    const hashedPassword = await hash(rawPassword, 8);
    const { id, avatar } = await fakeUsersRepository.create({
      email: 'teste9890@teste.com',
      name: 'Conta Teste',
      password: hashedPassword,
    });

    expect(
      updateAvatar.execute({
        avatarFilename: 'avatar-teste',
        user_id: '3cbcb30a-89ff-4338-b8e7-98c671de0057',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should find an existing avatar, delete it and replace it with the new one.', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const fakeDiskStorageProvider = new FakeDiskStorageProvider();
  //   const updateAvatar = new UpdateUserAvatarService(
  //     fakeUsersRepository,
  //     fakeDiskStorageProvider,
  //   );

  //   const rawPassword = 'testpassword';
  //   const hashedPassword = await hash(rawPassword, 8);
  //   const { id } = await fakeUsersRepository.createAvatarExists({
  //     email: 'teste9548@teste.com',
  //     name: 'Conta Teste',
  //     password: hashedPassword,
  //   });

  //   expect(
  //     updateAvatar.execute({
  //       avatarFilename: 'avatar-teste',
  //       user_id: id,
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
})
