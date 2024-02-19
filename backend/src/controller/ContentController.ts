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

export async function editTemplateHandler(request: FastifyRequest) {
    try {
        const { images, ...body } = request.body as ContentDto.EditTemplateRequest
        const files = request.files as typeof images
        const message = await ContentService.EditTemplateServiceApp({ ...body, images: files })

        return { message }
    } catch (error) {
        throw error   
    }
}