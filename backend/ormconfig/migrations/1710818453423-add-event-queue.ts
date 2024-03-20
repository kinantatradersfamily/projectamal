import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEventQueue1710818453423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE events
                ADD COLUMN is_approved TINYINT(1) NOT NULL DEFAULT 0,
                ADD COLUMN reason TEXT,
                ADD COLUMN approved_at INT NOT NULL DEFAULT 0
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE events DROP COLUMN is_approved`);
        await queryRunner.query(`ALTER TABLE events DROP COLUMN reason`);
    }

}
