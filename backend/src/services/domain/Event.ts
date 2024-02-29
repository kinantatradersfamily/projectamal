import * as EventDto from "../../services/models/Event";
import * as EventRepository from "../../services/repository/Event";
import { NotFoundError, RequestError, ServerError } from "../../utils/error";

export async function EventListDomain() {
    return await EventRepository.DBEventList()
}

export async function CreateEventDomain(payload: EventDto.CreatePayload) {
    const result = await EventRepository.DBCreateEvent(payload)

    if (result.affectedRows < 1) {
        throw new ServerError('FAILED_TO_CREATE_EVENT')
    }

    return result
}

export async function GetEventDetailsDomain(id: number) {
    const result = await EventRepository.DBGetEvent(id)
    return result[0]
}

export async function CheckEventExistDomain(id: number) {
    const result = await EventRepository.DBGetEvent(id)

    if(result.length < 1) {
        throw new NotFoundError("EVENT_NOT_FOUND")
    }

    return result[0]
}

export async function EditEventDomain(payload: EventDto.EditPayload) {
    const result = await EventRepository.DBEditEvent(payload)

    if(result.affectedRows < 1) {
        throw new ServerError("FAILED_EDIT_EVENT")
    }

    return result
}

export async function CheckEventActiveDomain(id: number) {
    const result = await EventRepository.DBGetEventActive()

    if(result.length && result[0].id != id) {
        throw new RequestError("OTHER_EVENT_WAS_ACTIVE_PLEASE_INACTIVATE_OTHER_EVENT")
    }

    return result[0]
}

export async function GetEventActiveDomain() {
    const result = await EventRepository.DBGetEventActive()
    return result[0]
}