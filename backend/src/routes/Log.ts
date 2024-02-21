import { RouteOptions } from "fastify";
import fp from "fastify-plugin"
import * as LogController from "../controller/LogController";
import * as Auth from "../application/middleware/Auth";
import * as Log from "../application/middleware/Log";

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/logs",
        schema: {
            summary: "Get Activity Log List"
        },
        handler: LogController.getActivityLogHandler
    },
    {
        method: ["GET"],
        url: "/logs/:id",
        schema: {
            summary: "Get Activity Log Details"
        },
        handler: LogController.activityLogDetailsHandler
    }
]

export default fp(async (server) => {
    server.addHook('preHandler', Auth.CheckAuth)
    server.addHook('preHandler', Log.ActivityLogging)
    for (const route of routes) {
        server.route({ ...route })
    }
})

