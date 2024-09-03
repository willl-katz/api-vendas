import { paginationObject } from 'typeorm-easy-paginate';
import {
  IListCustomer,
  IPaginatieCustomer,
} from '../domain/models/IListCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

// Função para dividir o array com base na quantidade por página
function dividirArray({
  array,
  tamanho,
}: {
  array: ICustomer[];
  tamanho: number;
}) {
  let resultado = [];
  for (let i = 0; i < array.length; i += tamanho) {
    resultado.push(array.slice(i, i + tamanho));
  }
  return resultado;
}

@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomerRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    totalCurrentPage,
    totalPerPage,
  }: IListCustomer): Promise<IPaginatieCustomer> {
    const { countListCustomers, listCustomers } =
      await this.customersRepository.propertiesPagination();

    if (totalCurrentPage <= 0 || totalPerPage <= 0)
      throw new AppError('Impossible number page our per page negative');

    const customers = listCustomers;
    const totalItems = countListCustomers;

    const filteredCustomers = dividirArray({
      array: customers,
      tamanho: totalPerPage,
    });

    const paginateCustomer = paginationObject(
      filteredCustomers[totalCurrentPage - 1], // [...] - seleciona pela página.
      totalCurrentPage,
      totalPerPage,
      totalItems,
    );

    //return customers as IPaginatieCustomer;
    return paginateCustomer as IPaginatieCustomer;
  }
}

export default ListCustomersService;
