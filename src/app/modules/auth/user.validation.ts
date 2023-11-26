import { z } from 'zod';

const register = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
    username: z.string().min(3).max(255),
    email: z.string().email(),
    hashedPassword: z.string().min(6).max(255),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string().email(),
    hashedPassword: z.string().min(6).max(255),
  }),
});

export const userValidation = {
  register,
  login,
};
