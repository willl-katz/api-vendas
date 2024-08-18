import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';
import { instanceToPlain } from 'class-transformer';
import User from '../typeorm/entities/User';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.json(instanceToPlain(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToPlain(user));
  }
}
function classToInstance(users: import("../typeorm/entities/User").default[], arg1: { strategy: string; }): any {
  throw new Error('Function not implemented.');
}

