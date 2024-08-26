import RedisCache from '@shared/cache/RedisCache';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

class ListProductService {
  constructor(private productRepository: IProductsRepository) {}

  public async execute(): Promise<IProduct[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<IProduct[]>(
      'api-vedas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
