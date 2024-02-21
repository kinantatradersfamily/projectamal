import { RouteOptions } from "fastify";
import fp from "fastify-plugin"
import * as ReportController from "../controller/ReportController";
import * as Auth from "../application/middleware/auth";

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/reports",
        summary: "Get Report List",
        handler: ReportController.getReportListHandler
    },
    {
        method: ["POST"],
        url: "/reports",
        summary: "Create Report",
        preHandler: Auth.CheckAuth,
        handler: ReportController.createReportHandler
    },
    {
        method: ["GET"],
        url: '/reports/:id',
        summary: "Get Report Details",
        handler: ReportController.getReportDetailsHandler
    },
    {
        method: ["POST"],
        url: "/reports/edit",
        summary: "Edit Report",
        handler: ReportController.editReportHandler
    }
]

export default fp(async (server) => {
    for (const route of routes) {
        server.route({ ...route })   
    }
})

