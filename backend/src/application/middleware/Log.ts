import { FastifyReply, FastifyRequest } from "fastify";
import * as LogDomainService from "../../services/domain/Log";

export async function ActivityLogging(request: FastifyRequest) {
    const user = request.user

    if(request.method ===  "GET") {
        await LogDomainService.CreateActivityLogDomain({
            action: request.routeOptions.schema.summary,
            url: request.url,
            user_id: user.id,
        })
    } else {
        await LogDomainService.CreateActivityLogDomain({
            action: request.routeOptions.schema.summary,
            url: request.url,
            user_id: user.id,
            params: JSON.stringify(request.body)
        })
    }
}