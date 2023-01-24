import { StatusCodes } from 'http-status-codes';

//local imports
import User from '../models/User.js';
import logger from '../utils/logger.js';

//READ OPERATIONS
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(StatusCodes.OK).json(user);
	} catch (error) {
		res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
		logger.error(error.message);
	}
};
export const getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		const friends = await Promise.all(user.friends.map((friendId) => User.findById(friendId)));
		const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
			return { _id, firstName, lastName, occupation, location, picturePath };
		});
		res.status(StatusCodes.OK).json(formattedFriends);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
		logger.error(error.message);
	}
};

//UPDATE OPERATIONS
export const addRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);

		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((_id) => _id != friendId);
			friend.friends = friend.friends.filter((_id) => _id != friendId);
		} else {
			user.friends.push(friendId);
			friend.friends.push(id);
		}
		await user.save();
		await friend.save();

		//format the friends array of the user
		const friends = await Promise.all(user.friends.map((friendId) => User.findById(friendId)));
		const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
			return { _id, firstName, lastName, occupation, location, picturePath };
		});
		res.status(StatusCodes.OK).json(formattedFriends);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
		logger.error(error.message);
	}
};
