import { FastifyInstance, RouteOptions } from "fastify";
import * as ReportController from "../controller/ReportController";
import * as ContentController from "../controller/ContentController";
import * as UserController from "../controller/UserController";
import * as Auth from "../application/middleware/Auth";
import * as Log from "../application/middleware/Log";
import * as EventController from "../controller/EventController";
import { createStorage } from "@utils/upload";

const upload = createStorage()

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
        handler: UserController.verifyUser,
    },
    {
        method: ["POST"],
        url: "/events/create",
        schema: {
            summary: "Create Event"
        },
        preHandler: [upload.single('events'), Auth.CheckAuth, Log.ActivityLogging],
        handler: EventController.createEventHandler
    },
    {
        method: ["POST"],
        url: "/events/edit",
        schema: {
            summary: "Edit Event",
        },
        preHandler: [upload.single('events'), Auth.CheckAuth, Log.ActivityLogging],
        handler: EventController.editEventHandler
    },
    {
        method: ["GET"],
        url: "/events",
        schema: {
            summary: "Event List"
        },
        preHandler: [Auth.CheckAuth, Log.ActivityLogging],
        handler: EventController.eventListHandler
    },
    {
        method: ["GET"],
        url: "/events/:event_id",
        schema: {
            summary: "Get Event Details"
        },
        preHandler: [Auth.CheckAuth, Log.ActivityLogging],
        handler: EventController.getEventDetailsHandler
    },
    {
        method: ["GET"],
        url: "/contents/active",
        handler: ContentController.getActiveContentHandler
    }
]

export default async function ManagerRoutes(server: FastifyInstance) {
    for (const route of routes) {
        server.route({ ...route })
    }
}

