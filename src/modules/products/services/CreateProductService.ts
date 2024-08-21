import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import { ICreateOrder } from "../domain/models/ICreateProduct";
import Product from "../infra/typeorm/entities/Product";

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: ICreateOrder): Promise<Product> {
    const productsRepository = ProductRepository;
    const productExists = await productsRepository.findByName(name);

    // Condição para gerar um erro caso já exista um produto com tal nome.
    if (productExists) {
      throw new AppError('There is already a product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
