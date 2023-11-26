import { Comment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createInToDB = async (paylod: Comment): Promise<Comment> => {
  const result = await prisma.comment.create({ data: paylod });
  return result;
};

const getInToDB = async (): Promise<Comment[]> => {
  const result = await prisma.comment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};
const getByIdInToDB = async (id: string): Promise<Comment | null> => {
  const result = await prisma.comment.findUnique({
    where: { id },
  });

  return result;
};
const updateInToDB = async (id: string, paylod: Comment): Promise<Comment> => {
  const result = await prisma.comment.update({ where: { id }, data: paylod });

  return result;
};

const deleteInToDB = async (id: string): Promise<Comment> => {
  const result = await prisma.comment.delete({ where: { id } });

  return result;
};

export const CommentService = {
  getInToDB,
  getByIdInToDB,
  createInToDB,
  updateInToDB,
  deleteInToDB,
};
