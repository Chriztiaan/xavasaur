import { observable } from '@trpc/server/observable';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { publicProcedure, router } from '../../providers/trpc';
import { admins, eventEmitter, messages, users } from '../repository';
import { Message } from './models/message';

export const chatRouter = router({
	// input = userId
	onUpdate: publicProcedure.input(z.string()).subscription((opts) => {
		const userId = opts.input;
		// return an `observable` with a callback which is triggered immediately
		return observable<Message>((emit) => {
			const onAdd = (msg: Message) => {
				if (admins.includes(userId) || msg.chatId == userId)
					// emit data to client
					emit.next(msg);
			};
			// trigger `onAdd()` when `add` is triggered in our event emitter
			eventEmitter.on('addMessage', onAdd);

			// unsubscribe function when client disconnects or stops subscribing
			return () => {
				// Pending bun ws fix
				// eventEmitter.off('addMessage', onAdd);
			};
		});
	}),
	getMessages: publicProcedure.input(z.object({ contactId: z.string() })).query(async (opts) => {
		const { contactId: contactId } = opts.input;
		return messages.filter((m) => m.chatId == contactId);
	}),
	addMessage: publicProcedure.input(z.object({ senderId: z.string(), contactId: z.string(), content: z.string() })).mutation(async (opts) => {
		const { senderId: senderId, contactId: contactId, content: content } = opts.input;

		const msg = new Message(uuid(), senderId, users.find((u) => u.id == senderId)?.name || '', contactId, new Date(), content);
		messages.push(msg);

		eventEmitter.emit('addMessage', msg);
		eventEmitter.emit('addContactMessage', msg);
		return msg;
	}),
});
