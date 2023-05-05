import { Router } from 'express';
import { feedController } from '../../controllers';
import { createPostValidator } from '../../middlewares';

const router = Router();

router.get('/posts', feedController.getPosts);
router.get('/post/:id', feedController.getPostById);
router.post('/post', createPostValidator, feedController.createPost);

export default router;
