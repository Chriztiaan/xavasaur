import { createLogger, format, Logger as WinstonLogger, transports } from 'winston';
import { Provider } from './provider';

export class Logger implements Provider {
	log: WinstonLogger;

	constructor() {
		this.log = createLogger({
			level: 'debug',
			transports: [
				new transports.Console({ format: format.combine(format.timestamp(), format.json(), format.colorize({ all: true })) }),
				new transports.File({ filename: 'error.log', level: 'error', format: format.combine(format.timestamp(), format.json(), format.colorize({ all: false })) }),
				new transports.File({ filename: 'combined.log', format: format.combine(format.timestamp(), format.json(), format.colorize({ all: false })) }),
			],
		});
	}

	debug(msg: string): void {
		this.log.debug(msg);
	}

	info(msg: string): void {
		this.log.info(msg);
	}

	warn(msg: string): void {
		this.log.warn(msg);
	}

	error(msg: string): void {
		this.log.error(msg);
	}

	close(): void {
		this.log.close();
	}
}
