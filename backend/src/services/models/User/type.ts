import yup from 'yup'
import { createUserRequest, getUserRequest, loginRequest, updateUserRequest } from './schema'

export enum Role {
    SUPER_ADMIN = 1,
    ADMIN = 2,
    MANAGER = 3
}

export type CreatePayload = {
    username: string
    password: string
    profile_img: string
    role_id?: number
    user_wilayah?: number
}

export type User = { id: number, active: number ,created_at: number } & Required<CreatePayload>

export type UserList = Pick<User, 'id' | 'username' | 'role_id' | 'active'>[]

export type UpdatePayload = { id: number } & Omit<CreatePayload, 'password'> 

export type LoginRequest = yup.InferType<typeof loginRequest>
export type LoginServiceApp = LoginRequest & {
    action: string
    ip: string
    url: string
}

export type GetUserRequest = yup.InferType<typeof getUserRequest>
export type GetUserServiceApp = GetUserRequest

export type CreateUserRequest = yup.InferType<typeof createUserRequest>
export type CreateUserServiceApp = CreateUserRequest

export type UpdateUserRequest = yup.InferType<typeof updateUserRequest>
export type UpdateUserServiceApp = UpdateUserRequest

export type Wilayah = {
    id: number
    name: string
}

export type Roles = {
    id: number
    name: string
}