import { ResultSetHeader } from "mysql2";
import db from "../../../ormconfig";
import * as LogDto from "../models/Log";

export async function DBCreateActivityLog({ action, url, user_id, params, ip }: LogDto.CreatePayload) {
    const values = [
        [action, url, user_id, params, ip]
    ]

    const query = await db.query<ResultSetHeader>(`
        INSERT INTO activity_log (action, url, user_id, params, ip) VALUES ?
    `, [values])

    return query
}

export async function DBGetActivityLogList() {
    return await db.query<LogDto.ActivityLogList>(`SELECT id, action, url FROM activity_log`)
}

export async function DBGetActivityLog(id: number) {
    return await db.query<LogDto.ActivityLogDetails[]>(`SELECT al.id, al.action, al.url, al.params, al.user_id, u.username FROM activity_log al LEFT JOIN users u ON u.id = al.user_id WHERE u.id = ?`, [id])
}