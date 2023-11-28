import { Message } from '../../chat/models/message';

export class User {
	id: string;
	name: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}

export class Contact extends User {
	lastMessage: Message;

	constructor(uuid: string, name: string, lastMessage: Message) {
		super(uuid, name);
		this.lastMessage = lastMessage;
	}
}
