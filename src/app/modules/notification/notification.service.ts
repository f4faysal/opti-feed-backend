import { Notification } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createInToDB = async (paylod: Notification): Promise<Notification> => {
  const result = await prisma.notification.create({ data: paylod });
  return result;
};

const getInToDB = async (userId: string): Promise<Notification[]> => {
  const result = await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

const getByIdInToDB = async (id: string): Promise<Notification | null> => {
  const result = await prisma.notification.findUnique({
    where: { id },
  });

  return result;
};

const updateInToDB = async (
  id: string,
  paylod: Notification
): Promise<Notification> => {
  const result = await prisma.notification.update({
    where: { id },
    data: paylod,
  });

  return result;
};

const deleteInToDB = async (id: string): Promise<Notification> => {
  const result = await prisma.notification.delete({ where: { id } });

  return result;
};

export const NotificationService = {
  getInToDB,
  getByIdInToDB,
  createInToDB,
  updateInToDB,
  deleteInToDB,
};
