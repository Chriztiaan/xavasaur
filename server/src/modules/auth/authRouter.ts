import { v4 as uuid } from 'uuid';
import { publicProcedure, router } from '../../providers/trpc';
import { Message } from '../chat/models/message';
import { admins, contacts, messages, usernames, users } from '../repository';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
	login: publicProcedure.input(z.string()).query(async (opts) => {
		const username = opts.input;
		const user = usernames.get(username);
		if (!user) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'An unexpected error occurred, please try again later.',
			});
		}
		return { id: user.id, name: user.name, admin: admins.includes(user.id) };
	}),
});
