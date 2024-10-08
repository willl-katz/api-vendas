import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import ListUserService from '@modules/users/services/ListUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute();

    return response.json(instanceToPlain(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToPlain(user));
  }
}

