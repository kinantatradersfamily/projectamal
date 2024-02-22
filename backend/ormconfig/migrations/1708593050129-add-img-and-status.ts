import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImgAndStatus1708593050129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
                ADD COLUMN active TINYINT(1) NOT NULL DEFAULT 1 AFTER password,
                ADD COLUMN profile_img VARCHAR(255) AFTER active
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
