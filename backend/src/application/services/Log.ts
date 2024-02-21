import * as LogDomainService from "../../services/domain/Log"
import * as LogDto from "../../services/models/Log"

export async function GetActivityLogListServiceApp() {
    const log = await LogDomainService.GetActivityLogListDomain()
    return log
}

export async function GetActivityLogServiceApp(payload: LogDto.GetActivityLogServiceApp) {
    await LogDto.getActivityLogRequest.validate(payload)
    const log = await LogDomainService.GetActivityLogDomain(payload.id)
    return log
}