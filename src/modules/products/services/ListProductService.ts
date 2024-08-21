import RedisCache from "@shared/cache/RedisCache";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

class ListProductService {
  public async execute():Promise<Product[]> {

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST')

    if (!products) {
      products = await ProductRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
