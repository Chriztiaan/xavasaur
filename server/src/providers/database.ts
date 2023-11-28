import { PrismaClient } from '@prisma/client';
import { Provider } from './provider';

const prisma = new PrismaClient();

export class Database extends PrismaClient implements Provider {
	constructor() {
		super();
	}

	async close(): Promise<void> {
		await this.$disconnect();
	}
}

async function main() {
	// const users = await prisma.user.findMany();
	// console.log(users);
	// const user = await prisma.user.create({
	// 	data: {
	// 		name: 'Alice',
	// 		email: 'alic2@prisma.io',
	// 	},
	// });
	// console.log(user);
	//---
	// const user = await prisma.user.create({
	// 	data: {
	// 		name: 'Bob',
	// 		email: 'bob@prisma.io',
	// 		posts: {
	// 			create: {
	// 				title: 'Hello World',
	// 			},
	// 		},
	// 	},
	// });
	// console.log(user);
}
// await main()
// 	.then(async () => {
// 		await prisma.$disconnect();
// 	})
// 	.catch(async (e) => {
// 		console.error(e);
// 		await prisma.$disconnect();
// 		process.exit(1);
// 	});
