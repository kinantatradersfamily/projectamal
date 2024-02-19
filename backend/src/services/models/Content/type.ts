import * as yup from "yup"
import { addCarrouselRequest, editTemplateRequest, getTemplateRequest } from "./schema"

export type CreatePayload = {
    content: string
    url: string
    template_id: number
}

export type Carrousel = CreatePayload

export type Template = {
    id: number
    name: string
    active: number
    created_at: number
    updated_at: number
}

export type AddCarrouselRequest = yup.InferType<typeof addCarrouselRequest>
export type AddCarrouselServiceApp = AddCarrouselRequest

export type GetTemplateRequest = yup.InferType<typeof getTemplateRequest>
export type GetTemplateServiceApp = GetTemplateRequest

export type EditTemplateRequest = yup.InferType<typeof editTemplateRequest>
export type EditTemplateServiceApp = EditTemplateRequest

export type EditCarrousel = {
    id: number
    status: number
}
