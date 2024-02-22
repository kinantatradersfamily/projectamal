import { FastifyInstance, RouteOptions } from "fastify";
import * as ReportController from "../controller/ReportController";
import * as Auth from "../application/middleware/Auth";
import * as Log from "../application/middleware/Log";
import { Role } from "../services/models/User";

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/reports",
        schema: {
            summary: "Get Report List",
        },
        handler: ReportController.getReportListHandler
    },
    {
        method: ["POST"],
        url: "/reports/edit",
        schema: {
            summary: "Edit Report",
        },
        handler: ReportController.editReportHandler
    },
]

export default async function AdminRoutes(server: FastifyInstance) {
    server.addHook("preHandler", Auth.CheckAuth)
    server.addHook('preHandler', Auth.CheckRoles(Role.SUPER_ADMIN, Role.ADMIN))
    server.addHook("preSerialization", Log.ActivityLogging)
    for (const route of routes) {
        server.route({ ...route })
    }
}

