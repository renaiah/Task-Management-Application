import express from 'express';
import { register, login, deleteUser, getCurrentUser, getUsers } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';
import { isAdmin } from '../middleware/role.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getCurrentUser);
router.get('/userslist', auth, isAdmin, getUsers);
router.delete('/userslist/:id', auth, isAdmin, deleteUser);
export default router;
