import * as yup from "yup"
import { adminCreateEventRequest, approveEventRequest, createEventRequest, editEventRequest, getEventDetailsRequest } from "./schema"

export type CreatePayload = {
    title: string
    description: string
    address: string
    start_date: number
    end_date: number
    image_url: string
    wilayah_id: number
}

export type Event = CreatePayload & { id: number, status: number, created_at: number, is_approved: number, approved_at: number }

export type EventList = Pick<Event, 'id' | 'title' | 'address' | 'start_date' | 'end_date' | 'created_at'>

export type EventListParams = {
    wilayah_id: number | string
}

export type EditPayload = CreatePayload & { id: number, status: number }

export type CreateEventRequest = yup.InferType<typeof createEventRequest>
export type CreateEventServiceApp = CreateEventRequest & {
    wilayah_id: number
}

export type AdminCreateEventRequest = yup.InferType<typeof adminCreateEventRequest>

export type GetEventDetailsRequest = yup.InferType<typeof getEventDetailsRequest>
export type GetEventDetailsServiceApp = GetEventDetailsRequest & {
    wilayah_id: number
}


export type EditEventRequest = yup.InferType<typeof editEventRequest>
export type ManagerEditEventRequest = Omit<EditEventRequest, 'wilayah_id'>
export type EditEventServiceApp = EditEventRequest

export type ApproveEvent = {
    id: number
    is_approved: number
    reason?: string
}

export type ApproveEventRequest = yup.InferType<typeof approveEventRequest>
export type ApproveEventServiceApp = ApproveEventRequest

