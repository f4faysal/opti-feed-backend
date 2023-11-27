import express from 'express';
import { CommentController } from './comment.controller';

const router = express.Router();

router.get('/', CommentController.getInToDB);
router.get('/:id', CommentController.getByIdInToDB);
router.post('/', CommentController.createInToDB);
router.patch('/', CommentController.updateInToDB);
router.delete('/', CommentController.deleteInToDB);

export const CommentRouter = router;
