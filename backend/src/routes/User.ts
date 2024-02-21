import * as userController from "../controller/UserController";
import { RouteOptions } from "fastify";
import fp from "fastify-plugin"
import { createStorage } from "../utils/upload";
import * as Auth from "../application/middleware/auth";

const upload = createStorage()

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/users/:id",
        summary: "Get User Details",
        handler: userController.getUserHandler
    },
    {
        method: ["POST"],
        url: "/login",
        summary: "Login",
        handler: userController.loginHandler
    },
    {
        method: ["POST"],
        url: "/users",
        summary: "Create User",
        preHandler: upload.single('carrousel'),
        handler: userController.createUserHandler
    },
    {
        method: ["PUT"],
        url: "/users/:id",
        summary: "Update User",
        handler: userController.updateUserHandler
    },
    {
        method: ["GET"],
        url: '/users/verify',
        summary: "Verify User",
        preHandler: Auth.CheckAuth,
        handler: userController.verifyUser
    }
]

export default fp(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})

