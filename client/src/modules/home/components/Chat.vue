<template>
	<div class="d-flex flex-column" style="height: 100dvh">
		<div class="d-flex flex-column">
			<div class="px-4 d-flex align-center justify-space-between font-weight-bold" style="height: 46px">
				{{ useContactStore().activeContact?.name || 'Tutors' }}
				<VBtn variant="outlined" v-if="!useAuthStore().admin" class="bg-primary" @click="useAuthStore().logout()">Logout</VBtn>
			</div>
			<VDivider />
		</div>
		<div class="d-flex flex-column justify-start px-3 pt-1" style="overflow-y: scroll" ref="scroller">
			<v-card
				:variant="'text'"
				v-for="m of useChatStore().messages"
				ref="chatRefs"
				:key="m.uuid"
				class="mt-2 pa-2 bg-grey-darken-1 d-flex flex-column chat-card"
				:class="{ 'align-self-end bg-primary': m.senderId == useAuthStore().userId }"
				rounded="lg"
			>
				<div class="f-12 font-weight-bold text-purple-lighten-3" v-if="m.senderId != useAuthStore().userId">
					{{ m.senderName }} <template v-if="m.senderId != useChatStore().chatId">(Tutor)</template>
				</div>
				<div class="f-14 content">{{ m.content }}</div>
				<div class="f-11 align-self-end text-purple-lighten-4">{{ format(m.time, 'h:mm a') }}</div>
			</v-card>
		</div>
		<v-spacer />
		<div class="d-flex gap-2 pa-3">
			<VTextField variant="outlined" ref="input" rounded="xl" v-model="text" @keydown.enter="send" hide-details>
				<template #append-inner>
					<VIcon :icon="mdiPaperclip" @click.stop="" class="mx-2" />
				</template>
			</VTextField>
			<VBtn variant="flat" color="primary" :disabled="!text" :icon="mdiSend" @click="send" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/home/stores/authStore';
import { useChatStore } from '@/modules/home/stores/chatStore';
import { useContactStore } from '@/modules/home/stores/contactStore';
import { mdiPaperclip, mdiSend } from '@mdi/js';
import { computed } from 'vue';
import { ref, watch } from 'vue';
import { format } from 'date-fns';
import { nextTick } from 'vue';

const input = ref(null);

useChatStore().retrieveMessages();
useChatStore().startChatSubscription();

const userId = computed(() => useAuthStore().userId);
const activeContact = computed(() => useContactStore().activeContact);
const messages = computed(() => useChatStore().messages);
const text = ref('');
watch(userId, () => {
	useChatStore().retrieveMessages();
	useChatStore().startChatSubscription();
});
watch(activeContact, () => {
	useChatStore().retrieveMessages();
	text.value = '';
	nextTick(() => (input.value as any).focus());
});

const chatRefs = ref([]);
const scroller = ref(null);

watch(
	messages,
	() => {
		if (chatRefs.value.length == 0) return;
		nextTick(() => ((scroller.value as any).scrollTop = (scroller.value as any).scrollHeight));
	},
	{ deep: true, immediate: true }
);

const send = (): void => {
	if (!text.value) return;
	useChatStore().sendMessage(text.value);
	text.value = '';
};
</script>

<style scoped>
.chat-card {
	min-width: 120px;
	width: fit-content;
	min-height: fit-content;
	height: fit-content;
	overflow: visible;
}

.content {
	max-width: 390px;
	line-break: anywhere;
}
</style>
