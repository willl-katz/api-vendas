
import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import Product from "../infra/typeorm/entities/Product";

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }:IRequest):Promise<Product> {
    const productsRepository = ProductRepository;

    const product = await productsRepository.findOne({
      where: {
        id
      }
    });

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductService;
