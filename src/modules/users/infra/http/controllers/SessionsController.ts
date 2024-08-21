import { Response, Request } from 'express';
import CreateSessionService from '../services/CreateSessionService';
import { instanceToPlain } from 'class-transformer';

export default class SessionController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionService();

    const user = await createSession.execute({
      email,
      password
    });

    return response.json(instanceToPlain(user));
  }
}
