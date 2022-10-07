export interface ILogView extends Readonly<Omit<ILogItem, 'categoryId'>>{
	readonly category?: string
	readonly iconSrc?: string
}

export interface ILogItem {
	readonly id: string
	readonly title: string
	readonly categoryId: string
	readonly money: number
	readonly date: Date
}