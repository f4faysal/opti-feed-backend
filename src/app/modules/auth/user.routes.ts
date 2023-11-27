import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.get('/profile/:username', UserController.getProfile);
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

router.patch('/:username', UserController.updateProfile);

export const AuthRouter = router;
