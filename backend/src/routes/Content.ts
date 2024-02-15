import { RouteOptions } from "fastify";
import fp from "fastify-plugin"
import * as ContentController from "../controller/ContentController";


const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: '/contents',
        handler: ContentController.getContentHandler
    }
]

export default fp(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})

