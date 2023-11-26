import express from 'express';
import { AuthRouter } from '../modules/auth/user.routes';
import { CommentRouter } from '../modules/comment/comment.routes';
import { NotificationRouter } from '../modules/notification/notification.routes';
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
  {
    path: '/comment',
    routes: CommentRouter,
  },
  {
    path: '/notification',
    routes: NotificationRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
