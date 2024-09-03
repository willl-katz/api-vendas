import 'reflect-metadata';
import { FakeProductRepository } from '../domain/repositories/fakes/fakeProductsRepository';
import AppError from '@shared/errors/AppError';
import CreateProductService from './CreateProductService';
import ListProductService from './ListProductService';

describe('ListProduct', () => {
  it('should retrieve products from cache or database', async () => {
    const fakeProductRepository = new FakeProductRepository();
    // Crie um mock para o RedisCache
    const mockRedisCache = {
      recover: jest.fn(),
      save: jest.fn(),
    };

    // Crie uma instância do ListProductService usando o mock do RedisCache
    const listProduct = new ListProductService(
      fakeProductRepository,
      mockRedisCache as any,
    );

    // Simule o cenário em que não há produtos no cache
    mockRedisCache.recover.mockResolvedValueOnce(null);

    // Simule a busca de produtos no banco de dados
    const createProduct = new CreateProductService(fakeProductRepository);
    for (let i = 2; i < 6; i++) {
      await createProduct.execute({
        name: `Book 2${i}`,
        price: 400,
        quantity: 30,
      });
    }

    const provisionalListProducts = await fakeProductRepository.find();
    mockRedisCache.save.mockResolvedValueOnce(provisionalListProducts);

    // Execute a função
    const products = await listProduct.execute();

    // Verifique se os métodos do RedisCache foram chamados corretamente
    expect(mockRedisCache.recover).toHaveBeenCalledWith(
      'api-vendas-PRODUCT_LIST',
    );
    expect(mockRedisCache.save).toHaveBeenCalledWith(
      'api-vendas-PRODUCT_LIST',
      provisionalListProducts,
    );

    // Verifique se os produtos retornados são os esperados
    expect(products)
  });
});
