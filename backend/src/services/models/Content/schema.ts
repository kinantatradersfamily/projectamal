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
        images: yup.array().of(yup.mixed<File>().required()).required()
})