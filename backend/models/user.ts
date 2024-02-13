import Sequelize from 'sequelize';
import sequelize from '../db';

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default User as any