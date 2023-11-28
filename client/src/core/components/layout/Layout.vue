<template>
	<v-app-bar density="compact" elevation="1"> </v-app-bar>
</template>
<script lang="ts">
import { routes } from '@/plugins/router';
import { defineComponent } from 'vue';

export default defineComponent({
	computed: {
		activeRouteName(): string {
			return this.$route.name?.toString() || '';
		},
	},
	data: () => ({
		drawer: false,
		routes,
	}),
});
</script>
