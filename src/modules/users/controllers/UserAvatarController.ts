import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import AppError from "@shared/errors/AppError";

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    if (!request.user.id || request.file == undefined) {
      throw new AppError("Error updating user avatar")
    }

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json(user);
  }
}
