import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  constructor(private productRepository: IProductsRepository) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productRepository.findByName(name);

    // Condição para gerar um erro caso já exista um produto com tal nome.
    if (productExists && name !== product.name) {
      throw new AppError('There is already a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
