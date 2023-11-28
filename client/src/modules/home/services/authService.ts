import { trpcClient } from '@/rpc/trpcService';

class AuthService {
	async login(username: string): Promise<{ id: string; name: string; admin: boolean }> {
		return await trpcClient.auth.login.query(username);
	}
}

export const authService = new AuthService();
