import { prisma } from '../database/prisma';
import {
  getOneUser,
  returnCreateUser,
  TCreateUser,
  TgetOneUser,
  TLoginUser,
  TUser,
  TUserReturn,
} from '../schemas/user.schemas';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppError } from '../errors/appError';

export class UserService {
  async register(body: TCreateUser): Promise<TUserReturn> {
    const passwordHash = await bcrypt.hash(body.password, 10);
    const registerUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: passwordHash,
      },
    });
    return returnCreateUser.parse(registerUser);
  }

  async login(body: TLoginUser): Promise<{ accessToken: string }> {
    const user = (await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })) as TUser;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });
    const comparePassword = await bcrypt.compare(body.password, user.password);

    if (!comparePassword) {
      throw new AppError('Incorrect email or password', 401);
    }

    return { accessToken: token };
  }

  async getUser(id: number): Promise<TgetOneUser> {
    const user = (await prisma.user.findFirst({
      where: { id },
    })) as TUser;
    return getOneUser.parse(user);
  }
}
