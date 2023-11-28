import { Message } from '@/modules/home/models/message';
import { trpcClient, trpcStreamClient } from '@/rpc/trpcService';
import type { Unsubscribable } from '@trpc/server/observable';

export interface SubscriptionHandler<T> {
	onMessage(msg: T): void;
	onError(err: any): void;
	onComplete(): void;
}

export function toMessage(uuid: string, senderId: string, senderName: string, chatId: string, time: string, content: string): Message {
	return new Message(uuid, senderId, senderName, chatId, new Date(time), content);
}

class ChatService {
	async getMessages(contactId: string): Promise<Message[]> {
		const msgs = await trpcClient.chat.getMessages.query({ contactId: contactId });

		return msgs.map((m) => toMessage(m.uuid, m.senderId, m.senderName, m.chatId, m.time, m.content));
	}

	async sendMessage(contactId: string, senderId: string, content: string): Promise<void> {
		await trpcClient.chat.addMessage.mutate({ contactId: contactId, senderId: senderId, content: content });
	}

	setupChatSubscription(userId: string, handler: SubscriptionHandler<Message>): Unsubscribable {
		return trpcStreamClient.chat.onUpdate.subscribe(userId, {
			onData(m) {
				handler.onMessage(toMessage(m.uuid, m.senderId, m.senderName, m.chatId, m.time, m.content));
			},
			onError(err) {
				handler.onError(err);
			},
			onComplete() {
				handler.onComplete();
			},
			onStopped() {
				handler.onComplete();
			},
		});
	}
}

// Mock request in transit
function delay(): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, 2000));
}

export const chatService = new ChatService();
