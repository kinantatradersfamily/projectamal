import { File } from "fastify-multer/lib/interfaces"
import * as yup from "yup"

export const addCarrouselRequest = yup.object({
        content: yup.array().of(yup.mixed<File>().required()).required(),
        template_id: yup.number().required()
})

export const getTemplateRequest = yup.object({
        template_id: yup.number().required()
})