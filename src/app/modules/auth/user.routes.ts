import express from 'express';

import { UserController } from './user.controller';

const router = express.Router();

router.get('/profile/:username', UserController.getProfile);
router.post(
  '/sing-up',

  UserController.registerUser
);
router.post('/sing-in', UserController.loginUser);

export const AuthRouter = router;
