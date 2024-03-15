import { ResultSetHeader } from "mysql2";
import db from "../../../ormconfig";
import * as ReportDto from "../models/Report";


export async function DBGetReportList(wilayah_id: string) {
    return await db.query<ReportList>(`
        SELECT ra.id, ra.topic, ra.event, ra.pemateri, ra.created_at 
            FROM report_attendance ra 
            INNER JOIN events e ON e.id = ra.event_id
            WHERE e.wilayah_id IN (?)
            ORDER BY ra.created_at DESC
    `, [wilayah_id])
}

export async function DBCreateReport({ date, description, event = 1, pemateri, topic, total_amal, total_attendance, event_id }: ReportDto.CreatePayload) {
    const values = [
        [date, description, event, pemateri, topic, total_amal, total_attendance, event_id]
    ]

    const query = await db.query<ResultSetHeader>(`
        INSERT INTO report_attendance (date, description, event, pemateri, topic, total_amal, total_attendance, event_id) VALUES ?
    `, [values])

    return query
}

export async function DBGetReportById(id: number) {
    const query = await db.query<ReportDto.Report[]>(`SELECT id, topic, pemateri, description, event, total_amal, total_attendance, date, created_at, updated_at FROM report_attendance`, [id])
    return query
}

export async function DBEditReport({ date, description, event = 1, id, pemateri, topic, total_amal, total_attendance }: ReportDto.EditPayload) {
    const values = [topic, description, pemateri, event, total_amal, total_attendance, date, id]
    const query = await db.query<ResultSetHeader>(`
        UPDATE report_attendance SET topic = ?, description = ?, pemateri = ?, event = ?, total_amal = ?, total_attendance = ?, date = ? WHERE id = ?
    `, values)

    return query
}