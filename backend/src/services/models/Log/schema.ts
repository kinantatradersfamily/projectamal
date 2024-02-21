import * as yup from "yup"

export const getActivityLogRequest = yup.object({
    id: yup.number().required()
})