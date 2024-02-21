import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLog1708499335418 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS activity_log (
                id INT PRIMARY KEY AUTO_INCREMENT,
                action VARCHAR(255) NOT NULL,
                url VARCHAR(255) NOT NULL,
                user_id INT NOT NULL,
                params TEXT,
                created_at INT NOT NULL DEFAULT (UNIX_TIMESTAMP()),
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
