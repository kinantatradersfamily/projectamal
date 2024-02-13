import fp from 'fastify-plugin'
import router from '../routes/router'
import { ValidationError } from 'yup'
import { RequestError } from '../utils/error'

export default fp(async (server) => {
    server.setErrorHandler((error, request, reply) => {
        if(error instanceof ValidationError) {
            throw new RequestError(error.message)
        } else {
            throw error
        }
    })

    await server.register(router)
})