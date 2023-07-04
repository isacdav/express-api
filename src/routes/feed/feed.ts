import { Router } from 'express';
import { feedController } from '../../controllers';
import { createPostValidator } from '../../middlewares';

const router = Router();

router.get('/posts', feedController.getPosts);
router.get('/post/:id', feedController.getPostById);
router.post('/post', createPostValidator, feedController.createPost);
router.put('/post/:id', createPostValidator, feedController.updatePost);
router.delete('/post/:id', feedController.deletePost);

export default router;
