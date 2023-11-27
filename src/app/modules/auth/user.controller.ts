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
    const { username } = req.params;
    const result = await UserService.updateProfile(updateData, username);

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
    const { username } = req.params;

    const result = await UserService.getProfile(username);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile fetched successfully',
      data: result,
    });
  }
);

export const UserController = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
};
