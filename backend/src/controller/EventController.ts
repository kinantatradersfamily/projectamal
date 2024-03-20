import { FastifyRequest } from "fastify";
import * as EventDto from "../services/models/Event";
import * as EventService from "../application/services/Event";

export async function eventListHandler(request: FastifyRequest) {
    try {
        const user = request.user
        const message = await EventService.EventListServiceApp({ wilayah_id: user.user_wilayah })
        return { message }
    } catch (error) {
        throw error
    }
}

export async function adminEventListHandler(request: FastifyRequest) {
    try {
        const user = request.user
        const wilayah = await user.getAccessWilayah()
        const message = await EventService.EventListServiceApp({ wilayah_id: wilayah  })

        return { message }
    } catch (error) {
        throw error
    }
}

export async function createEventHandler(request: FastifyRequest) {
    try {
        const image = request.file
        const user = request.user
        const { address, description, end_date, start_date, title } = request.body as EventDto.CreateEventRequest   
        const message = await EventService.CreateEventServiceApp({ address, description, end_date, image, start_date, title, wilayah_id: user.user_wilayah })

        return { message }
    } catch (error) {
        throw error
    }
}

export async function getEventDetailsHandler(request: FastifyRequest) {
    try {
        const user = request.user
        const { event_id } = request.params as EventDto.GetEventDetailsRequest
        const message = await EventService.GetEventDetailsServiceApp({ event_id, wilayah_id: user.user_wilayah })
        return { message }
    } catch (error) {
        throw error
    }
}

export async function editEventHandler(request: FastifyRequest) {
    try {
        const { user_wilayah: wilayah_id } = request.user
        const file = request.file
        const { image, ...body } = request.body as EventDto.ManagerEditEventRequest
        const message = await EventService.EditEventServiceApp({ ...body, image: file, wilayah_id })

        return { message }
    } catch (error) {
        throw error   
    }
}