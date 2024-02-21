import { FastifyRequest } from "fastify";
import * as LogService from "../application/services/Log";
import * as LogDto from "../services/models/Log";

export async function getActivityLogHandler() {
    try {
        const message = await LogService.GetActivityLogListServiceApp()

        return { message }
    } catch (error) {
        throw error
    }
}

export async function activityLogDetailsHandler(request: FastifyRequest) {
    try {
        const params = request.params as LogDto.GetActivityLogRequest
        const message = await LogService.GetActivityLogServiceApp(params)

        return { message }
    } catch (error) {
        throw error
    }
}