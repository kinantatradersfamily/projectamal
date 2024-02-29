import db from '../../../ormconfig'
import { CreatePayload, UpdatePayload, User, UserList } from '../models/User/type'

export async function DBGetUserById(user_id: number) {
    return db.query<User[]>(`SELECT * FROM users WHERE id = ?`, [user_id])
}

export async function DBGetUserByUsername(username: string) {
    return db.query<User[]>(`SELECT * FROM users WHERE username = ?`, [username])
}

export async function DBCreateUser({ password, username, role_id = 3, profile_img }: CreatePayload) {
    const values = [
        [username, password, role_id, profile_img]
    ]

    const query = await db.query(`
        INSERT INTO users (username, password, role_id, profile_img) VALUES ?
    `, [values])

    return query
}

export async function DBUpdateUser({ password, username, id, profile_img }: UpdatePayload) {
    const values = [
        [username, password, profile_img, id]
    ]

    const query = await db.query(`UPDATE users SET username = ?, password = ?, profile_img = ? WHERE id = ?`, [values])

    return query
}

export async function DBGetUserList() {
    return await db.query<UserList>(`SELECT id, username, role_id, active FROM users`)
}