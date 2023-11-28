import express from 'express';
import auth from '../../middlewares/auth';
import { PostController } from './post.controller';

const router = express.Router();

router.get('/', PostController.getInToDB);
router.get('/:id', PostController.getByIdInToDB);
router.get('/my-post/:id', PostController.getPostsByUser);
router.post('/', PostController.createInToDB);
router.post('/like/:id', auth(), PostController.linkPostToUser);
router.patch('/:id', auth(), PostController.updateInToDB);
router.delete('/:id', PostController.deleteInToDB);

export const PostRouter = router;
