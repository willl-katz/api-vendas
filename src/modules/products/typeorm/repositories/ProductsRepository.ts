import Product from '../entities/Product';
import { AppDataSource } from '@shared/typeorm';

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = ProductRepository.findOne({
      where: {
        name,
      }
    })
    return product;
  }
})

