import { Router } from 'express';
import { feedController } from '../../controllers';
import { createPostValidator, isAuthenticated } from '../../middlewares';

const router = Router();

router.get('/posts', isAuthenticated, feedController.getPosts);
router.get('/post/:id', isAuthenticated, feedController.getPostById);
router.post('/post', isAuthenticated, createPostValidator, feedController.createPost);
router.put('/post/:id', isAuthenticated, createPostValidator, feedController.updatePost);
router.delete('/post/:id', isAuthenticated, feedController.deletePost);

export default router;
