import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/User.js';

const router = express.Router();

router.get('/all', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;