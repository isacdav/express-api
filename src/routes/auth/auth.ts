import { Router } from 'express';
import { authController } from '../../controllers';
import { signupValidator } from '../../middlewares';

const router = Router();

router.post('/login', authController.login);
router.put('/signup', signupValidator, authController.signup);

export default router;
