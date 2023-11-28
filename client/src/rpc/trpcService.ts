// import type { AppRouter } from '@/rpc/trpcTypes';
// import type { AppRouter } from '@/rpc/trpcTypes';
import { createTRPCProxyClient, createWSClient, httpBatchLink, wsLink } from '@trpc/client';
import type { AppRouter } from 'app';
//     👆 **type-only** import

// create persistent WebSocket connection
const wsClient = createWSClient({
	url: `ws://localhost:3001`,
});

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpcClient = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000',
			// fetch(url, options) {
			// 	return fetch(url, {
			// 		...options,
			// 		credentials: 'include',
			// 	});
			// },
		}),
	],
});

export const trpcStreamClient = createTRPCProxyClient<AppRouter>({
	links: [
		wsLink({
			client: wsClient,
		}),
	],
});
