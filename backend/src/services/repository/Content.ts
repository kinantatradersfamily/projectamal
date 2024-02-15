import db from '../../../ormconfig'

export async function DBGetContent() {
    const query = await db.query(`SELECT ct.name, ct.created_at, cc.url FROM cms_template ct LEFT JOIN cms_carrousel cc ON cc.template_id = ct.id WHERE ct.active = 1`)
    return query
}