import type { Optional } from '@/core/types/optional';
import type { Contact } from '@/modules/home/models/contact';
import { contactService } from '@/modules/home/services/contactService';
import type { Message } from '@/modules/home/models/message';
import { defineStore } from 'pinia';

export const useContactStore = defineStore('contacts', {
	state: () => ({
		contactsLoading: false,
		contacts: [] as Contact[],
		activeContact: undefined as Optional<Contact>,
	}),
	getters: {
		// totalTasks: (state) => state.tasks.length,
	},
	actions: {
		async retrieveContacts(): Promise<void> {
			this.contacts = [];
			this.contactsLoading = true;

			this.contacts = await contactService.getContacts();
			// this.contacts = [
			// 	new Contact('nelson', 'Nelson', new Message('1', 'nelson', 'Nelson', 'nelson', new Date(), 'Hello')),
			// 	new Contact('alfred', 'Alfred', new Message('1', 'xav', 'Xavier', 'alfred', new Date(), 'Ai tog maar hierdie is baie sad.')),
			// ];
			this.contactsLoading = false;
			this.activeContact = this.contacts[0];
		},
		syncNewMessage(msg: Message): void {
			const syncedContact = this.contacts.find((c) => c.uuid == msg.chatId);
			if (syncedContact) {
				syncedContact.lastMessage = msg;
			}
		},
	},
});
