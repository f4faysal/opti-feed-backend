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

const linkPostToUser = async (userId: string, postId: string) => {
  const post: any = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  let updatedLikedIds = [...(post.likedIds || [])];

  updatedLikedIds.push(userId);

  try {
    if (post?.userId) {
      await prisma.notification.create({
        data: {
          body: 'Someone liked your Tuntuni!',
          userId: post.userId,
        },
      });

      await prisma.user.update({
        where: {
          id: post.userId,
        },
        data: {
          hasNotification: true,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  const hasLiked = () => {
    const list = post?.likedIds || [];
    return list.includes(userId);
  };

  if (hasLiked()) {
    updatedLikedIds = updatedLikedIds.filter(likedId => likedId !== userId);
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });
    return updatedPost;
  } else {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });
    return updatedPost;
  }
};

export const PostService = {
  getInToDB,
  getByIdInToDB,
  createInToDB,
  updateInToDB,
  deleteInToDB,
  getPostsByUser,
  linkPostToUser,
};
