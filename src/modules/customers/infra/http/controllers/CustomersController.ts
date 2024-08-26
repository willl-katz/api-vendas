import CreateCustomerService from "@modules/customers/services/CreateCustomerService";
import DeleteCustomerService from "@modules/customers/services/DeleteCustomerService";
import ListCustomersService from "@modules/customers/services/ListCustomersService";
import ShowCustomerService from "@modules/customers/services/ShowCustomerService";
import UpdateCustomerService from "@modules/customers/services/UpdateCustomerService";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";



export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { perPage, page } = request.query;

    const listCustomers = container.resolve(ListCustomersService);

    const customers = await listCustomers.execute({
      totalCurrentPage: !page ? 1 : Number(page),
      totalPerPage: !perPage ? 2 : Number(perPage),
    });

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name, email });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({ id, name, email });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    return response.json([]);
  }
}
