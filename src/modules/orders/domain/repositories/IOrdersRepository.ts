import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { IOrder } from "../models/IOrder";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

export interface ICreateOrderRequest {
  customer: ICustomer;
  products: IProduct[];
}

export interface IOrdersProductsRepository {
  findById(id: string): Promise<IOrder | null>;
  createOrder({ customer, products }: ICreateOrderRequest): Promise<IOrder>;
}
