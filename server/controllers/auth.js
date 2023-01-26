import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

// local imports
import User from '../models/User.js';
import logger from '../utils/logger.js';

// * REGISTER USER HANDLER
export const register = async (req, res) => {
	try {
		const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body;
		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000),
		});

		const savedUser = await newUser.save();
		res.status(StatusCodes.CREATED).json(savedUser);
	} catch (error) {
		logger.error(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

//* LOGIN HANDLER
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });

		//if no user is found with the given email, return 400
		if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User doesn't exist" });

		//compare paswword with the hashed password in the db
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid Credentials' });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;
		res.status(StatusCodes.OK).json({ token, user });
	} catch (error) {
		logger.error(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
