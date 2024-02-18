import { FastifyReply, FastifyRequest } from "fastify";
import * as ContentService from "../application/services/Content";

export async function getContentHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const message = await ContentService.GetContentServiceApp()
        return { message }
    } catch (error) {
        throw error
    }
}

export async function addContentHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const message = await ContentService.AddContentServiceApp({ content: request.files })
        return { message }
    } catch (error) {
        throw error
    }
}