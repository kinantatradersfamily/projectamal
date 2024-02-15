import 'dotenv/config'
import router from "./application/routes";
import fastify from "fastify"
import config from './application/config';
import { ValidationError } from 'yup';

const server = fastify()

async function main() {
  try {
    await server.register(config)
    await server.register(router)
    await server.listen({ port: process.env.NODE_PORT, host: process.env.NODE_HOST })

    console.log(`Server is running on http://localhost:${process.env.NODE_PORT}`)
  } catch (error) {
    if(error instanceof ValidationError) {
      throw new Error(error.message)
    } else {
      console.error(error)
    }
  }
}

main()




