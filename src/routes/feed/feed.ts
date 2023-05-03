import { Router } from 'express';
import { feedController } from '../../controllers';

const router = Router();

router.get('/posts', feedController.getPosts);
router.post('/posts', feedController.createPost);

export default router;
