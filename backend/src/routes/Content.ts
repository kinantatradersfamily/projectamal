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
        preHandler: upload.single('carrousel'),
        handler: ContentController.addContentHandler
    },
    {
        method: ["POST"],
        url: "/contents/edit",
        preHandler: upload.any(),
        handler: ContentController.editTemplateHandler
    },
    {
        method: ["GET"],
        url: '/carrousel/:id',
        handler: ContentController.getCarrouselDetailsHandler
    },
    {
        method: ["POST"],
        url: "/carrousel/edit",
        preHandler: upload.single('carrousel'),
        handler: ContentController.editCarrouselHandler
    },
    {
        method: ["GET"],
        url: "/carrousel",
        handler: ContentController.getCarrouselListHandler
    }
]

export default fp(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})

