import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1707798783762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS roles (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL
        )`)

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role_id INT NOT NULL,
            created_at INT NOT NULL DEFAULT (UNIX_TIMESTAMP()),
            FOREIGN KEY (role_id) REFERENCES roles(id)
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
