import { StatusCodes } from 'http-status-codes';
import Post from '../models/Post.js';
import logger from '../utils/logger.js';
import User from '../models/User.js';

// *CREATE*
export const createPost = async (req, res) => {
	try {
		const { userId, description, picturePath } = req.body;
		const user = await User.findById(userId);
		const newPost = new Post({
			userId,
			firstName: user.firstName,
			lastName: user.lastName,
			location: user.location,
			description,
			userPicturePath: user.picturePath,
			picturePath,
			likes: {},
			comments: [],
		});
		await newPost.save();
		const post = await Post.find();

		res.status(StatusCodes.CREATED).json(post);
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
		logger.error(err.message);
	}
};

// *READ*
export const getFeedPosts = async (req, res) => {
	try {
		const post = await Post.find();
		res.status(StatusCodes.OK).json(post);
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
		logger.error(err.message);
	}
};
export const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const post = await Post.find({ userId });
		res.status(StatusCodes.OK).json(post);
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
		logger.error(err.message);
	}
};

// *UPDATE*
export const likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const post = Post.findById(id);
		const isLiked = post.likes.get(userId);
		if (isLiked) {
			post.likes.delete(userId);
		} else {
			post.likes.set(userId, true);
		}
		const updatedPost = await Post.findByIdAndUpdate(id, { liked: post.likes }, { new: true });
		res.status(StatusCodes.OK).json(updatedPost);
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
		logger.error(err.message);
	}
};
