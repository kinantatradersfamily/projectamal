import { FastifyReply, FastifyRequest } from "fastify";
import { GetContentServiceApp } from "../application/services/Content";

export async function getContentHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const message = await GetContentServiceApp()

        return { message }
    } catch (error) {
        throw error
    }
}