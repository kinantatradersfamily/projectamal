import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  port: 4041,
  username: 'root',
  password: "123456",
  database: "projectamal"
})

export default sequelize