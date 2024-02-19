import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionTemplate1708330419808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE cms_template ADD COLUMN description TEXT NOT NULL AFTER name
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
