import { FastifyReply, FastifyRequest } from "fastify";
import { UnathorizedError } from "../../utils/error";
import { verifyToken } from "../../utils/jwt";
import { User } from "../../services/models/User";
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