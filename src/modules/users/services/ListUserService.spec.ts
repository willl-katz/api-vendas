import 'reflect-metadata'
import { FakeUsersRepository } from './../domain/repositories/fakes/FakeUsersRepository';
import ListUserService from './ListUserService';

describe('ListUser', () => {
  it('should list existing users', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const listUsers = new ListUserService(fakeUsersRepository);

    const users = await listUsers.execute();

    expect(users);
  });
})
