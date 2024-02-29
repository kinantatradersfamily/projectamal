import { FastifyReply, FastifyRequest } from "fastify";
import * as LogDomainService from "../../services/domain/Log";

export async function ActivityLogging(request: FastifyRequest) {
    const user = request.user
    if(request.method ===  "GET") {
        await LogDomainService.CreateActivityLogDomain({
            action: request.routeOptions.schema.summary,
            url: request.url,
            user_id: user.id,
            ip: request.headers["x-forwarded-for"] as string || (request.ip == '::1' ? "127.0.0.1" : request.ip),
        })
    } else {
        const body = request.body as any
        const params = JSON.stringify({ ...body, file: request.file || request.files }) 
        await LogDomainService.CreateActivityLogDomain({
            action: request.routeOptions.schema.summary,
            params,
            url: request.url,
            user_id: user.id,
            ip: request.headers["x-forwarded-for"] as string || (request.ip == '::1' ? "127.0.0.1" : request.ip),
        })
    }
}