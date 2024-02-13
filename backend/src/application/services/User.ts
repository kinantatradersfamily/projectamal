import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import * as UserDomainService from "../../services/domain/User";
import * as UserDto from "../../services/models/User";
import { RequestError } from "../../utils/error";

export async function GetUserServiceApp({ user_id }: UserDto.GetUserServiceApp) {
    const user = await UserDomainService.CheckUserByIdDomain(user_id)
    return user
}

export async function LoginServiceApp({ password, username }: UserDto.LoginServiceApp) {
    await UserDto.loginRequest.validate({ password, username })

    const user = await UserDomainService.CheckUserByUsernameDomain(username)

    const isCorrect = bcrypt.compareSync(password, user.password)

    if(!isCorrect) {
        throw new RequestError('INVALID_PASSWORD')
    }

    const token = jwt.sign(user, process.env.SECRET_KEY as string)

    return token
}

export async function CreateUserServiceApp({ username, password }: UserDto.CreateUserServiceApp) {
    await UserDto.createUserRequest.validate({ username, password })

    await UserDomainService.CheckUsernameAvailableDomain(username)

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserDomainService.CreateUserDomain({ username, password: hashedPassword })

    return true
}

export async function UpdateUserServiceApp({ id, username, password }: UserDto.UpdateUserServiceApp) {
    await UserDto.updateUserRequest.validate({ id, username, password })

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserDomainService.UpdateUserDomain({ id, username, password: hashedPassword })

    return true
}