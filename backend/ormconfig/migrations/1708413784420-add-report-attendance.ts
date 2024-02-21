import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReportAttendance1708413784420 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS report_attendance (
                id INT PRIMARY KEY AUTO_INCREMENT,
                topic VARCHAR(255) NOT NULL,
                pemateri VARCHAR(255) NOT NULL,
                event INT NOT NULL,
                total_amal INT NOT NULL,
                total_attendance INT NOT NULL,
                date DATE NOT NULL,
                manager_id INT NOT NULL,
                created_at INT NOT NULL DEFAULT (UNIX_TIMESTAMP()),     
                updated_at INT NOT NULL DEFAULT 0,
                FOREIGN KEY (manager_id) REFERENCES users(id)
            )
        `)

        await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS report_attendance_docs (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name INT NOT NULL,
                    url INT NOT NULL,
                    report_id INT,
                    FOREIGN KEY (report_id) REFERENCES report_attendance(id)
                )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
