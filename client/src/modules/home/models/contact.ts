import type { Message } from '@/modules/home/models/message';

export class Contact {
	uuid: string;
	name: string;
	lastMessage: Message;

	constructor(uuid: string, name: string, lastMessage: Message) {
		this.uuid = uuid;
		this.name = name;
		this.lastMessage = lastMessage;
	}
}
