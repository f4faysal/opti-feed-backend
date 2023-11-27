import express from 'express';
import auth from '../../middlewares/auth';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.get('/', auth(), NotificationController.getInToDB);
router.get('/:id', NotificationController.getByIdInToDB);
router.post('/', NotificationController.createInToDB);
router.patch('/', NotificationController.updateInToDB);
router.delete('/', NotificationController.deleteInToDB);

export const NotificationRouter = router;
