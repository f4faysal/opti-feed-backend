import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();

router.get('/', PostController.getInToDB);
router.get('/:id', PostController.getByIdInToDB);
router.post('/create', PostController.createInToDB);
router.put('/update', PostController.updateInToDB);
router.delete('/delete', PostController.deleteInToDB);

export const PostRouter = router;
