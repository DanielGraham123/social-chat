import { Router } from 'express';
import { registerUser } from '../controllers/Auth.js';
import { loginUser } from '../controllers/Auth.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;