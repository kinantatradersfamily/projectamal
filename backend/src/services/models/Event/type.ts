import * as yup from "yup"
import { createEventRequest, editEventRequest, getEventDetailsRequest } from "./schema"

export type CreatePayload = {
    title: string
    description: string
    address: string
    start_date: number
    end_date: number
    image_url: string
}

export type Event = CreatePayload & { id: number, status: number, created_at: number }

export type EventList = Pick<Event, 'id' | 'title' | 'address' | 'start_date' | 'end_date' | 'created_at'>

export type EditPayload = CreatePayload & { id: number, status: number }

export type CreateEventRequest = yup.InferType<typeof createEventRequest>
export type CreateEventServiceApp = CreateEventRequest

export type GetEventDetailsRequest = yup.InferType<typeof getEventDetailsRequest>
export type GetEventDetailsServiceApp = GetEventDetailsRequest

export type EditEventRequest = yup.InferType<typeof editEventRequest>
export type EditEventServiceApp = EditEventRequest