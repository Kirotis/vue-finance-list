<script setup lang="ts">
import { ILogView } from '@/shared/types/ILogItem'
import { NImage } from 'naive-ui'
const props = defineProps<{ item: Partial<ILogView> }>()
const dateTime = new Date(props.item?.date ?? '')
</script>

<template>
	<figure class="log-card">
		<n-image
			class="my-auto scale-75 rounded-full"
			alt="none image"
			width="250"
			height="250"
			preview-disabled
			:src="item.iconSrc"
		/>
		<div class="flex w-full flex-col justify-between">
			<div class="flex justify-between">
				<figcaption class="text-2xl">
					{{ item.category || 'None' }}
				</figcaption>
				<strong class="text-3xl">
					{{ item.money }}
				</strong>
			</div>
			<caption
				class="break-after-column overflow-y-auto overscroll-y-auto text-left"
			>
				{{
					item.title
				}}
			</caption>
			<div class="flex justify-end">
				<time :datetime="dateTime.toISOString()">
					{{ dateTime.toLocaleString() }}
				</time>
			</div>
		</div>
	</figure>
</template>

<style scoped lang="scss">
.log-card {
	@apply p-2;
	// @apply mt-1.5;
	@apply transition-all;
	@apply md:w-[20rem];
	// @apply md:min-w-[20rem];
	// @apply lg:w-full;
	// @apply xl:w-full;
	// @apply w-[20rem];
	@apply sm:w-[34rem];
	// @apply sm:min-w-[34rem];
	@apply h-[8rem];
	// @apply min-w-full;

	@apply rounded;
	@apply border;
	@apply border-primary-1;
	@apply dark:border-primary-dark-1;
	@apply bg-primary-3;
	@apply dark:bg-primary-dark-3;

	@apply flex;
	@apply justify-between;

	@apply sm:hover:-translate-y-0;
	@apply hover:-translate-y-1;
	@apply hover:shadow-lg;
	@apply hover:shadow-primary-2;
	@apply hover:dark:shadow-primary-dark-2;
}
</style>
