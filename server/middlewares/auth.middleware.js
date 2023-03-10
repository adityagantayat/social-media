import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

export const verifyToken = async (req, res, next) => {
	try {
		let token = req.header('Authorization');
		if (!token) {
			return res.status(StatusCodes.FORBIDDEN).send('Access Denied');
		}
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length).trimLeft();
		}
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
		logger.error(err.message);
	}
};
