import express from 'express';
import { CommentController } from './comment.controller';

const router = express.Router();

router.get('/', CommentController.getInToDB);
router.get('/:id', CommentController.getByIdInToDB);
router.post('/create', CommentController.createInToDB);
router.patch('/update', CommentController.updateInToDB);
router.delete('/delete', CommentController.deleteInToDB);

export const CommentRouter = router;
