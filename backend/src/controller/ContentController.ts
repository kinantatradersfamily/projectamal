import { FastifyReply, FastifyRequest } from "fastify";
import * as ContentService from "../application/services/Content";
import * as ContentDto from "../services/models/Content";

export async function getTemplateListHandler() {
    try {
        const message = await ContentService.GetTemplateListServiceApp()

        return { message }
    } catch (error) {
        throw error
    }
}

export async function getTemplateHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const body = request.params as ContentDto.GetTemplateRequest
        const message = await ContentService.GetTemplateServiceApp(body)
        return { message }
    } catch (error) {
        throw error
    }
}

export async function addContentHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { description, title } = request.body as ContentDto.AddCarrouselRequest
        const message = await ContentService.AddCarrouselServiceApp({ content: request.file, description, title })
        return { message }
    } catch (error) {
        throw error
    }
}

export async function editCarrouselHandler(request: FastifyRequest) {
    try {
        const { description, id, title, active } = request.body as ContentDto.EditCarrouselRequest

        const message = await ContentService.EditCarrouselServiceApp({ image: request.file, description, title, id, active })

        return { message }
    } catch (error) {
        throw error
    }
}

export async function editTemplateHandler(request: FastifyRequest) {
    try {
        const { image, ...body } = request.body as ContentDto.EditTemplateRequest
        const file = request.file
        const message = await ContentService.EditTemplateServiceApp({ ...body, image: file })

        return { message }
    } catch (error) {
        throw error   
    }
}

export async function getCarrouselListHandler() {
    try {
        const message = await ContentService.GetCarrouselListServiceApp()
        return { message }
    } catch (error) {
        throw error
    }
}

export async function getCarrouselDetailsHandler(request: FastifyRequest) {
    try {
        const params = request.params as ContentDto.GetCarrouselDetailsRequest
        const message = await ContentService.GetCarrouselDetailsServiceApp(params)

        return { message }
    } catch (error) {
        throw error
    }
}