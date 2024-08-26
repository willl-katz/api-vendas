
import AppError from "@shared/errors/AppError";
import { IProduct } from "../domain/models/IProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

interface IRequest {
  id: string;
}

class ShowProductService {
  constructor(private productRepository: IProductsRepository) { }

  public async execute({ id }: IRequest): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductService;
