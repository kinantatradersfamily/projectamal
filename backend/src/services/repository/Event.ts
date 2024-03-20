import { ResultSetHeader } from "mysql2";
import db from "../../../ormconfig";
import * as EventDto from "../models/Event";
import moment from "moment";

export async function DBEventList({ wilayah_id }: EventDto.EventListParams) {
    return await db.query<EventDto.EventList[]>(`SELECT id, title, address, start_date, end_date, created_at FROM events WHERE wilayah_id IN (?) AND is_approved = 1`, [wilayah_id])
}

export async function DBCreateEvent({ description, end_date, start_date, title, address, image_url, wilayah_id }: EventDto.CreatePayload) {
    const values = [
        [title, description, address, start_date, end_date, image_url, wilayah_id]
    ]
    const query = await db.query<ResultSetHeader>(`
        INSERT INTO events (title, description, address, start_date, end_date, image_url, wilayah_id) VALUES ?
    `, [values])

    return query
}

export async function DBGetEvent(id: number) {
    return await db.query<EventDto.Event[]>(`SELECT * FROM events WHERE id = ?`, [id])
}

export async function DBEditEvent({ status, address, description, end_date, id, image_url, start_date, title }: EventDto.EditPayload) {
    const values = [title, description, address, start_date, end_date, status, image_url, moment().unix(), id]
    const query = await db.query<ResultSetHeader>(`UPDATE events SET title = ?, description = ?, address = ?, start_date = ?, end_date = ?, status = ?, image_url = ?, updated_at = ? WHERE id = ?`, values)
    return query
}

export async function DBGetEventActive() {
    return await db.query<EventDto.Event[]>(`SELECT * FROM events WHERE status = 1 LIMIT 1`)
}

export async function DBApproveEvent({ id, is_approved, reason }: EventDto.ApproveEvent) {
    const values = [is_approved, reason, moment().unix() ,id]
    const query = await db.query<ResultSetHeader>(`UPDATE events SET is_approved = ?,s reason = ?, approved_at = ? WHERE id = ?`, values)
    return query
}

export async function DBApproveEventList() {
    return await db.query('SELECT * FROM events WHERE is_approved = 0')
}