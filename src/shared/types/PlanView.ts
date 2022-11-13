export interface PlanView {
	id: string
	logCount?: number
	currentMoney?: number
	name: string
	endDate: Date
	createDate: Date
	moneySubject: number
	type: PlanType
	categories: string[]
}

export interface PlanCardView extends PlanView {
	categoryNames: string
}

export enum PlanType {
	MAX,
	MIN,
	CURRENT,
}
export type EditablePlan = Partial<
	Pick<
		PlanView,
		'name' | 'type' | 'endDate' | 'categories' | 'createDate' | 'moneySubject'
	>
>
