import * as yup from "yup"
import { addContentRequest } from "./schema"

export type CreatePayload = {
    content: string
    url: string
}

export type AddContentRequest = yup.InferType<typeof addContentRequest>
export type AddContentServiceApp = AddContentRequest
