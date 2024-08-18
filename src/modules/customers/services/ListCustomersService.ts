import { paginationObject } from 'typeorm-easy-paginate';
import Customer from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomerRepository';

interface IPaginatieCustomer {
  content: Customer[];
  pagination: {
    page: number;
    perPage: number;
    totalPage: number;
    totalItems: number;
  };
}

interface IRequest {
  totalCurrentPage: number;
  totalPerPage: number;
}
class ListCustomersService {
  public async execute({
    totalCurrentPage,
    totalPerPage
  }: IRequest): Promise<IPaginatieCustomer> {
    const customers = await CustomerRepository.find();
    const totalItems = await CustomerRepository.count();

    // Função para dividir o array com base na quantidade por página
    function dividirArray({
      array,
      tamanho,
    }: {
      array: Customer[];
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
