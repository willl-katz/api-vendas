import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }:IRequest):Promise<Product> {
    const productsRepository = ProductRepository;

    const product = await productsRepository.findOne({
      where: {
        id
      }
    });

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(name);

    // Condição para gerar um erro caso já exista um produto com tal nome.
    if (productExists && name !== product.name) {
      throw new AppError('There is already a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
