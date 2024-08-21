import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { ISearchByIdProduct } from "../domain/models/ISearchByIdProduct";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

class DeleteProductService {
  public async execute({ id }: ISearchByIdProduct): Promise<void> {
    const productsRepository = ProductRepository;

    const product = await productsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new AppError('Product not found.');
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
