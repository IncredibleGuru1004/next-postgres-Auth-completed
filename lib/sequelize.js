
import pg from 'pg';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:123456@localhost:5432/postgres', {
  dialect: 'postgres',
  dialectModule: pg
});

async function initDatabase() {
    try {
        await sequelize.authenticate();
        console.log("database connection established successfully");
        await sequelize.sync({alter: true})
    } catch (error) {
        console.error("Unable to connect to the databse: ", error);
    }
}

module.exports = {sequelize,initDatabase}
