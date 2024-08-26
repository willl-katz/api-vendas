import ResetPasswordService from "@modules/users/services/ResetPasswordService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const sendForgotPasswordEmail = container.resolve(ResetPasswordService);

    await sendForgotPasswordEmail.execute({
      password,
      token
    });

    return response.status(204).json();
  }
}
