import yup from 'yup'
import { createUserRequest, getUserRequest, loginRequest, updateUserRequest } from './schema'

export type CreatePayload = {
    username: string
    password: string
    role_id?: number
}

export type User = { id: number, created_at: number } & Required<CreatePayload>

export type UpdatePayload = { id: number } & CreatePayload 

export type LoginRequest = yup.InferType<typeof loginRequest>
export type LoginServiceApp = LoginRequest

export type GetUserRequest = yup.InferType<typeof getUserRequest>
export type GetUserServiceApp = GetUserRequest

export type CreateUserRequest = yup.InferType<typeof createUserRequest>
export type CreateUserServiceApp = CreateUserRequest

export type UpdateUserRequest = yup.InferType<typeof updateUserRequest>
export type UpdateUserServiceApp = UpdateUserRequest