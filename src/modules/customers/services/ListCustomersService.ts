import { paginationObject } from 'typeorm-easy-paginate';
import { IListCustomer, IPaginatieCustomer } from '../domain/models/IListCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';
class ListCustomersService {
  constructor(private customersRepository: ICustomersRepository) { }

  public async execute({
    totalCurrentPage,
    totalPerPage
  }: IListCustomer): Promise<IPaginatieCustomer> {
    const listCustomers = await this.customersRepository.propertiesPagination();
    const customers = listCustomers.listCustomers;
    const totalItems = listCustomers.countListCustomers;

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
