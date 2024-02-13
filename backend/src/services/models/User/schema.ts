import * as yup from "yup"

const userPayload = {
    username: yup.string().required(),
    password: yup.string().required()
}

export const loginRequest = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
})

export const getUserRequest = yup.object({
    user_id: yup.number().required()
})

export const createUserRequest = yup.object({ ...userPayload })

export const updateUserRequest = yup.object({
    id: yup.number().required(),
    ...userPayload
})