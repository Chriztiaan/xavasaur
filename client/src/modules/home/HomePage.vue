<template>
	<div>
		<div v-if="useAuthStore().userId" class="d-flex" :key="useAuthStore().userId">
			<ContactList v-if="useAuthStore().admin" class="" style="width: 470px" />
			<Chat style="width: 100%" class="" />
		</div>
		<div v-else class="d-flex justify-center align-center" style="height: 80dvh">
			<VCard class="gap-3 ma-4 pa-4" height="200px" width="300px" color="primary" variant="outlined">
				<div class="d-flex flex-column justify-space-between" style="height: 100%; width: 100%">
					<div>
						<VTextField v-model="input" variant="outlined" label="Username" density="compact" @keydown.enter="login" />
					</div>

					<VBtn class="bg-primary" variant="flat" height="30px" @click="login">Login</VBtn>
				</div>
			</VCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import Chat from '@/modules/home/components/Chat.vue';
import ContactList from '@/modules/home/components/ContactList.vue';
import { useAuthStore } from '@/modules/home/stores/authStore';
import { ref } from 'vue';

const input = ref('');

const login = (): void => {
	useAuthStore().login(input.value);
	input.value = '';
};
</script>
