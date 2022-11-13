import { constructBaseRequest } from '@/shared/lib'
import { PlanView, EditablePlan } from '@/shared/types'

const logBaseRequest = constructBaseRequest('plan')

export function getPlans(): Promise<PlanView[]> {
	return logBaseRequest<PlanView[]>('GET').catch(() => [])
}

export function editPlan(id: string, plan: EditablePlan): Promise<PlanView> {
	return logBaseRequest<PlanView>('PATCH', id, plan)
}

export function createPlan(plan: EditablePlan): Promise<PlanView> {
	return logBaseRequest<PlanView>('POST', '', plan)
}

export function deletePlan(id: string): Promise<PlanView> {
	return logBaseRequest<PlanView>('DELETE', id)
}
