import { ResultSetHeader } from "mysql2";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWilayah1709187340313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_wilayah (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL
            )
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_wilayah_access (
	            wilayah_id INT NOT NULL,
	            role_id INT NOT NULL,
	            CONSTRAINT fk_access_role FOREIGN KEY (role_id) REFERENCES roles(id),
	            CONSTRAINT fk_access_wilayah FOREIGN KEY (wilayah_id) REFERENCES user_wilayah(id)
            )
        `)

        await queryRunner.query(`
            ALTER TABLE users 
	            ADD COLUMN user_wilayah INT AFTER password,
	            ADD CONSTRAINT fk_user_wilayah FOREIGN KEY (user_wilayah) REFERENCES user_wilayah(id)
        `)


        // Create wilayah
        for(let i = 1; i <= 10; i++) {
            const values = [
                [`wilayah-${i}`]
            ]
            const { insertId: wilayahId }: ResultSetHeader = await queryRunner.query('INSERT INTO user_wilayah (name) VALUES ?', [values])
            const data = await queryRunner.query(`UPDATE users SET user_wilayah = ? WHERE username = ?`, [wilayahId, `manager-wilayah${i}`])

            if(data.affectedRows) {
                await queryRunner.query(`INSERT INTO user_wilayah_access(wilayah_id, role_id) VALUES ?`, [[[wilayahId, 3]]])
            }

            await queryRunner.query('INSERT INTO user_wilayah_access(wilayah_id, role_id) VALUES ?', [[[wilayahId, 2]]]) // For admin
            await queryRunner.query(`INSERT INTO user_wilayah_access(wilayah_id, role_id) VALUES ?`, [[[wilayahId, 1]]]) // For super_admin
        }


        await queryRunner.query(`UPDATE users SET profile_img = ? WHERE profile_img IS NULL`, [process.env.DEFAULT_USER_IMG_URL])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
