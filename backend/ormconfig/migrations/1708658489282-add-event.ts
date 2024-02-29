import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEvent1708658489282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS events (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                address VARCHAR(255) NOT NULL,
                start_date INT NOT NULL,
                end_date INT NOT NULL,
                status TINYINT(1) NOT NULL DEFAULT 0,
                image_url VARCHAR(255) NOT NULL,
                created_at INT NOT NULL DEFAULT (UNIX_TIMESTAMP()),
                updated_at INT NOT NULL DEFAULT 0
            )
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS cms_event (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                event_id INT NOT NULL,
                created_at INT NOT NULL DEFAULT (UNIX_TIMESTAMP()),
                updated_at INT NOT NULL DEFAULT 0,
                FOREIGN KEY (event_id) REFERENCES events(id)
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
