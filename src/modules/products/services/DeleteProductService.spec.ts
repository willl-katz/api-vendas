import 'reflect-metadata';
import { FakeProductRepository } from '../domain/repositories/fakes/fakeProductsRepository';
import AppError from '@shared/errors/AppError';
import DeleteProductService from './DeleteProductService';
import CreateProductService from './CreateProductService';

describe('DeleteProduct', () => {
  it('should delete the specified product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const deleteProduct = new DeleteProductService(fakeProductRepository);
    const createProduct = new CreateProductService(fakeProductRepository);

    const { id } = await createProduct.execute({
      name: 'Book 21',
      price: 400,
      quantity: 30,
    });

    await deleteProduct.execute({
      id,
    });

    expect(async () => {
      await fakeProductRepository.findById(id);
    }).not.toThrow();
  });

  it('should not find the product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const deleteProduct = new DeleteProductService(fakeProductRepository);

    expect(
      deleteProduct.execute({
        id: 'abdd75e8-7309-43e8-be61-340e866a24e3',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
