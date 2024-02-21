import { RouteOptions } from "fastify";
import fp from "fastify-plugin"
import * as ReportController from "../controller/ReportController";
import * as Auth from "../application/middleware/Auth";
import * as Log from "../application/middleware/Log";

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
        url: "/reports/create",
        schema: {
            summary: "Create Report",
        },
        preHandler: Auth.CheckAuth,
        handler: ReportController.createReportHandler
    },
    {
        method: ["GET"],
        url: '/reports/:id',
        schema: {
            summary: "Get Report Details",
        },
        handler: ReportController.getReportDetailsHandler
    },
    {
        method: ["POST"],
        url: "/reports/edit",
        schema: {
            summary: "Edit Report",
        },
        handler: ReportController.editReportHandler
    }
]

export default fp(async (server) => {
    server.addHook("preHandler", Auth.CheckAuth)
    server.addHook("preHandler", Log.ActivityLogging)
    for (const route of routes) {
        server.route({ ...route })   
    }
})

