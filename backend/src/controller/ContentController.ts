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
        const { template_id } = request.body as ContentDto.AddCarrouselRequest
        const message = await ContentService.AddCarrouselServiceApp({ content: request.files, template_id })
        return { message }
    } catch (error) {
        throw error
    }
}