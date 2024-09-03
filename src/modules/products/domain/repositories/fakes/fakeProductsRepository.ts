import {
  IFindProducts,
  IProductsRepository,
} from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { v4 as uuidv4 } from 'uuid';

export class FakeProductRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const product: IProduct = {
      id: uuidv4(),
      name,
      price,
      quantity,
      created_at: new Date(),
      updated_at: new Date(),
      order_products: [],
    };

    this.products.push(product);

    return product;
  }

  public async remove(product: IProduct): Promise<void> {
    // Adicione o cliente à lista (se necessário)
    this.products.push(product);

    // Encontre o índice do cliente com base no ID
    const indexToRemove = this.products.findIndex(
      item => item.id === product.id,
    );

    if (indexToRemove !== -1) {
      // Remova o cliente da lista usando splice
      // this.customers.splice(indexToRemove, 1);
      // OU, se preferir criar uma nova lista sem o cliente:
      this.products = this.products.filter(item => item.id !== product.id);
    } else {
      throw Error();
    }
  }

  public async save(product: IProduct): Promise<void> {
    Object.assign(this.products, product);
  }

  public async find(): Promise<IProduct[]> {
    const products = await this.products;

    return products;
  }

  public async findById(id: string): Promise<IProduct | null> {
    const product = this.products.find(item => item.id === id);

    return product || null;
  }

  async findByName(name: string): Promise<IProduct | null> {
    const product = this.products.find(item => item.name === name);
    if (!product) return null;
    return product;
  }

  async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
    let listProducts: IProduct[] = [];

    products.map(product => {
      const filteredProduct = this.products.find(
        item => item.id === product.id,
      );
      if (filteredProduct !== undefined) {
        return listProducts.push(filteredProduct);
      }
    });

    return listProducts;
  }
}
