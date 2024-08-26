import { Request, Response } from "express";
import AppError from "@shared/errors/AppError";
import { instanceToPlain } from "class-transformer";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { container } from "tsyringe";

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);

    if (!request.user.id || request.file == undefined) {
      throw new AppError("Error updating user avatar")
    }

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json(instanceToPlain(user));
  }
}
