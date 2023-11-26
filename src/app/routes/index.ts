import express from 'express';
import { AuthRouter } from '../modules/auth/user.routes';
import { PostRouter } from '../modules/post/post.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRouter,
  },
  {
    path: '/post',
    routes: PostRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
