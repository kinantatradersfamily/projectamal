import multer from "fastify-multer"
import moment from "moment"
import { RequestError } from "./error"

export function createStorage() {
    const options = multer.diskStorage({
        destination: (req, file, cb) => {
            let dest = ''
            if(file.fieldname === 'carrousel') {
                dest = 'public/carrousel'
            } else if (file.fieldname == 'profile') {
                dest = 'public/profile'
            } else {
                cb(new RequestError('FIELD_NOT_REGISTERED'), dest)
            }

            cb(null, dest)
        },
        filename: (req, file, cb) => {
            const fileext = file.originalname.split(".")
            const ff = file.originalname.replace(/\s+/g, '-').toLocaleLowerCase()
            const filename = `${ff}-${file.fieldname}-${moment().unix()}.${fileext[fileext.length - 1 ]}`
            cb(null, filename)
        }
    })

    return multer({ storage: options })
}