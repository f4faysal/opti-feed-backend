import { Post } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createInToDB = async (paylod: Post): Promise<Post> => {
  const result = await prisma.post.create({ data: paylod });
  return result;
};

const getInToDB = async (): Promise<Post[]> => {
  const result = await prisma.post.findMany({
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};
const getByIdInToDB = async (id: string): Promise<Post | null> => {
  const result = await prisma.post.findUnique({
    where: { id },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });

  return result;
};
const updateInToDB = async (id: string, paylod: Post): Promise<Post> => {
  const result = await prisma.post.update({ where: { id }, data: paylod });

  return result;
};

const deleteInToDB = async (id: string): Promise<Post> => {
  const result = await prisma.post.delete({ where: { id } });

  return result;
};

const getPostsByUser = async (id: string): Promise<Post[]> => {
  const result = await prisma.post.findMany({
    where: {
      userId: id,
    },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

export const PostService = {
  getInToDB,
  getByIdInToDB,
  createInToDB,
  updateInToDB,
  deleteInToDB,
  getPostsByUser,
};
