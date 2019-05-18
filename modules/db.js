const Sequelize = require('sequelize');

const sequelize = new Sequelize('cashcontroller', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
};
