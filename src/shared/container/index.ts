import { container } from "tsyringe";

import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { CustomerRepository } from "@modules/customers/infra/typeorm/repositories/CustomerRepository";
import { IOrdersProductsRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokensRepository";
import { UserTokensRepository } from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

container.registerSingleton<ICustomersRepository>(
  'CustomerRepository',
  CustomerRepository,
);

container.registerSingleton<IOrdersProductsRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
