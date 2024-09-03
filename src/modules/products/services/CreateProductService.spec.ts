import 'reflect-metadata';
import { FakeProductRepository } from '../domain/repositories/fakes/fakeProductsRepository';
import CreateProductService from './CreateProductService';
import AppError from '@shared/errors/AppError';

describe('CreateProduct', () => {
  it('should create the product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    const product = await createProduct.execute({
      name: 'Book 20',
      price: 400,
      quantity: 30,
    });

    expect(product).toHaveProperty('id');
  });

  it('should find the product that already exists, and return an error', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    const product = await createProduct.execute({
      name: 'Book 22',
      price: 400,
      quantity: 30,
    });

    expect(
      createProduct.execute({
        name: product.name,
        price: 200,
        quantity: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
