import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { ISearchByIdProduct } from '../domain/models/ISearchByIdProduct';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

class DeleteProductService {
  constructor(private productRepository: IProductsRepository) {}

  public async execute({ id }: ISearchByIdProduct): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productRepository.remove(product);
  }
}

export default DeleteProductService;
