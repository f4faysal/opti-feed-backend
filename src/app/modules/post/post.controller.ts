import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PostService } from './post.service';

const createInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PostService.createInToDB(req.body);
    console.log(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Post created successfully',
      data: result,
    });
  }
);

const getInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PostService.getInToDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Posts fetched successfully',
      data: result,
    });
  }
);

const getByIdInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PostService.getByIdInToDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Post fetched successfully',
      data: result,
    });
  }
);

const updateInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PostService.updateInToDB(req.params.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Post updated successfully',
      data: result,
    });
  }
);

const deleteInToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PostService.deleteInToDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Post deleted successfully',
      data: result,
    });
  }
);

export const PostController = {
  getInToDB,
  getByIdInToDB,
  createInToDB,
  updateInToDB,
  deleteInToDB,
};
