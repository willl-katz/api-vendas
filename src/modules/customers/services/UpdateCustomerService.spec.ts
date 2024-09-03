import 'reflect-metadata';
import { FakeCustomerRepository } from '../domain/repositories/fakes/fakeCustumersRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';
import UpdateCustomerService from './UpdateCustomerService';

describe('UpdateCustomer', () => {
  it('should update Customer', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();

    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const updateCustomer = new UpdateCustomerService(fakeCustomerRepository);

    const { id, name } = await createCustomer.execute({
      name: 'Willian Katz',
      email: 'teste@teste.com',
    });

    const listCustomers = await updateCustomer.execute({
      id,
      email: 'teste5@teste.com',
      name,
    });

    expect(listCustomers);
  });

  it('should not find any Customer', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const updateCustomer = new UpdateCustomerService(fakeCustomerRepository);

    expect(
      updateCustomer.execute({
        id: 'f8afa1a6-ca23-4a82-a1b5-9ca521ffaeed',
        email: 'teste@teste.com',
        name: 'Willian Katz',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should prevent updating to an existing email', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const createCustomer = new CreateCustomerService(fakeCustomerRepository);
    const updateCustomer = new UpdateCustomerService(fakeCustomerRepository);

    // Cria um cliente com o e-mail 'teste@teste.com'
    const { id } = await createCustomer.execute({
      name: 'Willian Katz',
      email: 'teste@teste.com',
    });

    // Tenta atualizar o cliente com o mesmo e-mail
    expect(
      updateCustomer.execute({
        id,
        email: 'teste@teste.com', // Mesmo e-mail
        name: 'Willian', // Novo nome
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
