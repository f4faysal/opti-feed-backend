import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';

import { User } from '@prisma/client';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { sendEmail } from './sendResetMail';
import { ISingUpUserResponse } from './user.interface';

// Register user controller function to register user in data bases

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

// Login user controller function to login user in data bases
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
// Update user profile controller function to update user profile in data bases
const updateProfile = async (
  user: User,
  id: string
): Promise<Partial<User>> => {
  const result = await prisma.user.update({ where: { id }, data: user });

  return result;
};

// Get user profile controller function to get user profile in data bases
const getProfile = async (userId: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({ where: { id: userId } });

  const followersCount = await prisma.user.count({
    where: {
      followingIds: {
        has: userId,
      },
    },
  });

  console.log(followersCount, 'profile');
  return result;
};

// Get user by username controller function to get user by username in data bases

const getUserByUsername = async (username: string): Promise<User | any> => {
  const result = await prisma.user.findUnique({ where: { username } });

  const followersCount = await prisma.user.count({
    where: {
      followingIds: {
        has: result?.id || '',
      },
    },
  });

  console.log(followersCount, getUserByUsername);
  return result;
};

const updatedFollow = async (
  currentUserId: string,
  userId: string
): Promise<User | null> => {
  const user: any = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const updatedFollowingIds = [...(user.followingIds || [])];

  updatedFollowingIds.push(userId);

  // NOTIFICATION PART START
  try {
    await prisma.notification.create({
      data: {
        body: 'Someone followed you!',
        userId,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
  // NOTIFICATION PART END

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUserId,
    },
    data: {
      followingIds: updatedFollowingIds,
    },
  });

  return updatedUser;
};

const getFollowersCount = async (username: string): Promise<User | any> => {
  const result = await prisma.user.findUnique({ where: { username } });

  const followersCount = await prisma.user.count({
    where: {
      followingIds: {
        has: result?.id,
      },
    },
  });

  return followersCount;
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user: any = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const isPasswordMatched = async (
    givenPassword: string,
    savedPassword: string
  ) => {
    return await bcrypt.compare(givenPassword, savedPassword);
  };

  if (
    user.hashedPassword &&
    !(await isPasswordMatched(oldPassword, user.hashedPassword))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds)
  );

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hashedPassword,
    },
  });

  return updatedUser;
};

const forgotPassword = async (email: string) => {
  const user: any = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
  }

  const passResetToken = jwtHelpers.createToken(
    { userId: user.id, username: user.username },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const resetLink: string =
    config.resetlink + `email=${user.email}&token=${passResetToken}`;

  await sendEmail(
    user.email,
    `
      <div>
        <p>Hi, ${user.name}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <a href=${resetLink}>${resetLink}</a>
        <p>Thank you</p>
      </div>
  `
  );

  return {
    message:
      'Reset password link sent to your email, inbox or spam folder please',
  };
};

const resetPassword = async (token: string, newPassword: string) => {
  const { userId } = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  ) as { userId: string };

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds)
  );

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hashedPassword,
    },
  });

  return updatedUser;
};

export const UserService = {
  registerUser,
  loginUser,
  updateProfile,
  getProfile,
  getUserByUsername,
  updatedFollow,
  getFollowersCount,
  changePassword,
  forgotPassword,
  resetPassword,
};
