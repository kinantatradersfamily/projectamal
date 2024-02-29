import { FastifyRequest } from "fastify";
import * as EventDto from "../services/models/Event";
import * as EventService from "../application/services/Event";

export async function eventListHandler() {
    try {
        const message = await EventService.EventListServiceApp()
        return { message }
    } catch (error) {
        throw error
    }
}

export async function createEventHandler(request: FastifyRequest) {
    try {
        const image = request.file
        const { address, description, end_date, start_date, title } = request.body as EventDto.CreateEventRequest   
        const message = await EventService.CreateEventServiceApp({ address, description, end_date, image, start_date, title })

        return { message }
    } catch (error) {
        throw error
    }
}

export async function getEventDetailsHandler(request: FastifyRequest) {
    try {
        const params = request.params as EventDto.GetEventDetailsRequest
        const message = await EventService.GetEventDetailsServiceApp(params)

        return { message }
    } catch (error) {
        throw error
    }
}

export async function editEventHandler(request: FastifyRequest) {
    try {
        const file = request.file
        const { image, ...body } = request.body as EventDto.EditEventRequest
        const message = await EventService.EditEventServiceApp({ ...body, image: file })

        return { message }
    } catch (error) {
        throw error   
    }
}