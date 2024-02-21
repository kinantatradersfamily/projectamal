import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionReport1708419643458 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE report_attendance ADD COLUMN description TEXT AFTER pemateri`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
