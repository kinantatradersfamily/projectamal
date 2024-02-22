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

export async function CreateUserServiceApp({ username, password, image }: UserDto.CreateUserServiceApp) {
    await UserDto.createUserRequest.validate({ username, password, image })

    await UserDomainService.CheckUsernameAvailableDomain(username)

    await UserDomainService.CreateUserDomain({ username, password: Bcrypt.hashPassword(password), profile_img: image !== undefined ? image.path as string : process.env.DEFAULT_USER_IMG_URL })

    return true
}

export async function UpdateUserServiceApp({ id, username, password, image }: UserDto.UpdateUserServiceApp) {
    await UserDto.updateUserRequest.validate({ id, username, password, image })

    const user = await UserDomainService.CheckUserByIdDomain(id)

    await UserDomainService.UpdateUserDomain({ id, username, password: Bcrypt.hashPassword(password), profile_img: image !== undefined ? image.path as string : user.profile_img })

    return true
}

export async function GetUserListServiceApp() {
    const users = await UserDomainService.GetUserListDomain()
    return users
}