import 'reflect-metadata';
import { FakeCustomerRepository } from '../domain/repositories/fakes/fakeCustumersRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';
import ShowCustomerService from './ShowCustomerService';
import Customer from '../infra/typeorm/entities/Customer';

describe('ShowCustomer', () => {
  it('must list all existing Customers', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const showCustomer = new ShowCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Willian Katz',
      email: 'teste@teste.com',
    });

    const listCustomers = await showCustomer.execute({
      id: customer.id,
    });

    expect(listCustomers);
  });

  it('should not find the specified user', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const showCustomer = new ShowCustomerService(fakeCustomerRepository);

    expect(
      showCustomer.execute({
        id: 'f8afa1a6-ca23-4a82-a1b5-9ca521ffaeed',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
