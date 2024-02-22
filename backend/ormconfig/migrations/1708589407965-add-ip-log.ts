import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIpLog1708589407965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE activity_log ADD COLUMN ip VARCHAR(50) NOT NULL AFTER url
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
