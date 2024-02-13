import 'dotenv/config'
import db from '../ormconfig'
import router from "./application/routes";
import fastify from "fastify"

const PORT = 3000;
const server = fastify()

async function main() {
  try {
    await db.initialize()
    await server.register(router)
    await server.listen({ port: PORT })

    console.log(`Server is running on http://localhost:${PORT}`)
  } catch (error) {
    server.log.error(error)
  }
}

main()




