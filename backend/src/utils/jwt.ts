import jwt from "jsonwebtoken"
import { User } from "../services/models/User"
import { UnathorizedError } from "./error"

export type JwtPayload = { id: number }

type SignPayload = {
    payload: JwtPayload
    expiresIn?: string
}

export function signToken({ payload, expiresIn = '1d' }: SignPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
        expiresIn
    })

    return token
}

export function verifyToken(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(new UnathorizedError(err.message.toUpperCase()))
            } else {
                resolve(decoded as User)
            }
        })
    })

    // return jwt.verify(token, process.env.JWT_SECRET_KEY as string) as User
}