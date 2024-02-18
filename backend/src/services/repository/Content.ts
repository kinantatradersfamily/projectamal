import { ResultSetHeader } from 'mysql2'
import db from '../../../ormconfig'
import { CreatePayload } from '../models/Content'

export async function DBGetContent() {
    const query = await db.query(`SELECT ct.name, ct.created_at, cc.url FROM cms_template ct LEFT JOIN cms_carrousel cc ON cc.template_id = ct.id WHERE ct.active = 1`)
    return query
}

export async function DBAddContent({ content, url }: CreatePayload) {
    const values = [
        [content, url]
    ]
    const query = await db.query<ResultSetHeader>(`INSERT INTO cms_carrousel (content, url) VALUES ?`, [values])
    return query
}