import { v4 as uuid } from 'uuid';
import { publicProcedure, router } from '../../providers/trpc';
import { Message } from '../chat/models/message';
import { contacts, messages } from '../repository';
import { Contact } from './models/user';

export const contactRouter = router({
	getContacts: publicProcedure.query(async (opts) => {
		const tmp = contacts.map((u) => {
			const tmpMessages = messages.filter((m) => m.chatId == u.id);
			tmpMessages.sort((a, b) => b.time.getTime() - a.time.getTime());

			let m = tmpMessages[0];
			if (!m) m = new Message(uuid(), '', '', u.id, new Date(), '');

			return new Contact(u.id, u.name, m);
		});

		return tmp.sort((a, b) => b.lastMessage.time.getTime() - a.lastMessage.time.getTime());
	}),
});
