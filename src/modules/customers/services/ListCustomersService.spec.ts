import 'reflect-metadata';
import { FakeCustomerRepository } from '../domain/repositories/fakes/fakeCustumersRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';
import ListCustomersService from './ListCustomersService';

describe('ListCustomer', () => {
  it('should be able to list customers', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const createCustomer = new CreateCustomerService(fakeCustomerRepository);

    // Criando 4 clientes
    for (let i = 0; i < 4; i++) {
      await createCustomer.execute({
        name: 'Willian Katz',
        email: `teste${i}@teste.com`,
      });
    }

    // Definindo as propriedades esperadas para a paginação
    const totalCurrentPage = 1;
    const totalPerPage = 2;

    const listCustomers = new ListCustomersService(fakeCustomerRepository);

    // Executando a listagem
    const paginateCustomer = await listCustomers.execute({
      totalCurrentPage,
      totalPerPage,
    });

    // Verificando se a lista de clientes foi retornada
    expect(paginateCustomer).toHaveProperty('content');
    expect(paginateCustomer.content).toHaveLength(totalPerPage); // Espera-se que haja 2 clientes por página
  });

  it('should not list if some of the passed values ​​are negative', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const createCustomer = new CreateCustomerService(fakeCustomerRepository);

    // Criando 4 clientes
    for (let i = 0; i < 4; i++) {
      await createCustomer.execute({
        name: 'Willian Katz',
        email: `teste${i}@teste.com`,
      });
    }

    // Definindo as propriedades esperadas para a paginação
    const totalCurrentPage = 1;
    const totalPerPage = -2;

    const listCustomers = new ListCustomersService(fakeCustomerRepository);

    expect(
      listCustomers.execute({
        totalCurrentPage,
        totalPerPage,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
