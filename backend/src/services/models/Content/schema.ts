import { File } from "fastify-multer/lib/interfaces"
import * as yup from "yup"

export const addContentRequest = yup.object({
        content: yup.array().of(yup.mixed<File>().required()).required()
})