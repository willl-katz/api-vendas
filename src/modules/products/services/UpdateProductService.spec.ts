import 'reflect-metadata';
import { FakeProductRepository } from '../domain/repositories/fakes/fakeProductsRepository';
import AppError from '@shared/errors/AppError';
import CreateProductService from './CreateProductService';
import UpdateProductService from './UpdateProductService';

describe('UpdateProduct', () => {
  it('should update the specified product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    // Crie um mock para o RedisCache
    const mockRedisCache = {
      invalidate: jest.fn(),
    };

    const updateProduct = new UpdateProductService(
      fakeProductRepository,
      mockRedisCache as any,
    );

    const { id } = await createProduct.execute({
      name: 'Book 21',
      price: 400,
      quantity: 30,
    });

    // Simule o cenário em que não há produtos no cache
    mockRedisCache.invalidate.mockResolvedValueOnce(null);

    const product = await updateProduct.execute({
      id,
      name: 'Book 23',
      price: 200,
      quantity: 60,
    });

    // Verifique se os métodos do RedisCache foram chamados corretamente
    expect(mockRedisCache.invalidate).toHaveBeenCalledWith(
      'api-vendas-PRODUCT_LIST',
    );

    // Verifique se os produtos retornados são os esperados
    expect(product);
  });

  it('should not find the specified product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    // Crie um mock para o RedisCache
    const mockRedisCache = {
      invalidate: jest.fn(),
    };

    const updateProduct = new UpdateProductService(
      fakeProductRepository,
      mockRedisCache as any,
    );

    const { id, name } = await createProduct.execute({
      name: 'Book 21',
      price: 400,
      quantity: 30,
    });

    expect(
      updateProduct.execute({
        id: 'abdd75e8-7309-43e8-be61-340e866a24e3',
        name,
        price: 200,
        quantity: 60,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update the product, as there is already another product with the name specified for the product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProduct = new CreateProductService(fakeProductRepository);

    // Crie um mock para o RedisCache
    const mockRedisCache = {
      invalidate: jest.fn(),
    };

    const updateProduct = new UpdateProductService(
      fakeProductRepository,
      mockRedisCache as any,
    );

    await createProduct.execute({
      name: 'Book 22',
      price: 400,
      quantity: 30,
    });

    const { id, name } = await createProduct.execute({
      name: 'Book 21',
      price: 400,
      quantity: 30,
    });

    expect(
      updateProduct.execute({
        id,
        name: 'Book 22',
        price: 200,
        quantity: 60,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
