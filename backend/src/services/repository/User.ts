import db from '../../../ormconfig'
import { CreatePayload, UpdatePayload } from '../models/User/type'

export async function DBGetUserById(user_id: number) {
    return db.query(`SELECT * FROM users WHERE id = ?`, [user_id])
}

export async function DBGetUserByUsername(username: string) {
    return db.query(`SELECT * FROM users WHERE username = ?`, [username])
}

export async function DBCreateUser({ password, username }: CreatePayload) {
    const values = [
        [username, password]
    ]

    const query = await db.query(`
        INSERT INTO users (username, password) VALUES ?
    `, [values])

    return query
}

export async function DBUpdateUser({ password, username, id }: UpdatePayload) {
    const values = [
        [username, password, id]
    ]

    const query = await db.query(`UPDATE users SET username = ?, password = ? WHERE id = ?`, [values])

    return query
}