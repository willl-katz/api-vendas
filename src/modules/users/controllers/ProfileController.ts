import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import AppError from "@shared/errors/AppError";
import UpdateProfileService from "../services/UpdateProfileService";
import { instanceToPlain } from "class-transformer";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
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

    const updateProfile = new UpdateProfileService();

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
