import fp from "fastify-plugin"
import db from "../../ormconfig"
import { envSchema } from "../services/models/Common/schema"
import * as yup from "yup"

declare global {
    namespace NodeJS {
        interface ProcessEnv extends yup.InferType<typeof envSchema> {}
    }
}

export default fp(async () => {
    await db.initialize()
    await envSchema.validate(process.env)
})
