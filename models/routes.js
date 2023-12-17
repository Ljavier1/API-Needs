import express from 'express';
import UserController from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';
import uploadMiddleware from './middlewares/uploadMiddleware';


const router = express.Router();

router.put('/users/profile', authMiddleware, uploadMiddleware.single('photo'), UserController.updateProfile);

export default router;