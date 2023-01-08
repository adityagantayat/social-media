import pino from 'pino';

export const logger = pino({
	transport: {
		target: 'pino-pretty',
		options: {
			translateTime: 'SYS:dd-mmm-yyyy HH:MM:ss',
			ignore: 'pid',
			colorize: true,
		},
	},
});

// export default logger;
