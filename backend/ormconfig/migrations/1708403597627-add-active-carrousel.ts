import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActiveCarrousel1708403597627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE cms_carrousel ADD COLUMN active TINYINT(1) DEFAULT 1 AFTER template_id
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
    