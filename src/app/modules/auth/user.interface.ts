import { User } from '@prisma/client';

export type ISingUpUserResponse = {
  accessToken: string;
  refreshToken?: string;
  newUser: User;
};
