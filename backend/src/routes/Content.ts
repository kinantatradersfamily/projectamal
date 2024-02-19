import { RouteOptions } from "fastify";
import fp from "fastify-plugin"
import * as ContentController from "../controller/ContentController";
import { createStorage } from "../utils/upload";

const upload = createStorage()

const routes: RouteOptions[] = [
    {
        method: ['GET'],
        url: "/contents",
        handler: ContentController.getTemplateListHandler
    },
    {
        method: ["GET"],
        url: '/contents/:template_id',
        handler: ContentController.getTemplateHandler
    },
    {
        method: ["POST"],
        url: "/contents",
        preHandler: upload.array('carrousel'),
        handler: ContentController.addContentHandler
    }
]

export default fp(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})

