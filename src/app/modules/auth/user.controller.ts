import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const registerUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.registerUser(req.body);
    console.log(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await UserService.loginUser(loginData);
    // set refresh token into cookie
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: result,
    });
  }
);

const updateProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...updateData } = req.body;
    const { id } = req.params;
    const result = await UserService.updateProfile(updateData, id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User profile updated successfully !',
      data: result,
    });
  }
);

const getProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.user as { userId: string };

    const result = await UserService.getProfile(id, userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile fetched successfully',
      data: result,
    });
  }
);

const getUserByUsername: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { username } = req.params;

    const result = await UserService.getUserByUsername(username);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  }
);

const updatedFollow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.user as { userId: string };

    console.log(userId);

    const result = await UserService.updatedFollow(userId, id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  }
);

const getFollowersCount: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { username } = req.params;
    const result = await UserService.getFollowersCount(username);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Followers Count successfully',
      data: result,
    });
  }
);

const changePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.user as { userId: string };

    const result = await UserService.changePassword(
      userId,
      oldPassword,
      newPassword
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully',
      data: result,
    });
  }
);

export const UserController = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getUserByUsername,
  updatedFollow,
  getFollowersCount,
  changePassword,
};
