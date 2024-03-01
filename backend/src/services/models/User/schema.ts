import { File } from "fastify-multer/lib/interfaces"
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


export const createUserRequest = yup.object({
    role_id: yup.number().required(),
    user_wilayah: yup.number().when('role_id', ([role_id]: any) => {
        return role_id == 3 ? yup.number().required() : yup.number().notRequired()
    }),
    image: yup.mixed<File>(),
    ...userPayload,
});


export const updateUserRequest = yup.object({
    id: yup.number().required(),
    image: yup.mixed<File>(),
    username: yup.string().required(),
    role_id: yup.number().required(),
    user_wilayah: yup.number().when('role_id', ([role_id]: any) => {
        return role_id == 3 ? yup.number().required() : yup.number().notRequired()
    }),
})