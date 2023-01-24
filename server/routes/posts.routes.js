import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getFeedPosts, likePost, getUserPosts } from '../controllers/posts.js';

const router = express.Router();

//READ
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

//UPDATE
router.patch('/:id/like', verifyToken, likePost);

export default router;
