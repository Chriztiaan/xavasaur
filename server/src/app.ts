import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';
import figlet from 'figlet';
import process from 'process';
import { chatRouter } from './modules/chat/chatRouter';
import { Database } from './providers/database';
import { Logger } from './providers/logger';
import { router } from './providers/trpc';
import cors from 'cors';
import { contactRouter } from './modules/contact/contactRouter';
import { authRouter } from './modules/auth/authRouter';

export const appRouter = router({
	chat: chatRouter,
	contact: contactRouter,
	auth: authRouter,
});

export type AppRouter = typeof appRouter;

class App {
	logger: Logger;
	database: Database;

	constructor() {
		this.logger = new Logger();
		this.database = new Database();

		console.log(figlet.textSync('xavasaur'));

		const wss = new ws.WebSocketServer({
			port: 3001,
		});
		const handler = applyWSSHandler({ wss, router: appRouter, createContext: async () => {} });

		process.on('SIGTERM', () => {
			handler.broadcastReconnectNotification();
			wss.close();
		});

		const server = createHTTPServer({
			middleware: cors(),
			router: appRouter,
		});
		const a = server.listen(3000);
	}

	async close(): Promise<void> {
		this.logger.info('Performing cleanup actions before server shutdown...');

		this.logger.close();
	}
}

const app = new App();
