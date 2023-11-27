import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.get('/profile/:id', UserController.getProfile);
router.get('/:username', UserController.getUserByUsername);
router.post(
  '/sing-up',
  validateRequest(userValidation.register),
  UserController.registerUser
);
router.post(
  '/sing-in',
  validateRequest(userValidation.login),
  UserController.loginUser
);

router.patch('/:id', UserController.updateProfile);

export const AuthRouter = router;
