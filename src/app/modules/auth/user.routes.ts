import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get(
  '/profile',
  auth(ENUM_USER_ROLE.INSTRUCTOR, ENUM_USER_ROLE.STUDENT),
  UserController.getProfile
);
router.post(
  '/sing-up',

  UserController.registerUser
);
router.post('/sing-in', UserController.loginUser);

export const AuthRouter = router;
