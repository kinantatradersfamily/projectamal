import { RouteOptions } from "fastify";
import fp from "fastify-plugin"
import * as ContentController from "../controller/ContentController";
import { createStorage } from "../utils/upload";

const upload = createStorage()

const routes: RouteOptions[] = [
    {
        method: ['GET'],
        url: "/contents",
        schema: {
            summary: "Get Content List",
        },
        handler: ContentController.getTemplateListHandler
    },
    {
        method: ["GET"],
        url: '/contents/:template_id',
        schema: {
            summary: "Get Content Details",
        },
        handler: ContentController.getTemplateHandler
    },
    {
        method: ["POST"],
        url: "/contents",
        schema: {
            summary: "Add Carrousel",
        },
        preHandler: upload.single('carrousel'),
        handler: ContentController.addContentHandler
    },
    {
        method: ["POST"],
        url: "/contents/edit",
        schema: {
            summary: "Edit Template",
        },
        preHandler: upload.any(),
        handler: ContentController.editTemplateHandler
    },
    {
        method: ["GET"],
        url: '/carrousel/:id',
        schema: {
            summary: "Get Carrousel Details",
        },
        handler: ContentController.getCarrouselDetailsHandler
    },
    {
        method: ["POST"],
        url: "/carrousel/edit",
        schema: {
            summary: "Edit Carrousel",
        },
        preHandler: upload.single('carrousel'),
        handler: ContentController.editCarrouselHandler
    },
    {
        method: ["GET"],
        url: "/carrousel",
        schema: {
            summary: "Get Carrousel List",
        },
        handler: ContentController.getCarrouselListHandler
    }
]

export default fp(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})

