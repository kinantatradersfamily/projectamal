import multer from "fastify-multer"
import moment from "moment"
import { RequestError } from "./error"

export function createStorage() {
    const options = multer.diskStorage({
        destination: (req, file, cb) => {
            let dest = ''
            if(file.fieldname === 'carrousel') {
                dest = 'public/carrousel'
            } else {
                cb(new RequestError('FIELD_NOT_REGISTERED'), dest)
            }

            cb(null, dest)
        },
        filename: (req, file, cb) => {
            const filename = `${file.fieldname}-${moment().unix()}.${file.originalname}`
            cb(null, filename)
        }
    })

    return multer({ storage: options, })
}