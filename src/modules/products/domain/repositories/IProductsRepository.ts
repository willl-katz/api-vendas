import { ICreateProduct } from "../models/ICreateProduct";
import { IProduct } from "../models/IProduct";

export interface IFindProducts {
  id: string;
}

export interface IProductsRepository {
  find(): Promise<IProduct[]>;
  findByName(name: string): Promise<IProduct | null>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  findById(id: string): Promise<IProduct | null>;
  create(data: ICreateProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  save(product: IProduct): Promise<void>;
}
