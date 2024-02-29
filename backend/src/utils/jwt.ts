import jwt from "jsonwebtoken"
import { User } from "../services/models/User"

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

export function verifyToken(token: string): User {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string) as User
}