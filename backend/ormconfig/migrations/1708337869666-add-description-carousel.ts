import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionCarousel1708337869666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE cms_carrousel ADD COLUMN description TEXT NOT NULL AFTER content
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
