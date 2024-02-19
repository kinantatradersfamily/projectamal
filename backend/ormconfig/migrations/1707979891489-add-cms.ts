import { ResultSetHeader } from "mysql2";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCms1707979891489 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cms_template (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                active TINYINT(1) DEFAULT 0,
                created_at INT NOT NULL DEFAULT (UNIX_TIMESTAMP()),
                updated_at INT DEFAULT 0
            )
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cms_carrousel (
                id INT PRIMARY KEY AUTO_INCREMENT,
                content VARCHAR(255),
                url VARCHAR(255) NOT NULL,
                template_id INT,
                updated_at INT DEFAULT 0,
                created_at INT NOT NULL DEFAULT (UNIX_TIMESTAMP()),
                FOREIGN KEY (template_id) REFERENCES cms_template(id)
            )
        `)

        const cms_template = [
            ['main', 1]
        ]

        const { insertId: contentId }: ResultSetHeader = await queryRunner.query(`INSERT INTO cms_template (name, active) VALUES ?`, [cms_template])

        const cms_carrousel = [
            ['Carrousel', 'public/carrousel/black-prism-concept-ai-generated.jpg', contentId]
        ]

        await queryRunner.query(`INSERT INTO cms_carrousel (content, url, template_id) VALUES ?`, [cms_carrousel])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
