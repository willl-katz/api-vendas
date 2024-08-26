
import AppError from "@shared/errors/AppError";
import { IProduct } from "../domain/models/IProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository') private productRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductService;
