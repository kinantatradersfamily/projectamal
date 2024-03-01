import { FastifyReply, FastifyRequest } from "fastify";
import { ForbiddenAccessError, UnathorizedError } from "@utils/error";
import { JwtPayload, verifyToken } from "@utils/jwt";
import { Role } from "../../services/models/User";
import { CheckUserByIdDomain } from "../../services/domain/User";
import { RequestUser } from "@utils/user";

declare module "fastify" {
    export interface FastifyRequest {
        user: RequestUser
    }
}

export async function CheckAuth(request: FastifyRequest, reply: FastifyReply) {
    const token = request.headers.authorization

    if(!token) {
        throw new UnathorizedError('PLEASE_LOGIN_FIRST')
    }

    const claims: JwtPayload = verifyToken(token)

    const user = await CheckUserByIdDomain(claims.id)

    if(!user.active) {
        throw new UnathorizedError('ACCOUNT_WAS_INACTIVE')
    }

    request.user = new RequestUser(user)
}

export function CheckRoles(...role: Role[]) {
    return async function (request: FastifyRequest) {
        const user = request.user

        if(!role.includes(user.role_id)) {
            throw new ForbiddenAccessError("ACCESS_DENIED")
        }
    }
}