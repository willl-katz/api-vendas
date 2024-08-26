import { In, Repository } from 'typeorm';
import Product from '../entities/Product';
import {
  IFindProducts,
  IProductsRepository,
} from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { AppDataSource } from '@shared/infra/typeorm';

export class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<IProduct>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const product = await this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async save(product: IProduct): Promise<void> {
    await this.ormRepository.save(product);
  }

  public async find(): Promise<IProduct[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findById(id: string): Promise<IProduct | null> {
    const product = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return product;
  }

  async findByName(name: string): Promise<IProduct | null> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });
    return existsProducts;
  }
}
