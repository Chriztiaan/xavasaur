<template>
	<div class="d-flex flex-column" style="border-right: 1px solid lightgrey">
		<VCard variant="flat" class="px-3 d-flex align-center justify-space-between" height="46px" style="border-radius: 0px">
			<div class="font-weight-bold">{{ useAuthStore().username }}</div>
			<VSpacer />
			<VBtn variant="outlined" class="bg-primary" @click="useAuthStore().logout()">Logout</VBtn>
		</VCard>
		<VDivider />
		<VCard
			v-for="c of sortedContacts"
			:key="c.uuid"
			class="pl-3 pr-0 d-flex gap-3 align-center"
			:class="{ 'bg-primary': c.uuid == useContactStore().activeContact?.uuid }"
			style="border-radius: 0px"
			variant="flat"
			height="74px"
			@click.stop="setActive(c)"
		>
			<VAvatar class="my-3" variant="outlined" :icon="mdiAccount" size="50" />
			<div class="py-3 pr-3 d-flex flex-column" style="border-bottom: 1px solid lightgrey; min-width: 100%; height: 100%">
				<div class="font-weight-black">{{ c.name }}</div>
				<div class="font-weight-thin f-14">
					<template v-if="c.lastMessage.senderId == useAuthStore().userId">You: </template>
					<template v-else> {{ c.lastMessage.senderName }}: </template>
					{{ c.lastMessage.content }}
				</div>
			</div>
		</VCard>
	</div>
</template>

<script setup lang="ts">
import type { Contact } from '@/modules/home/models/contact';
import { useAuthStore } from '@/modules/home/stores/authStore';
import { useContactStore } from '@/modules/home/stores/contactStore';
import { mdiAccount } from '@mdi/js';
import { computed } from 'vue';

useContactStore().retrieveContacts();
const sortedContacts = computed(() => [...useContactStore().contacts].sort((a, b) => b.lastMessage.time.getTime() - a.lastMessage.time.getTime()));

const setActive = (c: Contact): void => {
	useContactStore().activeContact = c;
};
</script>

<style scoped></style>
