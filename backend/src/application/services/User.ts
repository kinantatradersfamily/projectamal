import * as UserDomainService from "../../services/domain/User";
import * as UserDto from "../../services/models/User";
import { RequestError } from "../../utils/error";
import * as Bcrypt from "../../utils/password";
import * as Jwt from "../../utils/jwt";
import * as LogDomainService from "../../services/domain/Log";

export async function GetUserServiceApp({ user_id }: UserDto.GetUserServiceApp) {
    const user = await UserDomainService.CheckUserByIdDomain(user_id)
    return user
}

export async function LoginServiceApp({ password, username, action, ip, url }: UserDto.LoginServiceApp) {
    await UserDto.loginRequest.validate({ password, username })

    const user = await UserDomainService.CheckUserByUsernameDomain(username)
    
    const isCorrect = Bcrypt.verify({ password, hash: user.password })
    
    if (!isCorrect) {
        throw new RequestError('INVALID_PASSWORD')
    }
    
    await LogDomainService.CreateActivityLogDomain({ action, ip, url, user_id: user.id, params: JSON.stringify({ username, password: user.password }) })

    const token = Jwt.signToken({ payload: { id: user.id } })

    return token
}

export async function CreateUserServiceApp(payload: UserDto.CreateUserServiceApp) {
    await UserDto.createUserRequest.validate(payload)

    const { username, password, role_id, image, user_wilayah } = payload 

    await UserDomainService.CheckUsernameAvailableDomain(username)

    await UserDomainService.CheckRoleExistDomain(role_id)

    // Kalo bikin user kelpala wilayah, user_wilayahnya juga di insert. 
    if(role_id == 3 && user_wilayah) {
        await UserDomainService.CheckWilayahExistDomain(user_wilayah)
        await UserDomainService.CreateUserDomain({ username, password: Bcrypt.hashPassword(password), profile_img: image !== undefined ? image.path as string : process.env.DEFAULT_USER_IMG_URL, role_id, user_wilayah })
    } else {
        await UserDomainService.CreateUserDomain({ username, password: Bcrypt.hashPassword(password), profile_img: image !== undefined ? image.path as string : process.env.DEFAULT_USER_IMG_URL, role_id })

    }

    return true
}

export async function UpdateUserServiceApp(payload: UserDto.UpdateUserServiceApp) {
    await UserDto.updateUserRequest.validate(payload)

    const { id, role_id, username, image, user_wilayah } = payload

    const user = await UserDomainService.CheckUserByIdDomain(id)

    await UserDomainService.CheckRoleExistDomain(role_id)


    // Kalo update ke user kepala wilayah, user_wilayahnya juga ikut di update.
    if(role_id == 3 && user_wilayah) {
        await UserDomainService.CheckWilayahExistDomain(user_wilayah)
        await UserDomainService.UpdateUserDomain({ id, username, profile_img: image !== undefined ? image.path as string : user.profile_img, role_id, user_wilayah })
    } else {
        await UserDomainService.UpdateUserDomain({ id, username, profile_img: image !== undefined ? image.path as string : user.profile_img, role_id })
    }

    return true
}

export async function GetUserListServiceApp() {
    const users = await UserDomainService.GetUserListDomain()
    return users
}

export async function GetWilayahListServiceApp() {
    return await UserDomainService.GetWilayahListDomain()
}

export async function GetRoleListServiceApp() {
    return await UserDomainService.GetRoleListDomain()
}