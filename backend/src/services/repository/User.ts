import db from '../../../ormconfig'
import { CreatePayload, Roles, UpdatePayload, User, UserList, Wilayah } from '../models/User/type'

export async function DBGetUserById(user_id: number) {
    return db.query<User[]>(`SELECT * FROM users WHERE id = ?`, [user_id])
}

export async function DBGetUserByUsername(username: string) {
    return db.query<User[]>(`SELECT * FROM users WHERE username = ?`, [username])
}

export async function DBCreateUser({ password, username, role_id = 3, profile_img, user_wilayah }: CreatePayload) {
    const values = [
        [username, password, role_id, profile_img, user_wilayah]
    ]

    const query = await db.query(`
        INSERT INTO users (username, password, role_id, profile_img, user_wilayah) VALUES ?
    `, [values])

    return query
}

export async function DBUpdateUser({ username, id, role_id, user_wilayah, profile_img }: UpdatePayload) {
    const values = [username, profile_img, user_wilayah, role_id ,id]

    const query = await db.query(`UPDATE users SET username = ?, profile_img = ?, user_wilayah = ?, role_id = ? WHERE id = ?`, values)

    return query
}

export async function DBGetUserList() {
    return await db.query<UserList>(`SELECT id, username, role_id, active FROM users`)
}

export async function DBGetAccessWilayah(user_id: number) {
    return await db.query<Array<{ access_wilayah: string }>>(`SELECT GROUP_CONCAT(u.wilayah_id SEPARATOR ',') access_wilayah FROM 
	((SELECT u.id user_id, u.username, uwa.wilayah_id FROM users u
			iNNER JOIN user_wilayah_access uwa ON uwa.role_id = u.role_id WHERE u.user_wilayah IS NULL)
		UNION
	(SELECT u.id user_id, u.username, uwa.wilayah_id FROM users u
			iNNER JOIN user_wilayah_access uwa ON uwa.wilayah_id  = u.user_wilayah WHERE u.user_wilayah IS NOT NULL)) u
	WHERE u.user_id = ?
	GROUP BY u.user_id
`, [user_id])
}

export async function DBGetWilayahList() {
    return await db.query<Wilayah[]>(`SELECT * FROM user_wilayah`)
}

export async function DBGetWilayah(id: number) {
    return await db.query<Wilayah[]>('SELECT * FROM user_wilayah WHERE id = ?', [id])
}

export async function DBGetRoleList() {
    return await db.query<Roles[]>(`SELECT * FROM roles`)
}

export async function DBGetRole(id: number) {
    return await db.query<Roles[]>(`SELECT * FROM roles WHERE id = ?`, [id])
}