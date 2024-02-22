import * as yup from "yup"
import { getActivityLogRequest } from "./schema"

export type CreatePayload = {
    action: string
    url: string
    user_id: number
    ip: string
    params?: string
}

export type ActivityLog = { id: number } & CreatePayload

export type ActivityLogList = Pick<ActivityLog, 'id' | 'action' | 'url'>

export type ActivityLogDetails = ActivityLog & {
    username: string
}

export type GetActivityLogRequest = yup.InferType<typeof getActivityLogRequest>
export type GetActivityLogServiceApp = GetActivityLogRequest