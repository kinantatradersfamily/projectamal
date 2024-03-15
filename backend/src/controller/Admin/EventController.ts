import * as EventService from "@application/services/Event";
import * as EventDto from "@models/Event";
import { FastifyRequest } from "fastify";


export async function createEventHandler(request: FastifyRequest) {
    try {
        const file = request.file
        const { address, description, end_date, start_date, title, wilayah_id  } = request.body as EventDto.AdminCreateEventRequest
        const message = await EventService.CreateEventServiceApp({ address, description, end_date, image: file, start_date, title, wilayah_id })
        return { message }
    } catch (error) {
        throw error
    }
}

export async function getEventListHandler(request: FastifyRequest) {
    try {
        const user = request.user
        const wilayah = await user.getAccessWilayah()
        const message = await EventService.EventListServiceApp({ wilayah_id: wilayah })

        return { message }
    } catch (error) {
        throw error
    }
}