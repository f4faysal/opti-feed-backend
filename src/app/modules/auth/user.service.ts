import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';

import { User } from '@prisma/client';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ISingUpUserResponse } from './user.interface';

const registerUser = async (user: User): Promise<ISingUpUserResponse> => {
  if (!user.hashedPassword) {
    user.hashedPassword = config.default_pass as string;
  }
  user.hashedPassword = await bcrypt.hash(
    user.hashedPassword,
    Number(config.bycrypt_salt_rounds)
  );

  const newUser = await prisma.user.create({ data: user });

  const { id: userId, username } = newUser;
  const accessToken = jwtHelpers.createToken(
    { userId, username },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, username },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    newUser,
    accessToken,
    refreshToken,
  };
};

const loginUser = async (payload: {
  email: string;
  hashedPassword: string;
}) => {
  const { email, hashedPassword } = payload;

  const isPasswordMatched = async (
    givenPassword: string,
    savedPassword: string
  ) => {
    return await bcrypt.compare(givenPassword, savedPassword);
  };

  const isUserExist = await prisma.user.findUnique({ where: { email } });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.hashedPassword &&
    !(await isPasswordMatched(hashedPassword, isUserExist.hashedPassword))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { id: userId, username } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, username },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

const updateProfile = async (
  user: User,
  username: string
): Promise<Partial<User>> => {
  const result = await prisma.user.update({ where: { username }, data: user });

  return result;
};

const getProfile = async (username: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({ where: { username } });
  return result;
};

export const UserService = {
  registerUser,
  loginUser,
  updateProfile,
  getProfile,
};
