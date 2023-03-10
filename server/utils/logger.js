import pino from 'pino';

const logger = pino({
	transport: {
		target: 'pino-pretty',
		options: {
			translateTime: 'SYS:dd-mmm-yyyy HH:MM:ss',
			ignore: 'pid',
			colorize: true,
		},
	},
});

export default logger;
