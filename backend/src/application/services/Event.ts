import * as EventDomainService from "../../services/domain/Event";
import * as ContentDomainService from "../../services/domain/Content";
import * as EventDto from "../../services/models/Event";
import { ForbiddenAccessError, NotFoundError, RequestError } from "../../utils/error";
import * as UserDomainService from "@domain/User";
import moment from "moment";

export async function EventListServiceApp({ wilayah_id }: EventDto.EventListParams) {
    const event = await EventDomainService.EventListDomain({ wilayah_id })
    return event
}

export async function GetEventDetailsServiceApp(payload: EventDto.GetEventDetailsServiceApp) {
    await EventDto.getEventDetailsRequest.validate(payload)

    const { event_id, wilayah_id } = payload

    const event = await EventDomainService.GetEventDetailsDomain(event_id)

    if(!event) {
        throw new NotFoundError("EVENT_NOT_FOUND")
    }

    if(event.wilayah_id !== wilayah_id) {
        throw new RequestError('THIS_EVENT_NOT_BELONGS_TO_YOU')
    }

    const content = await ContentDomainService.GetEventDetailsDomain(event_id)

    return { ...event, items: content }
}

export async function CreateEventServiceApp(payload: EventDto.CreateEventServiceApp) {
    await EventDto.createEventRequest.validate(payload)

    const { image, ...data } = payload

    // Check if the wilayah exists, if not throw NotFoundError
    await UserDomainService.CheckWilayahExistDomain(data.wilayah_id)

    await EventDomainService.CreateEventDomain({ image_url: image.path as string, ...data })

    return true
}

export async function EditEventServiceApp(payload: EventDto.EditEventServiceApp) {
    await EventDto.editEventRequest.validate(payload)

    const { image, address, description, end_date, start_date, title, id, status } = payload

    const event = await EventDomainService.CheckEventExistDomain(id)

    // Checking event edit max time
    if(moment().unix() - event.created_at > process.env.MAX_EDIT_EVENT_TIME) {
        throw new ForbiddenAccessError("EVENT_EDIT_EXPIRED")
    }

    // Check if other event was already active (event only 1 that can be active)
    if(status) {
        await EventDomainService.CheckEventActiveDomain(id)   
    }

    if(image) {
        await EventDomainService.EditEventDomain({ address, description, end_date, id, start_date, title, image_url: image.path as string, status })
    } else {
        await EventDomainService.EditEventDomain({ address, description, end_date, id, start_date, title, image_url: event.image_url, status })
    }

    return true
}