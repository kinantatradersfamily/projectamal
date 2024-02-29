import * as EventDomainService from "../../services/domain/Event";
import * as ContentDomainService from "../../services/domain/Content";
import * as EventDto from "../../services/models/Event";
import { NotFoundError } from "../../utils/error";

export async function EventListServiceApp() {
    const event = await EventDomainService.EventListDomain()
    return event
}

export async function GetEventDetailsServiceApp(payload: EventDto.GetEventDetailsServiceApp) {
    await EventDto.getEventDetailsRequest.validate(payload)

    const { event_id } = payload

    const event = await EventDomainService.GetEventDetailsDomain(event_id)

    if(!event) {
        throw new NotFoundError("EVENT_NOT_FOUND")
    }

    const content = await ContentDomainService.GetEventDetailsDomain(event_id)

    return { ...event, items: content }
}

export async function CreateEventServiceApp(payload: EventDto.CreateEventServiceApp) {
    await EventDto.createEventRequest.validate(payload)

    const { image, ...data } = payload

    await EventDomainService.CreateEventDomain({ image_url: image.path as string, ...data })

    return true
}

export async function EditEventServiceApp(payload: EventDto.EditEventServiceApp) {
    await EventDto.editEventRequest.validate(payload)

    const { image, address, description, end_date, start_date, title, id, status } = payload

    const event = await EventDomainService.CheckEventExistDomain(id)

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