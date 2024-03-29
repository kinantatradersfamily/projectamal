import { File } from "fastify-multer/lib/interfaces"
import * as yup from "yup"

export const addCarrouselRequest = yup.object({
        content: yup.mixed<File>().required(),
        title: yup.string().required(),
        description: yup.string().required(),
})

export const getTemplateRequest = yup.object({
        template_id: yup.number().required()
})

export const editTemplateRequest = yup.object({
        active: yup.number().required(),
        template_id: yup.number().required(),
        name: yup.string().required(),
        description: yup.string().required(),
        image: yup.mixed<File>()
})

export const editCarrouselRequest = yup.object({
        id: yup.number().required(),
        active: yup.number().max(1).required(),
        title: yup.string().required(),
        description: yup.string().required(),
        image: yup.mixed<File>()
})

export const getCarrouselDetailsRequest = yup.object({
        id: yup.number().required()
})

export const createEventRequest = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        event_id: yup.number().required(),
})

export const createEventDetailsRequest = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        cms_event_id: yup.number().required()
})

export const editEventRequest = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        id: yup.number().required()
})