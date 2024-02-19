import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitleCarousel1708339498607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE cms_carrousel ADD COLUMN title TEXT NOT NULL AFTER description
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
