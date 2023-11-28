import { Contact } from '@/modules/home/models/contact';
import type { Message } from '@/modules/home/models/message';
import { toMessage } from '@/modules/home/services/chatService';
import { trpcClient } from '@/rpc/trpcService';

function toContact(uuid: string, name: string, lastMessage: Message): Contact {
	return new Contact(uuid, name, lastMessage);
}

class ContactService {
	async getContacts(): Promise<Contact[]> {
		const contacts = await trpcClient.contact.getContacts.query();

		return contacts.map((c) => {
			const lastMessage = toMessage(
				c.lastMessage.uuid,
				c.lastMessage.senderId,
				c.lastMessage.senderName,
				c.lastMessage.chatId,
				c.lastMessage.time,
				c.lastMessage.content
			);
			return toContact(c.id, c.name, lastMessage);
		});
	}
}

export const contactService = new ContactService();
