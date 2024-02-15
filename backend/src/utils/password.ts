import bcrypt from "bcrypt"

type VerifyPayload = {
    password: string
    hash: string
}

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

export function verify({ hash, password }: VerifyPayload) {
    return bcrypt.compareSync(password, hash)
}