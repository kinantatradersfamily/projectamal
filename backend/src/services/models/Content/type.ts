import * as yup from "yup"
import { addCarrouselRequest, editCarrouselRequest, editTemplateRequest, getTemplateRequest } from "./schema"

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
