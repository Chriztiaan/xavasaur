import { authService } from '@/modules/home/services/authService';
import { useContactStore } from '@/modules/home/stores/contactStore';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
	const authToken = ref(localStorage.getItem('authToken') || '');

	const userId = ref('');
	const username = ref('');
	const admin = ref(false);

	const login = async (inputToken: string): Promise<void> => {
		authService.login(inputToken).then((r) => {
			authToken.value = inputToken;
			localStorage.setItem('authToken', inputToken);
			userId.value = r.id;
			username.value = r.name;
			admin.value = r.admin;

			useContactStore().$reset();
		});
	};

	const logout = async (): Promise<void> => {
		localStorage.setItem('authToken', '');
		authToken.value = '';
		userId.value = '';
		username.value = '';
		admin.value = false;
	};

	if (authToken.value) {
		login(authToken.value);
	}

	return { userId, username, admin, login, logout };
});
