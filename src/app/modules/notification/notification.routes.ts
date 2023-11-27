import express from 'express';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.get('/', NotificationController.getInToDB);
router.get('/:id', NotificationController.getByIdInToDB);
router.post('/create', NotificationController.createInToDB);
router.patch('/update', NotificationController.updateInToDB);
router.delete('/delete', NotificationController.deleteInToDB);

export const NotificationRouter = router;
