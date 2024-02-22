import { FastifyInstance, RouteOptions } from "fastify";
import * as LogController from "../controller/LogController";
import * as UserController from "../controller/UserController";
import * as ContentController from "../controller/ContentController";
import * as Auth from "../application/middleware/Auth";
import * as Log from "../application/middleware/Log";
import { Role } from "../services/models/User";
import { createStorage } from "../utils/upload";

const upload = createStorage()

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/logs",
        schema: {
            summary: "Get Activity Log List"
        },
        preHandler: [Auth.CheckRoles(Role.SUPER_ADMIN)],
        handler: LogController.getActivityLogHandler
    },
    {
        method: ["GET"],
        url: "/logs/:id",
        schema: {
            summary: "Get Activity Log Details"
        },
        preHandler: Auth.CheckRoles(Role.SUPER_ADMIN),
        handler: LogController.activityLogDetailsHandler
    },
    {
        method: ["POST"],
        url: "/users/edit",
        schema: {
            summary: "Update User",
        },
        preHandler: upload.single('profile'),
        handler: UserController.updateUserHandler
    },
    {
        method: ["POST"],
        url: "/users",
        schema: {
            summary: "Create User",
        },
        preHandler: upload.single('profile'),
        handler: UserController.createUserHandler
    },
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
    },
    {
        method: ["GET"],
        url: "/users",
        handler: UserController.getUserListHandler
    }
]

export default async function SuperAdminRoutes(server: FastifyInstance) {
    server.addHook('preHandler', Auth.CheckAuth)
    server.addHook('preHandler', Auth.CheckRoles(Role.SUPER_ADMIN))
    server.addHook('preSerialization', Log.ActivityLogging)
    for (const route of routes) {   
        server.route({ ...route })
    }
}

