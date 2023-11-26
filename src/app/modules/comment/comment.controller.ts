import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CommentService } from './comment.service';

const createInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CommentService.createInToDB(req.body);
    console.log(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comment created successfully',
      data: result,
    });
  }
);

const getInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CommentService.getInToDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comments fetched successfully',
      data: result,
    });
  }
);

const getByIdInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CommentService.getByIdInToDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comment fetched successfully',
      data: result,
    });
  }
);

const updateInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CommentService.updateInToDB(req.params.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comment updated successfully',
      data: result,
    });
  }
);

const deleteInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CommentService.deleteInToDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comment deleted successfully',
      data: result,
    });
  }
);

export const CommentController = {
  getInToDB,
  getByIdInToDB,
  createInToDB,
  updateInToDB,
  deleteInToDB,
};
