const Sequelize = require('sequelize');

module.exports = new Sequelize('codegig', 'postgres', 'popsjuly1', {
    host: 'localhost',
    dialect: 'postgres',
});