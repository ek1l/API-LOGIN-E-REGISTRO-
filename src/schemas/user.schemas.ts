import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export const userCreateSchema = userSchema.omit({
  id: true,
});

export const returnCreateUser = userSchema.omit({
  id: true,
  password: true,
});

export const userLoginSchema = userSchema.omit({
  id: true,
  name: true,
});

export const getOneUser = userSchema.omit({
  password: true,
});

export type TUser = z.infer<typeof userSchema>;
export type TCreateUser = z.infer<typeof userCreateSchema>;
export type TUserReturn = z.infer<typeof returnCreateUser>;
export type TLoginUser = z.infer<typeof userLoginSchema>;
export type TgetOneUser = z.infer<typeof getOneUser>;
