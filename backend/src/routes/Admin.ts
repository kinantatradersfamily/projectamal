import { FastifyInstance, RouteOptions } from "fastify";
import * as ReportController from "../controller/ReportController";
import * as EventController from "../controller/EventController";
import * as ContentController from "../controller/ContentController";
import * as Auth from "../application/middleware/Auth";
import * as Log from "../application/middleware/Log";
import { Role } from "../services/models/User";
import { createStorage } from "../utils/upload";

const upload = createStorage()

const routes: RouteOptions[] = [
    {
        method: ["POST"],
        url: "/reports/edit",
        schema: {
            summary: "Edit Report",
        },
        handler: ReportController.editReportHandler
    },
    {
        method: ["POST"],
        url: "/contents/events/create",
        schema: {
            summary: "Create Content Event"
        },
        handler: ContentController.createEventHandler
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
    },
    {
        method: ["POST"],
        url: "/contents/events/edit",
        schema: {
            summary: "Edit Content Event"
        },
        handler: ContentController.editEventHandler
    },
    {
        method: ["GET"],
        url: "/reports",
        schema: {
            summary: "Get Report List",
        },
        // preHandler: [Auth.CheckAuth, Log.ActivityLogging],
        handler: ReportController.getReportListHandler
    },
    {
        method: ["GET"],
        url: "/admin/events",
        schema: {
            summary: "Event List"
        },
        handler: EventController.adminEventListHandler
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

