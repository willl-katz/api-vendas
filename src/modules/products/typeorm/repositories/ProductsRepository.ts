import { In } from 'typeorm';
import Product from '../entities/Product';
import { AppDataSource } from '@shared/typeorm';

interface IFindProducts {
  id: string;
}

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = ProductRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  },

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = await ProductRepository.find({
      where: {
        id: In(productIds),
      },
    });
    return existsProducts;
  },
});
