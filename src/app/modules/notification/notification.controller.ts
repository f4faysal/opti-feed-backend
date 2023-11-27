import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { NotificationService } from './notification.service';

const createInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await NotificationService.createInToDB(req.body);
    console.log(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification created successfully',
      data: result,
    });
  }
);

const getInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as any;

    const result = await NotificationService.getInToDB(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notifications fetched successfully',
      data: result,
    });
  }
);

const getByIdInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await NotificationService.getByIdInToDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification fetched successfully',
      data: result,
    });
  }
);

const updateInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await NotificationService.updateInToDB(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification updated successfully',
      data: result,
    });
  }
);

const deleteInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await NotificationService.deleteInToDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification deleted successfully',
      data: result,
    });
  }
);

export const NotificationController = {
  getInToDB,
  getByIdInToDB,
  createInToDB,
  updateInToDB,
  deleteInToDB,
};
