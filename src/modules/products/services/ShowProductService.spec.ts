import 'reflect-metadata';
import { FakeProductRepository } from '../domain/repositories/fakes/fakeProductsRepository';
import AppError from '@shared/errors/AppError';
import CreateProductService from './CreateProductService';
import ShowProductService from './ShowProductService';

describe('ShowProduct', () => {
  it('should return the specified product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const showProduct = new ShowProductService(fakeProductRepository);
    const createProduct = new CreateProductService(fakeProductRepository);

    const { id } = await createProduct.execute({
      name: 'Book 21',
      price: 400,
      quantity: 30,
    });

    const product = await showProduct.execute({
      id,
    });

    expect(product);
  });

  it('should not find the specified product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const showProduct = new ShowProductService(fakeProductRepository);

    expect(
      showProduct.execute({
        id: 'abdd75e8-7309-43e8-be61-340e866a24e3',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
