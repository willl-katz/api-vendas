import AppError from "@shared/errors/AppError";
import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing.");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken;

    request.user = {
      id: sub
    }

    return next();
  } catch {
    throw new AppError("Invalid JWT Token.")
  }
}

