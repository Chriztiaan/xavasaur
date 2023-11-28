/// <reference types="node" />
declare module 'providers/trpc' {
	/**
	 * Export reusable router and procedure helpers
	 * that can be used throughout the router
	 */
	export const router: <TProcRouterRecord extends import('@trpc/server').ProcedureRouterRecord>(
		procedures: TProcRouterRecord
	) => import('@trpc/server').CreateRouterInner<
		import('@trpc/server').RootConfig<{
			ctx: object;
			meta: object;
			errorShape: import('@trpc/server').DefaultErrorShape;
			transformer: import('@trpc/server').DefaultDataTransformer;
		}>,
		TProcRouterRecord
	>;
	export const publicProcedure: import('@trpc/server').ProcedureBuilder<{
		_config: import('@trpc/server').RootConfig<{
			ctx: object;
			meta: object;
			errorShape: import('@trpc/server').DefaultErrorShape;
			transformer: import('@trpc/server').DefaultDataTransformer;
		}>;
		_ctx_out: object;
		_input_in: typeof import('@trpc/server').unsetMarker;
		_input_out: typeof import('@trpc/server').unsetMarker;
		_output_in: typeof import('@trpc/server').unsetMarker;
		_output_out: typeof import('@trpc/server').unsetMarker;
		_meta: object;
	}>;
}
declare module 'modules/chat/models/message' {
	export class Message {
		uuid: string;
		senderId: string;
		senderName: string;
		chatId: string;
		time: Date;
		content: string;
		constructor(uuid: string, senderId: string, senderName: string, chatId: string, time: Date, content: string);
	}
}
declare module 'modules/contact/models/user' {
	import { Message } from 'modules/chat/models/message';
	export class User {
		id: string;
		name: string;
		constructor(id: string, name: string);
	}
	export class Contact extends User {
		lastMessage: Message;
		constructor(uuid: string, name: string, lastMessage: Message);
	}
}
declare module 'modules/repository' {
	import { EventEmitter } from 'events';
	import { User } from 'modules/contact/models/user';
	import { Message } from 'modules/chat/models/message';
	export const admins: string[];
	export const users: User[];
	export const contacts: User[];
	export const messages: Message[];
	export const eventEmitter: EventEmitter;
	export const usernames: Map<string, User>;
}
declare module 'modules/chat/chatRouter' {
	import { Message } from 'modules/chat/models/message';
	export const chatRouter: import('@trpc/server').CreateRouterInner<
		import('@trpc/server').RootConfig<{
			ctx: object;
			meta: object;
			errorShape: import('@trpc/server').DefaultErrorShape;
			transformer: import('@trpc/server').DefaultDataTransformer;
		}>,
		{
			onUpdate: import('@trpc/server').BuildProcedure<
				'subscription',
				{
					_config: import('@trpc/server').RootConfig<{
						ctx: object;
						meta: object;
						errorShape: import('@trpc/server').DefaultErrorShape;
						transformer: import('@trpc/server').DefaultDataTransformer;
					}>;
					_meta: object;
					_ctx_out: object;
					_input_in: string;
					_input_out: string;
					_output_in: typeof import('@trpc/server').unsetMarker;
					_output_out: typeof import('@trpc/server').unsetMarker;
				},
				import('@trpc/server/observable').Observable<Message, unknown>
			>;
			getMessages: import('@trpc/server').BuildProcedure<
				'query',
				{
					_config: import('@trpc/server').RootConfig<{
						ctx: object;
						meta: object;
						errorShape: import('@trpc/server').DefaultErrorShape;
						transformer: import('@trpc/server').DefaultDataTransformer;
					}>;
					_meta: object;
					_ctx_out: object;
					_input_in: {
						contactId: string;
					};
					_input_out: {
						contactId: string;
					};
					_output_in: typeof import('@trpc/server').unsetMarker;
					_output_out: typeof import('@trpc/server').unsetMarker;
				},
				Message[]
			>;
			addMessage: import('@trpc/server').BuildProcedure<
				'mutation',
				{
					_config: import('@trpc/server').RootConfig<{
						ctx: object;
						meta: object;
						errorShape: import('@trpc/server').DefaultErrorShape;
						transformer: import('@trpc/server').DefaultDataTransformer;
					}>;
					_meta: object;
					_ctx_out: object;
					_input_in: {
						content: string;
						contactId: string;
						senderId: string;
					};
					_input_out: {
						content: string;
						contactId: string;
						senderId: string;
					};
					_output_in: typeof import('@trpc/server').unsetMarker;
					_output_out: typeof import('@trpc/server').unsetMarker;
				},
				Message
			>;
		}
	>;
}
declare module 'providers/provider' {
	export interface Provider {
		close(): void;
	}
}
declare module 'providers/database' {
	import { PrismaClient } from '@prisma/client';
	import { Provider } from 'providers/provider';
	export class Database extends PrismaClient implements Provider {
		constructor();
		close(): Promise<void>;
	}
}
declare module 'providers/logger' {
	import { Logger as WinstonLogger } from 'winston';
	import { Provider } from 'providers/provider';
	export class Logger implements Provider {
		log: WinstonLogger;
		constructor();
		debug(msg: string): void;
		info(msg: string): void;
		warn(msg: string): void;
		error(msg: string): void;
		close(): void;
	}
}
declare module 'modules/contact/contactRouter' {
	import { Contact } from 'modules/contact/models/user';
	export const contactRouter: import('@trpc/server').CreateRouterInner<
		import('@trpc/server').RootConfig<{
			ctx: object;
			meta: object;
			errorShape: import('@trpc/server').DefaultErrorShape;
			transformer: import('@trpc/server').DefaultDataTransformer;
		}>,
		{
			getContacts: import('@trpc/server').BuildProcedure<
				'query',
				{
					_config: import('@trpc/server').RootConfig<{
						ctx: object;
						meta: object;
						errorShape: import('@trpc/server').DefaultErrorShape;
						transformer: import('@trpc/server').DefaultDataTransformer;
					}>;
					_ctx_out: object;
					_input_in: typeof import('@trpc/server').unsetMarker;
					_input_out: typeof import('@trpc/server').unsetMarker;
					_output_in: typeof import('@trpc/server').unsetMarker;
					_output_out: typeof import('@trpc/server').unsetMarker;
					_meta: object;
				},
				Contact[]
			>;
		}
	>;
}
declare module 'modules/auth/authRouter' {
	export const authRouter: import('@trpc/server').CreateRouterInner<
		import('@trpc/server').RootConfig<{
			ctx: object;
			meta: object;
			errorShape: import('@trpc/server').DefaultErrorShape;
			transformer: import('@trpc/server').DefaultDataTransformer;
		}>,
		{
			login: import('@trpc/server').BuildProcedure<
				'query',
				{
					_config: import('@trpc/server').RootConfig<{
						ctx: object;
						meta: object;
						errorShape: import('@trpc/server').DefaultErrorShape;
						transformer: import('@trpc/server').DefaultDataTransformer;
					}>;
					_meta: object;
					_ctx_out: object;
					_input_in: string;
					_input_out: string;
					_output_in: typeof import('@trpc/server').unsetMarker;
					_output_out: typeof import('@trpc/server').unsetMarker;
				},
				{
					id: string;
					name: string;
					admin: boolean;
				}
			>;
		}
	>;
}
declare module 'app' {
	export const appRouter: import('@trpc/server').CreateRouterInner<
		import('@trpc/server').RootConfig<{
			ctx: object;
			meta: object;
			errorShape: import('@trpc/server').DefaultErrorShape;
			transformer: import('@trpc/server').DefaultDataTransformer;
		}>,
		{
			chat: import('@trpc/server').CreateRouterInner<
				import('@trpc/server').RootConfig<{
					ctx: object;
					meta: object;
					errorShape: import('@trpc/server').DefaultErrorShape;
					transformer: import('@trpc/server').DefaultDataTransformer;
				}>,
				{
					onUpdate: import('@trpc/server').BuildProcedure<
						'subscription',
						{
							_config: import('@trpc/server').RootConfig<{
								ctx: object;
								meta: object;
								errorShape: import('@trpc/server').DefaultErrorShape;
								transformer: import('@trpc/server').DefaultDataTransformer;
							}>;
							_meta: object;
							_ctx_out: object;
							_input_in: string;
							_input_out: string;
							_output_in: typeof import('@trpc/server').unsetMarker;
							_output_out: typeof import('@trpc/server').unsetMarker;
						},
						import('@trpc/server/observable').Observable<import('modules/chat/models/message').Message, unknown>
					>;
					getMessages: import('@trpc/server').BuildProcedure<
						'query',
						{
							_config: import('@trpc/server').RootConfig<{
								ctx: object;
								meta: object;
								errorShape: import('@trpc/server').DefaultErrorShape;
								transformer: import('@trpc/server').DefaultDataTransformer;
							}>;
							_meta: object;
							_ctx_out: object;
							_input_in: {
								contactId: string;
							};
							_input_out: {
								contactId: string;
							};
							_output_in: typeof import('@trpc/server').unsetMarker;
							_output_out: typeof import('@trpc/server').unsetMarker;
						},
						import('modules/chat/models/message').Message[]
					>;
					addMessage: import('@trpc/server').BuildProcedure<
						'mutation',
						{
							_config: import('@trpc/server').RootConfig<{
								ctx: object;
								meta: object;
								errorShape: import('@trpc/server').DefaultErrorShape;
								transformer: import('@trpc/server').DefaultDataTransformer;
							}>;
							_meta: object;
							_ctx_out: object;
							_input_in: {
								content: string;
								contactId: string;
								senderId: string;
							};
							_input_out: {
								content: string;
								contactId: string;
								senderId: string;
							};
							_output_in: typeof import('@trpc/server').unsetMarker;
							_output_out: typeof import('@trpc/server').unsetMarker;
						},
						import('modules/chat/models/message').Message
					>;
				}
			>;
			contact: import('@trpc/server').CreateRouterInner<
				import('@trpc/server').RootConfig<{
					ctx: object;
					meta: object;
					errorShape: import('@trpc/server').DefaultErrorShape;
					transformer: import('@trpc/server').DefaultDataTransformer;
				}>,
				{
					getContacts: import('@trpc/server').BuildProcedure<
						'query',
						{
							_config: import('@trpc/server').RootConfig<{
								ctx: object;
								meta: object;
								errorShape: import('@trpc/server').DefaultErrorShape;
								transformer: import('@trpc/server').DefaultDataTransformer;
							}>;
							_ctx_out: object;
							_input_in: typeof import('@trpc/server').unsetMarker;
							_input_out: typeof import('@trpc/server').unsetMarker;
							_output_in: typeof import('@trpc/server').unsetMarker;
							_output_out: typeof import('@trpc/server').unsetMarker;
							_meta: object;
						},
						import('modules/contact/models/user').Contact[]
					>;
				}
			>;
			auth: import('@trpc/server').CreateRouterInner<
				import('@trpc/server').RootConfig<{
					ctx: object;
					meta: object;
					errorShape: import('@trpc/server').DefaultErrorShape;
					transformer: import('@trpc/server').DefaultDataTransformer;
				}>,
				{
					login: import('@trpc/server').BuildProcedure<
						'query',
						{
							_config: import('@trpc/server').RootConfig<{
								ctx: object;
								meta: object;
								errorShape: import('@trpc/server').DefaultErrorShape;
								transformer: import('@trpc/server').DefaultDataTransformer;
							}>;
							_meta: object;
							_ctx_out: object;
							_input_in: string;
							_input_out: string;
							_output_in: typeof import('@trpc/server').unsetMarker;
							_output_out: typeof import('@trpc/server').unsetMarker;
						},
						{
							id: string;
							name: string;
							admin: boolean;
						}
					>;
				}
			>;
		}
	>;
	export type AppRouter = typeof appRouter;
}
