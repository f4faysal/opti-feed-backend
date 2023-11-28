import express from 'express';

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.get('/profile/:id', auth(), UserController.getProfile);
router.get('/:username', auth(), UserController.getUserByUsername);
router.get('/follow-count/:username', auth(), UserController.getFollowersCount);
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

router.post('/follow/:id', auth(), UserController.updatedFollow);
router.post(
  '/change-password',

  auth(),
  UserController.changePassword
);

router.post('/forgot-password', UserController.forgotPassword);

router.post('/reset-password', UserController.resetPassword);

router.patch('/:id', UserController.updateProfile);

export const AuthRouter = router;
