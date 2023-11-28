import { defineStore } from 'pinia';

import { chatService } from '../services/chatService';
import type { Message } from '@/modules/home/models/message';
import { useContactStore } from '@/modules/home/stores/contactStore';
import { useAuthStore } from '@/modules/home/stores/authStore';
import type { Optional } from '@/core/types/optional';
import type { Unsubscribable } from '@trpc/server/observable';

export const useChatStore = defineStore('chat', {
	state: () => ({
		chatLoading: false,
		messages: [] as Message[],
		subscription: undefined as Optional<Unsubscribable>,
	}),
	getters: {
		chatId: (state) => {
			let chatId = useAuthStore().userId;
			const contact = useContactStore().activeContact;
			if (contact) {
				chatId = contact.uuid;
			}
			return chatId;
		},
	},
	actions: {
		async retrieveMessages(): Promise<void> {
			this.messages = [];
			this.chatLoading = true;

			this.messages = await chatService.getMessages(this.chatId);
			this.chatLoading = false;
		},
		async sendMessage(content: string): Promise<void> {
			const senderId = useAuthStore().userId;

			await chatService.sendMessage(this.chatId, senderId, content);
		},
		startChatSubscription(): void {
			if (this.subscription) {
				this.subscription.unsubscribe();
			}

			this.subscription = chatService.setupChatSubscription(useAuthStore().userId, {
				onMessage(msg) {
					if (useChatStore().chatId == msg.chatId) {
						useChatStore().messages.push(msg);
					}
					useContactStore().syncNewMessage(msg);
				},
				onError(err) {
					console.error(err);
				},
				onComplete() {},
			});
		},
	},
});
