import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/appError';

export class VerifyUserExistLogin {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const { email } = res.locals.data;
    const userExist = await prisma.user.findFirst({ where: { email } });

    if (!userExist) {
      throw new AppError('Email or password incorrect', 409);
    }

    next();
  }
}
