import { Request, Response } from "express";
import AppError from "@shared/errors/AppError";
import { instanceToPlain } from "class-transformer";
import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import { container } from "tsyringe";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const user_id = request.user.id;

    if (!user_id) throw new AppError('User not found');

    const user = await showProfile.execute({
      user_id
    });

    return response.json(instanceToPlain(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    if (!user_id) throw new AppError('User not found');

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    });

    return response.json(instanceToPlain(user));
  }
}
