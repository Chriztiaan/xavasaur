import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from 'app';
// import { AppRouter } from './src/app';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000',
		}),
	],
});

// const user = await trpc.comment.userById.query('2');
// console.log(user);
