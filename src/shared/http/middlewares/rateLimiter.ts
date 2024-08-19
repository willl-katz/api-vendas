import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';
import AppError from '@shared/errors/AppError';
import { RateLimiterRedis } from 'rate-limiter-flexible';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST, // Endereço do host Redis
        port: Number(process.env.REDIS_PORT), // Porta do servidor Redis
      },
      password: process.env.REDIS_PASS,
    });

    await redisClient.connect(); // Conectando ao Redis

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1,
    });

    if (!request.ip) throw new Error('IP address not found');

    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError('Too many requests.', 429);
  }
}
