import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

class ListProductService {
  public async execute():Promise<Product[]> {
    const productsRepository = ProductRepository;

    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
