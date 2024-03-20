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

export async function approveEventHandler(request: FastifyRequest) {
    try {
        const { id, is_approved, reason } = request.body as EventDto.ApproveEvent
        const message = await EventService.ApproveEventServiceApp({ id, is_approved, reason })
        return { message }
    } catch (error) {
        throw error        
    }
}

export async function approveEventListHandler() {
    try {
        const message = await EventService.ApproveEventListServiceApp()
        return { message }
    } catch (error) {
        throw error
    }
}

export async function editEventHandler(request: FastifyRequest) {
    try {
        const { address, description, end_date, id, image, start_date, status, title, wilayah_id } = request.body as EventDto.EditEventRequest
        const message = await EventService.EditEventServiceApp({ address, description, end_date, id, image, start_date, status, title, wilayah_id })
        return { message }
    } catch (error) {
        throw error   
    }
}