import { EventEmitter } from 'events';
import { User } from './contact/models/user';
import { Message } from './chat/models/message';

export const admins = ['xav', 'chr'];

export const users = [new User('alfred', 'Alfred'), new User('nelson', 'Nelson'), new User('xav', 'Xavier'), new User('chr', 'Christiaan')];
export const contacts = users.filter((u) => !admins.includes(u.id));
export const messages = [new Message('1', 'alfred', 'Alfred', 'alfred', new Date(), 'Hello'), new Message('2', 'nelson', 'Nelson', 'nelson', new Date(), 'Hello guys')];
export const eventEmitter = new EventEmitter();

export const usernames = new Map<string, User>();
usernames.set('xavier123', users[2]);
usernames.set('christiaan123', users[3]);

usernames.set('alfred', users[0]);
usernames.set('nelson', users[1]);

// TODO listen for closes?
eventEmitter.setMaxListeners(10000);
