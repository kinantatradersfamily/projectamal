import { FastifyReply, FastifyRequest } from "fastify";
import { ForbiddenAccessError, UnathorizedError } from "../../utils/error";
import { verifyToken } from "../../utils/jwt";
import { Role, User } from "../../services/models/User";
import { CheckUserByIdDomain } from "../../services/domain/User";

declare module "fastify" {
    export interface FastifyRequest {
        user: User
    }
}

export async function CheckAuth(request: FastifyRequest, reply: FastifyReply) {
    const token = request.headers.authorization

    if(!token) {
        throw new UnathorizedError('PLEASE_LOGIN_FIRST')
    }

    const user: User = verifyToken(token)

    request.user = await CheckUserByIdDomain(user.id)
}

export function CheckRoles(...role: Role[]) {
    return async function (request: FastifyRequest) {
        const user = request.user

        if(!role.includes(user.role_id)) {
            throw new ForbiddenAccessError("ACCESS_DENIED")
        }
    }
}