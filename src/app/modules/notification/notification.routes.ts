import express from 'express';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.get('/', NotificationController.getInToDB);
router.get('/:id', NotificationController.getByIdInToDB);
router.post('/', NotificationController.createInToDB);
router.patch('/', NotificationController.updateInToDB);
router.delete('/', NotificationController.deleteInToDB);

export const NotificationRouter = router;
