import 'reflect-metadata';
import { FakeOrdersRepository } from '../domain/repositories/fakes/FakeOrdersRepository';
import AppError from '@shared/errors/AppError';
import CreateOrderService from './CreateOrderService';
import { FakeCustomerRepository } from '@modules/customers/domain/repositories/fakes/fakeCustumersRepository';
import { FakeProductRepository } from '@modules/products/domain/repositories/fakes/fakeProductsRepository';
import { v4 as uuidv4 } from 'uuid';
import { IProduct } from '@modules/products/domain/models/IProduct';

describe('CreateOrder', () => {
  it('should return the order', async () => {
    const fakeOrderRepository = new FakeOrdersRepository();
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeProductRepository = new FakeProductRepository();

    const createOrder = new CreateOrderService(
      fakeOrderRepository,
      fakeCustomerRepository,
      fakeProductRepository,
    );

    await fakeCustomerRepository.create({
      email: 'testeCustomer@gmail.com',
      name: 'Willian Katz Customer'
    })

    // Criando 4 clientes
    for (let i = 0; i < 4; i++) {
      await fakeProductRepository.create({
        name: `Book ${i + 1}`,
        price: 200,
        quantity: 50
      })
    }

    const customer = await fakeCustomerRepository.findByEmail(
      'testeCustomer@gmail.com',
    );
    const products = await fakeProductRepository.find()

    const order = await createOrder.execute({
      customer_id: customer!.id,
      products: products,
    });

    expect(order);
  });

  it('should return an error for not finding the client', async () => {
    const fakeOrderRepository = new FakeOrdersRepository();
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeProductRepository = new FakeProductRepository();

    const createOrder = new CreateOrderService(
      fakeOrderRepository,
      fakeCustomerRepository,
      fakeProductRepository,
    );

    await fakeCustomerRepository.create({
      email: 'testeCustomer@gmail.com',
      name: 'Willian Katz Customer',
    });

    // Criando 4 clientes
    for (let i = 0; i < 4; i++) {
      await fakeProductRepository.create({
        name: `Book ${i + 1}`,
        price: 200,
        quantity: 50,
      });
    }

    const products = await fakeProductRepository.find();

    expect(
      createOrder.execute({
        customer_id: '0483b144-b454-4962-a879-440710302bd7',
        products: products,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error for having a product that does not exist', async () => {
    const fakeOrderRepository = new FakeOrdersRepository();
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeProductRepository = new FakeProductRepository();

    const createOrder = new CreateOrderService(
      fakeOrderRepository,
      fakeCustomerRepository,
      fakeProductRepository,
    );

    await fakeCustomerRepository.create({
      email: 'testeCustomer@gmail.com',
      name: 'Willian Katz Customer',
    });

    // Criando 4 clientes
    for (let i = 0; i < 4; i++) {
      await fakeProductRepository.create({
        name: `Book ${i + 1}`,
        price: 200,
        quantity: 50,
      });
    }

    const customer = await fakeCustomerRepository.findByEmail(
      'testeCustomer@gmail.com',
    );
    const products = await fakeProductRepository.find();

    const newProduct: IProduct = {
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
      name: 'Book not found',
      order_products: [],
      price: 5000,
      quantity: 3000,
    };
    const listErrorProducts = [...products, newProduct];

    expect(
      createOrder.execute({
        customer_id: customer!.id,
        products: listErrorProducts,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error because there are no products in the product list', async () => {
    const fakeOrderRepository = new FakeOrdersRepository();
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeProductRepository = new FakeProductRepository();

    const createOrder = new CreateOrderService(
      fakeOrderRepository,
      fakeCustomerRepository,
      fakeProductRepository,
    );

    await fakeCustomerRepository.create({
      email: 'testeCustomer@gmail.com',
      name: 'Willian Katz Customer',
    });

    const customer = await fakeCustomerRepository.findByEmail(
      'testeCustomer@gmail.com',
    );

    const newProduct: IProduct = {
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
      name: 'Book not found',
      order_products: [],
      price: 5000,
      quantity: 3000,
    };
    const listErrorProducts = [newProduct];

    expect(
      createOrder.execute({
        customer_id: customer!.id,
        products: listErrorProducts,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an error for having products that exceed the total stock quantity of the product', async () => {
    const fakeOrderRepository = new FakeOrdersRepository();
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeProductRepository = new FakeProductRepository();

    const createOrder = new CreateOrderService(
      fakeOrderRepository,
      fakeCustomerRepository,
      fakeProductRepository,
    );

    // Criando um cliente fictício
    await fakeCustomerRepository.create({
      email: 'testeCustomer@gmail.com',
      name: 'Willian Katz Customer',
    });

    // Criando 4 produtos fictícios com quantidades iniciais de 50
    for (let i = 0; i < 4; i++) {
      await fakeProductRepository.create({
        name: `Book ${i + 2}`,
        price: 200,
        quantity: 50,
      });
    }

    // Obtendo o cliente criado
    const customer = await fakeCustomerRepository.findByEmail(
      'testeCustomer@gmail.com',
    );

    // Obtendo a lista de produtos
    const originalProducts = await fakeProductRepository.find();

    // Criando uma cópia modificada da lista de produtos
    const modifiedProducts = originalProducts.map((item, index) => {
      if (index === 1) {
        // Substitua o valor da propriedade 'quantity' para 100
        return { ...item, quantity: 100 };
      }
      // Mantenha os valores dos outros itens inalterados
      return item;
    });

    // Esperando que a execução do serviço retorne um erro
    await expect(
      createOrder.execute({
        customer_id: customer!.id,
        products: modifiedProducts,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
