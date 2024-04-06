import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/appError';

export class VerifyIdExistGetOneUser {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    res.locals.idUser = id;
    next();
  }
}
