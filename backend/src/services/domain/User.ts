import { NotFoundError, RequestError, ServerError } from "@utils/error";
import { CreatePayload, UpdatePayload } from "../models/User";
import { DBCreateUser, DBGetRole, DBGetRoleList, DBGetUserById, DBGetUserByUsername, DBGetUserList, DBGetWilayah, DBGetWilayahList, DBUpdateUser } from "../repository/User";

export async function CheckUserByUsernameDomain(username: string) {
    const result = await DBGetUserByUsername(username)

    if(result.length < 1) {
        throw new NotFoundError('USER_NOT_FOUND')
    }

    return result[0]
}

export async function CheckUserByIdDomain(id: number) {
    const result = await DBGetUserById(id)

    if(result.length < 1) {
        throw new NotFoundError('USER_NOT_FOUND')
    }

    return result[0]
}

export async function CheckUsernameAvailableDomain(username: string) {
    const result = await DBGetUserByUsername(username)

    if(result.length) {
        throw new RequestError('USERNAME_ALREADY_USED')
    }

    return result[0]
}

export async function CreateUserDomain(user: CreatePayload) {
    const result = await DBCreateUser(user)

    if(result.affectedRows < 1) {
        throw new ServerError('FAILED_TO_CREATE_USER')
    }
    return result
}

export async function UpdateUserDomain(user: UpdatePayload) {
    const result = await DBUpdateUser(user)

    if(result.affectedRows < 1) {
        throw new ServerError('FAILED_TO_UPDATE_USER')
    }

    return result
}

export async function GetUserListDomain() {
    return await DBGetUserList()   
}

export async function CheckWilayahExistDomain(id: number) {
    const query = await DBGetWilayah(id)

    if(query.length < 1) {
        throw new NotFoundError('WILAYAH_NOT_FOUND')
    }

    return query[0]
}

export async function CheckRoleExistDomain(id: number) {
    const query = await DBGetRole(id)

    if(query.length < 1) {
        throw new NotFoundError('ROLE_NOT_FOUND')
    }

    return query[0]
}

export async function GetWilayahListDomain() {
    return await DBGetWilayahList()
}

export async function GetRoleListDomain() {
    return await DBGetRoleList()
}