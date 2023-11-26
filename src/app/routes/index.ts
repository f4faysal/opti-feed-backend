import express from 'express';
import { AuthRouter } from '../modules/auth/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
