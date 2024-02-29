import * as yup from "yup"
import { addCarrouselRequest, editCarrouselRequest, editTemplateRequest, getCarrouselDetailsRequest, getTemplateRequest, createEventRequest, createEventDetailsRequest, editEventRequest } from "./schema"

export type CreatePayload = {
    content: string
    url: string
    template_id?: number
    title: string
    description: string
}

export type Carrousel = { id: number, template_id: number, active: number } & CreatePayload

export type EditTemplate = {
    id: number
    name: string
    description: string
    active: number
}

export type Template = {
    created_at: number
    updated_at: number
} & EditTemplate

export type AddCarrouselRequest = yup.InferType<typeof addCarrouselRequest>
export type AddCarrouselServiceApp = AddCarrouselRequest

export type GetTemplateRequest = yup.InferType<typeof getTemplateRequest>
export type GetTemplateServiceApp = GetTemplateRequest

export type EditTemplateRequest = yup.InferType<typeof editTemplateRequest>
export type EditTemplateServiceApp = EditTemplateRequest

export type EditCarrousel = CreatePayload & {
    id: number
    active: number
}

export type EditCarrouselRequest = yup.InferType<typeof editCarrouselRequest>
export type EditCarrouselServiceApp = EditCarrouselRequest

export type GetCarrouselDetailsRequest = yup.InferType<typeof getCarrouselDetailsRequest>
export type GetCarrouselDetailsServiceApp = GetCarrouselDetailsRequest

// export type CreateEvent = {
//     title: string
//     description: string
//     address: string

// }

// export type Event = { id: number } & CreateEvent

export type CreateEventRequest = yup.InferType<typeof createEventRequest>
export type CreateEventServiceApp = CreateEventRequest

export type CreateEventDocs = {
    title: string
    url: string
    cms_id: number
}

export type CreateEvent = {
    title: string
    description: string
    event_id: number
}

export type EditEvent = {
    title: string
    description: string,
    id: number
}

export type CreateEventDetailsRequest = yup.InferType<typeof createEventDetailsRequest>
export type CreateEventDetailsServiceApp = CreateEventDetailsRequest

export type EditEventRequest = yup.InferType<typeof editEventRequest>
export type EditEventServiceApp = EditEventRequest