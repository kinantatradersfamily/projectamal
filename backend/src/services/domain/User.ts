import { CreatePayload, UpdatePayload } from "../models/User";
import { DBCreateUser, DBGetUserById, DBGetUserByUsername, DBGetUserList, DBUpdateUser } from "../repository/User";

export async function CheckUserByUsernameDomain(username: string) {
    const result = await DBGetUserByUsername(username)

    if(result.length < 1) {
        throw new Error('USER_NOT_FOUND')
    }

    return result[0]
}

export async function CheckUserByIdDomain(id: number) {
    const result = await DBGetUserById(id)

    if(result.length < 1) {
        throw new Error('USER_NOT_FOUND')
    }

    return result[0]
}

export async function CheckUsernameAvailableDomain(username: string) {
    const result = await DBGetUserByUsername(username)

    if(result.length) {
        throw new Error('USERNAME_ALREADY_USED')
    }

    return result[0]
}

export async function CreateUserDomain(user: CreatePayload) {
    const result = await DBCreateUser(user)

    if(result.affectedRows < 1) {
        throw new Error('FAILED_TO_CREATE_USER')
    }

    return result
}

export async function UpdateUserDomain(user: UpdatePayload) {
    const result = await DBUpdateUser(user)

    if(result.affectedRows < 1) {
        throw new Error('FAILED_TO_UPDATE_USER')
    }

    return result
}

export async function GetUserListDomain() {
    return await DBGetUserList()   
}