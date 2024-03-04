import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWilayahEvent1709528345919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE events
                ADD COLUMN wilayah_id INT NOT NULL,
                ADD CONSTRAINT fk_event_wilayah FOREIGN KEY (wilayah_id) REFERENCES user_wilayah(id)
        `)

        await queryRunner.query(`
            ALTER TABLE report_attendance
                ADD COLUMN event_id INT NOT NULL UNIQUE,
                ADD CONSTRAINT fk_report_event FOREIGN KEY (event_id) REFERENCES events(id),
                DROP FOREIGN KEY report_attendance_ibfk_1,
                DROP COLUMN manager_id
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE events
                DROP CONSTRAINT fk_event_wilayah,
                DROP COLUMN wilayah_id
        `)

        await queryRunner.query(`
            ALTER TABLE report_attendance
                ADD CONSTRAINT report_attendance_ibfk_1 FOREIGN KEY (manager_id) REFERENCES users(id),
                ADD COLUMN manager_id INT
        `)
    }

}
