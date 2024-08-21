import { IProduct } from "../models/IProduct";

export interface IFindProducts {
  id: string;
}

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | null>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
}
