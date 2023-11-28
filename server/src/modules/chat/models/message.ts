export class Message {
	uuid: string;
	senderId: string;
	senderName: string;
	chatId: string;
	time: Date;
	content: string;

	constructor(uuid: string, senderId: string, senderName: string, chatId: string, time: Date, content: string) {
		this.uuid = uuid;
		this.senderId = senderId;
		this.senderName = senderName;
		this.chatId = chatId;
		this.time = time;
		this.content = content;
	}
}
