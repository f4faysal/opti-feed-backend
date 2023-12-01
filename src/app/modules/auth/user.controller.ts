import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

// Register user controller function to register user in data bases
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

// Login user controller function to login user in data bases

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

// Update user profile controller function to update user profile in data bases
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
//`/api/v1/users/:id`
// Get user profile controller function to get user profile in data bases
const getProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await UserService.getProfile(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile fetched successfully',
      data: result,
    });
  }
);
// `api/v1/users/:username`
// Get user by username controller function to get user by username in data bases
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

// `api/v1/users/:id/follow`
// Update user follow controller function to update user follow in data bases
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

// `api/v1/users/:username/followers/count`
// Get user followers count controller function to get user followers count in data bases
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

// `api/v1/users/change-password`
// Change password controller function to change password in data bases

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

// `api/v1/users/forgot-password`
// Forgot password controller function to forgot password in data bases

const forgotPassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await UserService.forgotPassword(email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reset password link sent to your email',
      data: result,
    });
  }
);

// `api/v1/users/reset-password`

const resetPassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    const result = await UserService.resetPassword(token, newPassword);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password reset successfully',
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
  forgotPassword,
  resetPassword,
};
