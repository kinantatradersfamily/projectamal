import { FastifyInstance, RouteOptions } from "fastify";
import * as ReportController from "../controller/ReportController";
import * as UserController from "../controller/UserController";
import * as Auth from "../application/middleware/Auth";
import * as Log from "../application/middleware/Log";

const routes: RouteOptions[] = [
    {
        method: ["POST"],
        url: "/reports/create",
        schema: {
            summary: "Create Report",
        },
        preHandler: [Auth.CheckAuth, Log.ActivityLogging],
        handler: ReportController.createReportHandler
    },
    {
        method: ["GET"],
        url: '/reports/:id',
        schema: {
            summary: "Get Report Details",
        },
        preHandler: [Auth.CheckAuth, Log.ActivityLogging],
        handler: ReportController.getReportDetailsHandler
    },
    {
        method: ["POST"],
        url: "/login",
        schema: {
            summary: "Login",
        },
        handler: UserController.loginHandler
    },
    {
        method: ["GET"],
        url: '/users/verify',
        schema: {
            summary: "Verify User",
        },
        preHandler: [Auth.CheckAuth, Log.ActivityLogging],
        handler: UserController.verifyUser
    }
]

export default async function ManagerRoutes(server: FastifyInstance) {
    for (const route of routes) {
        server.route({ ...route })
    }
}

