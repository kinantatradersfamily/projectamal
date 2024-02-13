import * as userController from "../controller/UserController";
import multer from "multer"
import express from "express"
import { RouteOptions } from "fastify";
import fp from "fastify-plugin"

const router = express.Router()
const upload = multer({ dest: 'public/' })


const routes: RouteOptions[] = [
    {
        method: ["POST"],
        url: "/users/:id",
        handler: userController.getUser
    },
    {
        method: ["POST"],
        url: "/login",
        handler: userController.login
    },
    {
        method: ["POST"],
        url: "/users",
        handler: userController.createUser
    },
    {
        method: ["PUT"],
        url: "/users/:id",
        handler: userController.updateUser
    },
]

export default fp(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})

