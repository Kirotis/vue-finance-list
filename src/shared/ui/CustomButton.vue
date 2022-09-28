<script lang="ts" setup></script>

<template>
	<button class="button-style">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
button.button-style {
	@apply rounded;
	@apply box-border;
	@apply border;
	@apply border-slate-700;
	@apply p-1;
	@apply text-center;
	@apply transition-all;
	@apply hover:bg-slate-300;
	@apply dark:border-primary-dark;
	@apply dark:hover:bg-slate-600;
}
</style>
