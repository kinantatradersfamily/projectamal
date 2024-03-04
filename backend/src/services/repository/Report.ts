import { ResultSetHeader } from "mysql2";
import db from "../../../ormconfig";
import * as ReportDto from "../models/Report";


export async function DBGetReportList() {
    return await db.query<ReportList>(`SELECT id, topic, event, pemateri, created_at FROM report_attendance ORDER BY created_at DESC`)
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
    const query = await db.query<ReportDto.Report[]>(`SELECT id, topic, pemateri, description, event, total_amal, total_attendance, date, wilayah_id, created_at, updated_at FROM report_attendance`, [id])
    return query
}

export async function DBEditReport({ date, description, event = 1, id, pemateri, topic, total_amal, total_attendance }: ReportDto.EditPayload) {
    const values = [topic, description, pemateri, event, total_amal, total_attendance, date, id]
    const query = await db.query<ResultSetHeader>(`
        UPDATE report_attendance SET topic = ?, description = ?, pemateri = ?, event = ?, total_amal = ?, total_attendance = ?, date = ? WHERE id = ?
    `, values)

    return query
}