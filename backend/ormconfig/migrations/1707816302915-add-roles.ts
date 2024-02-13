import { ResultSetHeader } from "mysql2";
import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from "bcrypt"

export class AddRoles1707816302915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { insertId: superAdminId }: ResultSetHeader = await queryRunner.query(`INSERT INTO roles (name) VALUES (?)`, ['super_admin'])
        const { insertId: adminId }: ResultSetHeader = await queryRunner.query(`INSERT INTO roles (name) VALUES (?)`, ['admin'])
        const { insertId: managerId }: ResultSetHeader = await queryRunner.query(`INSERT INTO roles (name) VALUES (?)`, ['manager'])

        const users = [
            {
                username: "super_admin",
                password: bcrypt.hashSync('superadmin', 10),
                role_id: superAdminId
            },
            {   
                username: "admin",
                password: bcrypt.hashSync('admin', 10),
                role_id: adminId
            },
        ]

        for (let i = 1; i <= 10; i++) {
            users.push({
                username: `manager-wilayah${i}`,
                password: bcrypt.hashSync(`managerwilayah${i}`, 10),
                role_id: managerId
            })
        }

        for (const user of users) {
            const values = [
                [user.username, user.password, user.role_id]
            ]

            await queryRunner.query(`INSERT INTO users (username, password, role_id) VALUES ?`, [values])
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
