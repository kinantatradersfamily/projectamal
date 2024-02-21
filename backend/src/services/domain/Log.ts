import { NotFoundError, ServerError } from "../../utils/error";
import * as LogDto from "../models/Log";
import * as LogRepository from "../repository/Log";

export async function CreateActivityLogDomain(payload: LogDto.CreatePayload) {
    const result = await LogRepository.DBCreateActivityLog(payload)

    if(result.affectedRows < 1) {
        throw new ServerError('FAILED_TO_CREATE_ACTIVITY_LOG')
    }

    return result
}

export async function GetActivityLogListDomain() {
    return await LogRepository.DBGetActivityLogList()
}

export async function GetActivityLogDomain(id: number) {
    const result = await LogRepository.DBGetActivityLog(id)

    if(result.length < 1) {
        throw new NotFoundError("ACTIVITY_LOG_NOT_FOUND")
    }

    return result[0]
}