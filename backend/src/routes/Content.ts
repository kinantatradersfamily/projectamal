import { RouteOptions } from "fastify";
import fp from "fastify-plugin"
import * as ContentController from "../controller/ContentController";
import { createStorage } from "../utils/upload";

const upload = createStorage()


const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: '/contents',
        handler: ContentController.getContentHandler
    },
    {
        method: ["POST"],
        url: "/contents",
        preHandler: upload.array('carrousel', 5),
        handler: ContentController.addContentHandler
    }
]

export default fp(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})

