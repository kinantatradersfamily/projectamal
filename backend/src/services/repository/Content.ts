import { ResultSetHeader } from 'mysql2'
import db from '../../../ormconfig'
import { Carrousel, CreatePayload, EditCarrousel, Template } from '../models/Content'
import { QueryRunner } from 'typeorm'

export async function DBGetContent() {
    const query = await db.query<Template[]>(`SELECT ct.id, ct.name, ct.description, ct.active, ct.created_at, ct.updated_at FROM cms_template ct`)
    return query
}

export async function DBGetTemplateById(template_id: number) {
    return await db.query<Template[]>(`SELECT * FROM cms_template WHERE id = ?`, [template_id])
}

export async function DBGetCarrousel(template_id: number) {
    return await db.query<Carrousel[]>(`SELECT * FROM cms_carrousel cc WHERE cc.template_id = ?`, [template_id])
}

export async function DBAddCarrousel({ content, url, template_id }: CreatePayload) {
    const values = [
        [content, url, template_id]
    ]
    const query = await db.query<ResultSetHeader>(`INSERT INTO cms_carrousel (content, url, template_id) VALUES ?`, [values])
    return query
}

export async function DBEditCarrousel({ id, status }: EditCarrousel, queryRunner?: QueryRunner) {
    const values = [
        [status, id]
    ]
    return await db.query<ResultSetHeader>(`UPDATE cms_carrousel SET status = ? WHERE id = ?`, [values], queryRunner)
}