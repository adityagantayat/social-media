import express from 'express';

//local imports
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/users.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

//READ
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

//UPDATE
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
