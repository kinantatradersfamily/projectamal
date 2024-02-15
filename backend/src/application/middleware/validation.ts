import { FastifyReply, FastifyRequest } from "fastify";
import { Schema } from "yup";

export function validateBody(schema: Schema) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        await schema.validate(request.body)
    }
}