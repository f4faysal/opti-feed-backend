import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericRes<T> = {
  followersCount?: number;
  data: T;
};
