import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();

router.get('/', PostController.getInToDB);
router.get('/:id', PostController.getByIdInToDB);
router.get('/my-post/:id', PostController.getPostsByUser);
router.post('/', PostController.createInToDB);
router.patch('/:id', PostController.updateInToDB);
router.delete('/', PostController.deleteInToDB);

export const PostRouter = router;
