<script setup lang="ts">
import { PlanCardView } from '@/shared/types'
import { computed } from 'vue'
import { green } from 'tailwindcss/colors'
import { Share, Pencil, Trash } from '@vicons/ionicons5'
import { NIcon, NButton, NPopover, useDialog } from 'naive-ui'

interface PlanCardProps {
	item: PlanCardView
}
const props = defineProps<PlanCardProps>()
const dialog = useDialog()
const emit = defineEmits<{
	(key: 'goToLogs', planId: string): void
	(key: 'updatePlan', planId: string): void
	(key: 'deletePlan', planId: string): void
}>()

function onPencilClick() {
	emit('updatePlan', props.item.id)
}

function onShareClick() {
	emit('goToLogs', props.item.id)
}

function onTrashClick() {
	dialog.error({
		title: 'Are you sure?',
		content: `Delete ${props.item.name}?`,
		positiveText: 'Sure',
		negativeText: 'Not Sure',
		onPositiveClick: () => {
			emit('deletePlan', props.item.id)
		},
	})
}

const indexSubject = computed(() => {
	const procent = props.item.moneySubject / 100
	const currentProcent = (props.item?.currentMoney ?? 0) / procent
	return Math.floor(currentProcent)
})

const gradientLoader = computed(
	() =>
		`background-image: linear-gradient(to right, ${green[600] + 90} 0%, ${
			green[500] + 70
		} ${indexSubject.value}%, #0000 ${indexSubject.value + 10}%, #0000 100%);`
)

const startDate = new Date(props.item.createDate)
const endDate = new Date(props.item.endDate)
</script>

<template>
	<n-popover
		trigger="hover"
		placement="bottom-start"
		:delay="200"
		:duration="200"
	>
		<template #trigger>
			<figure class="plan-card" :style="gradientLoader">
				<div class="flex w-full justify-between">
					<figcaption class="truncate text-2xl">{{ item.name }}</figcaption>
					<strong
						class="text-end text-3xl"
						:title="'Complite on ' + indexSubject"
					>
						{{ indexSubject }} %
					</strong>
				</div>
				<div class="flex w-full justify-between">
					<ul class="list-inside list-disc">
						<li>Logs: {{ item.logCount }}</li>
						<li>Current money: {{ item.currentMoney }}</li>
						<li>Subject money: {{ item.moneySubject }}</li>
					</ul>
					<div class="flex w-1/4 items-center justify-around">
						<n-button text @click="onPencilClick">
							<template #icon>
								<n-icon size="30" :component="Pencil"></n-icon>
							</template>
						</n-button>
						<n-button text @click="onTrashClick">
							<template #icon>
								<n-icon size="30" :component="Trash"></n-icon>
							</template>
						</n-button>
						<n-button text @click="onShareClick">
							<template #icon>
								<n-icon size="30" :component="Share"></n-icon>
							</template>
						</n-button>
					</div>
				</div>
			</figure>
		</template>
		<ul class="list-inside list-disc">
			<li>
				Start date:
				<time :datetime="startDate.toISOString()">
					{{ startDate.toLocaleString() }}
				</time>
			</li>
			<li>
				End date:
				<time :datetime="endDate.toISOString()">
					{{ endDate.toLocaleString() }}
				</time>
			</li>
			<li>{{ item.categoryNames }}</li>
		</ul>
	</n-popover>
</template>

<style scoped lang="scss">
.plan-card {
	@apply p-2;
	// @apply mt-1.5;
	@apply transition-all;
	@apply md:w-[20rem];
	// @apply md:min-w-[20rem];
	// @apply lg:w-full;
	// @apply xl:w-full;
	@apply w-[20rem];
	@apply sm:w-[34rem];
	// @apply sm:min-w-[34rem];
	@apply h-[12rem];
	// @apply min-w-full;

	@apply rounded;
	@apply border;

	@apply border-primary-1;
	@apply dark:border-primary-dark-1;
	@apply bg-primary-3;
	@apply dark:bg-primary-dark-3;

	@apply flex;
	@apply flex-col;
	@apply justify-between;

	@apply sm:hover:-translate-y-0;
	@apply hover:-translate-y-1;
	@apply hover:shadow-lg;
	@apply hover:shadow-primary-2;
	@apply hover:dark:shadow-primary-dark-2;
}
</style>
