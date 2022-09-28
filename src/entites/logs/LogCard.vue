<script setup lang="ts">
import { ILogItem } from '@/shared/types/ILogItem'
import { NImage } from 'naive-ui'
const props = defineProps<{ item: Partial<ILogItem> }>()
const dateTime = new Date(props.item?.date ?? '')
</script>

<template>
	<figure class="log-card">
		<n-image
			class="my-auto scale-75 rounded-full"
			src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
			alt="none image"
			width="250"
			height="250"
			preview-disabled
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
	@apply mt-1;
	@apply transition-all;
	@apply max-w-sm;
	// @apply w-sm;
	@apply max-h-40;
	// @apply h-40;

	@apply rounded;
	@apply border;
	@apply border-primary-1;
	@apply dark:border-primary-dark-1;
	@apply bg-primary-3;
	@apply dark:bg-primary-dark-3;

	@apply flex;
	@apply justify-between;

	@apply hover:-translate-y-1;
	@apply hover:shadow-lg;
	@apply hover:shadow-primary-2;
	@apply hover:dark:shadow-primary-dark-2;
}
</style>
