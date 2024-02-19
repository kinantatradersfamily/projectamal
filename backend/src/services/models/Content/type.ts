import * as yup from "yup"
import { addCarrouselRequest, getTemplateRequest } from "./schema"

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