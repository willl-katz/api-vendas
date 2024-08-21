import Customer from "@modules/customers/infra/typeorm/entities/Customer";

export interface IPaginatieCustomer {
  content: Customer[];
  pagination: {
    page: number;
    perPage: number;
    totalPage: number;
    totalItems: number;
  };
}

export interface IListCustomer {
  totalCurrentPage: number;
  totalPerPage: number;
}
