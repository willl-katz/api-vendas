export interface IProducts {
  id: string;
  quantity: number;
}

export interface ICreateOrder {
  customer_id: string;
  products: IProducts[];
}
