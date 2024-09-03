import RedisCache from '@shared/cache/RedisCache';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository') private productRepository: IProductsRepository,
    @inject('RedisCache') private redisCache: RedisCache,
  ) {}

  public async execute(): Promise<IProduct[]> {
    const redisCache = this.redisCache;

    let products = await redisCache.recover<IProduct[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
