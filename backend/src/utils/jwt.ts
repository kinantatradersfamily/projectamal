import jwt from "jsonwebtoken"
import { User } from "../services/models/User"

type SignPayload = {
    payload: User
    expiresIn?: string
}

export function signToken({ payload, expiresIn = '1d' }: SignPayload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
        expiresIn
    })

    return token
}

export function verifyToken(token: string): User {
    return jwt.verify(token, process.env.SECRET_KEY as string) as User
}