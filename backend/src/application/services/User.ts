import * as UserDomainService from "../../services/domain/User";
import * as UserDto from "../../services/models/User";
import { RequestError } from "../../utils/error";
import * as Bcrypt from "../../utils/password";
import * as Jwt from "../../utils/jwt";

export async function GetUserServiceApp({ user_id }: UserDto.GetUserServiceApp) {
    const user = await UserDomainService.CheckUserByIdDomain(user_id)
    return user
}

export async function LoginServiceApp({ password, username }: UserDto.LoginServiceApp) {
    await UserDto.loginRequest.validate({ password, username })

    const user = await UserDomainService.CheckUserByUsernameDomain(username)

    const isCorrect = Bcrypt.verify({ password, hash: user.password })

    if (!isCorrect) {
        throw new RequestError('INVALID_PASSWORD')
    }

    const token = Jwt.signToken({ payload: user })

    return token
}

export async function CreateUserServiceApp({ username, password }: UserDto.CreateUserServiceApp) {
    await UserDto.createUserRequest.validate({ username, password })

    await UserDomainService.CheckUsernameAvailableDomain(username)

    await UserDomainService.CreateUserDomain({ username, password: Bcrypt.hashPassword(password) })

    return true
}

export async function UpdateUserServiceApp({ id, username, password }: UserDto.UpdateUserServiceApp) {
    await UserDto.updateUserRequest.validate({ id, username, password })

    await UserDomainService.UpdateUserDomain({ id, username, password: Bcrypt.hashPassword(password) })

    return true
}