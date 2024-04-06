import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    const registerUserService = new UserService();
    const response = await registerUserService.register(res.locals.data);
    return res.status(201).json(response);
  }
  async login(req: Request, res: Response): Promise<Response> {
    const loginUserService = new UserService();
    const response = await loginUserService.login(res.locals.data);
    return res.status(200).json(response);
  }
  async getUser(req: Request, res: Response): Promise<Response> {
    const getUserService = new UserService();
    const response = await getUserService.getUser(Number(res.locals.idUser));
    return res.status(200).json(response);
  }
}
