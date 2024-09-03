import 'reflect-metadata';
import { FakeCustomerRepository } from '../domain/repositories/fakes/fakeCustumersRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';

describe('CreateCustomer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Willian Katz',
      email: 'teste@teste.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);

    await createCustomer.execute({
      name: 'Willian Katz',
      email: 'teste@teste.com',
    });

    expect(
      createCustomer.execute({
        name: 'Willian Katz',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
