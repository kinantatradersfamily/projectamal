import fp from 'fastify-plugin'
import UserRoutes from '../routes/User'
import ContentRoutes from '../routes/Content'
import { ValidationError } from 'yup'
import { RequestError } from '../utils/error'
import multipart from '@fastify/multipart'
import { MulterError } from 'fastify-multer'
import fastifyStatic from '@fastify/static'
import path from 'path'

export default fp(async (server) => {
    server.setErrorHandler(async (error, request, reply) => {
        if(error instanceof ValidationError) {
            throw new RequestError(error.message)
        } else if(error instanceof MulterError) {
            throw new RequestError(`${error.message} '${error.field}'`)
        } else {
            throw error
        }
    })    

    await server.register(fastifyStatic, {
        root: path.join(__dirname, '../../public'),
        prefix: '/public',
        cacheControl: true
    })
    
    await server.register(multipart)
    await server.register(UserRoutes)
    await server.register(ContentRoutes)
})