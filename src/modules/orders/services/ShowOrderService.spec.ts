import { FakeCustomerRepository } from "@modules/customers/domain/repositories/fakes/fakeCustumersRepository";
import { FakeOrdersRepository } from "../domain/repositories/fakes/FakeOrdersRepository";
import { FakeProductRepository } from "@modules/products/domain/repositories/fakes/fakeProductsRepository";
import ShowOrderService from "./ShowOrderService";
import CreateOrderService from "./CreateOrderService";
import AppError from "@shared/errors/AppError";

describe('ShowOrder', () => {
  it('should show the order according to your passed id', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeProductRepository = new FakeProductRepository();

    const createOrder = new CreateOrderService(
      fakeOrdersRepository,
      fakeCustomerRepository,
      fakeProductRepository,
    );
    const showOrders = new ShowOrderService(fakeOrdersRepository);

    await fakeCustomerRepository.create({
      email: 'testeOrder@gmail.com',
      name: 'Willian Katz Order',
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
      'testeOrder@gmail.com'
    );
    const products = await fakeProductRepository.find();

    const { id } = await createOrder.execute({
      customer_id: customer!.id,
      products: products,
    });

    const order = await showOrders.execute({
      id,
    });

    expect(order);
  });

  it('should not find the order', async () => {
    const fakeOrdersRepository = new FakeOrdersRepository();
    const showOrders = new ShowOrderService(fakeOrdersRepository);

    expect(
      showOrders.execute({
        id: '5faf6478-8900-4a9a-99b3-f0f31caaeb7b',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
