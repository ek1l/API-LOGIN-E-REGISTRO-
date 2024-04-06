import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { VerifyUserExist } from '../middlewares/verifyUserExist.middleware';
import { VerifyBodySchema } from '../middlewares/verifyBodySchema.middleware';
import { userCreateSchema, userLoginSchema } from '../schemas/user.schemas';
import { VerifyUserExistLogin } from '../middlewares/verifyUserExistlogin.middleware';
import { VerifyToken } from '../middlewares/verifyToken.middleware';
import { VerifyIdExistGetOneUser } from '../middlewares/verifyIdExist.middleware';
export const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/register',
  VerifyBodySchema.execute(userCreateSchema),
  VerifyUserExist.execute,
  userController.register,
);

userRouter.post(
  '/login',
  VerifyBodySchema.execute(userLoginSchema),
  VerifyUserExistLogin.execute,
  userController.login,
);

userRouter.get(
  '/:id',
  VerifyIdExistGetOneUser.execute,
  VerifyToken.execute,
  userController.getUser,
);
