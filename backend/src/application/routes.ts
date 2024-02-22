import fp from 'fastify-plugin'
import { ValidationError } from 'yup'
import { RequestError } from '../utils/error'
import fastifyMulter, { MulterError } from 'fastify-multer'
import fastifyStatic from '@fastify/static'
import path from 'path'
import fastifyCors from '@fastify/cors'
import { File } from 'fastify-multer/lib/interfaces'
import fastifyFormbody from '@fastify/formbody'
import AdminRoutes from '../routes/Admin'
import SuperAdminRoutes from '../routes/SuperAdmin'
import ManagerRoutes from '../routes/Manager'

export default fp(async (server) => {
    await server.register(fastifyCors, {
        origin: "*"
    })

    server.setErrorHandler(async (error, request, reply) => {
        if(error instanceof ValidationError) {
            throw new RequestError(error.message)
        } else if(error instanceof MulterError) {
            throw new RequestError(error.message)
        } else {
            throw error
        }
    })

    await server.register(fastifyStatic, {
        root: path.join(__dirname, '../../public'),
        prefix: '/public',
        cacheControl: true
    })

    await server.register(fastifyFormbody)
    await server.register(fastifyMulter.contentParser)
    await server.register(SuperAdminRoutes)
    await server.register(ManagerRoutes)
    await server.register(AdminRoutes)
})

declare module 'fastify' {
    export interface FastifyRequest {
        files: File[]
        file: File
    }

    export interface FastifySchema {
        summary: string
    }
}