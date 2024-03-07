import { ResultSetHeader } from 'mysql2'
import db from '../../../ormconfig'
import * as ContentDto from '../models/Content'
import { QueryRunner } from 'typeorm'
import moment from 'moment'

export async function DBGetContentList() {
    const query = await db.query<ContentDto.Template[]>(`SELECT ct.id, ct.name, ct.description, ct.active, ct.created_at, ct.updated_at FROM cms_template ct`)
    return query
}

export async function DBGetTemplateById(template_id: number) {
    return await db.query<ContentDto.Template[]>(`SELECT * FROM cms_template WHERE id = ?`, [template_id])
}

export async function DBGetCarrouselByTemplate(template_id: number) {
    return await db.query<ContentDto.Carrousel[]>(`SELECT * FROM cms_carrousel cc WHERE cc.template_id = ?`, [template_id])
}

export async function DBAddCarrousel({ content, url, template_id, description, title }: ContentDto.CreatePayload) {
    const values = [
        [content, url, title, description ,template_id]
    ]
    const query = await db.query<ResultSetHeader>(`INSERT INTO cms_carrousel (content, url, title, description, template_id) VALUES ?`, [values])
    return query
}

export async function DBEditCarrousel({ id, content, url, description, title, active }: ContentDto.EditCarrousel, queryRunner?: QueryRunner) {
    const values = [content, url, description, title, active ,moment().unix(), id]
    return await db.query<ResultSetHeader>(`UPDATE cms_carrousel SET content = ?, url = ?, description = ?, title = ?, active = ?, updated_at = ? WHERE id = ?`, values, queryRunner)
}

export async function DBGetCarrousel(id: number) {
    return await db.query<ContentDto.Carrousel[]>(`SELECT * FROM cms_carrousel WHERE id = ?`, [id])
}

export async function DBEditTemplate({ active, name, description, id }: ContentDto.EditTemplate, queryRunner?: QueryRunner) {
    const values = [name, active, description, moment().unix(), id]
    return await db.query<ResultSetHeader>(`UPDATE cms_template SET name = ?, active = ?, description = ?, updated_at = ? WHERE id = ?`, values, queryRunner)
}

export async function DBGetCarrouselList() {
    return await db.query<ContentDto.Carrousel[]>(`SELECT id, content, title, active, created_at FROM cms_carrousel`)
}

export async function DBCreateEvent({ description, title, event_id }: ContentDto.CreateEvent) {
    const values = [
        [event_id, description, title]
    ]

    const query = await db.query<ResultSetHeader>(`
        INSERT INTO cms_event (event_id, description, title) VALUES ?
    `, [values])

    return query
}

export async function DBGetEventByEvent(id: number) {
    return await db.query(`SELECT * FROM cms_event WHERE event_id = ?`, [id])
}

export async function DBEditEvent({ description, id, title }: ContentDto.EditEvent) {
    const values = [description, title, moment().unix() ,id]
    const query = await db.query<ResultSetHeader>(`UPDATE cms_event SET description = ?, title = ?, updated_at = ? WHERE id = ?`, values)
    return query
}

export async function DBGetActiveCarrousel() {
    return await db.query<ContentDto.Carrousel[]>(`SELECT * FROM cms_carrousel WHERE active = 1`)
}