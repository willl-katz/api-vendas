import { Response, Request } from 'express';
import { instanceToPlain } from 'class-transformer';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import { container } from 'tsyringe';

export default class SessionController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionService);

    const user = await createSession.execute({
      email,
      password
    });

    return response.json(instanceToPlain(user));
  }
}
