import AppError from '@shared/errors/AppError';
import { ICreateOrder } from '../domain/models/ICreateOrder';
import { IOrder } from '../domain/models/IOrder';
import { IOrdersProductsRepository } from '../domain/repositories/IOrdersRepository';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersProductsRepository,
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository,
    @inject('ProductRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute({
    customer_id,
    products,
  }: ICreateOrder): Promise<IOrder> {
    const customerExists = await this.customerRepository.findById(customer_id);

    // Condição para gerar um erro caso já exista um produto com tal nome.
    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await this.productRepository.findAllByIds(products);

    // Condição para gerar um erro caso não exista produtos
    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    // Condição para gerar um erro caso tenha na lista de produtos um produto que não exista
    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    // Condição para gerar um erro caso tenha na lista "quantityAvailable" algum produto no pedido, que sua quantidade seja maior do que o estoque do produto inicialmente.
    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
        is not available for ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    // Criará o pedido com seu respectivo cliente, e seus variados pedidos dos produtos
    const order = await this.ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    // Atualizará os produtos pedidos
    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
