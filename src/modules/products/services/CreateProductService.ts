import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository') private productRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productRepository.findByName(name);

    // Condição para gerar um erro caso já exista um produto com tal nome.
    if (productExists) {
      throw new AppError('There is already a product with this name');
    }

    const product = await this.productRepository.create({
      name,
      price,
      quantity,
    });

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return product;
  }
}

export default CreateProductService;
