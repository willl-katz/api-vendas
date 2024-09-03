import 'reflect-metadata';
import { FakeCustomerRepository } from '../domain/repositories/fakes/fakeCustumersRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';
import DeleteCustomerService from './DeleteCustomerService';

describe('DeleteCustomer', () => {
  it('should be able to delete a customer', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const deleteCustomer = new DeleteCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Willian Katz',
      email: 'teste@teste.com',
    });

    await deleteCustomer.execute({
      id: customer.id,
    });

    expect(async () => {
      await fakeCustomerRepository.findById(customer.id);
    }).not.toThrow();
  });

  it('should not be able to delete not exists customers', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const deleteCustomer = new DeleteCustomerService(fakeCustomerRepository);

    expect(
      deleteCustomer.execute({
        id: 'f8afa1a6-ca23-4a82-a1b5-9ca521ffaeed',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
