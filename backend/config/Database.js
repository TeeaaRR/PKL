import { Sequelize } from "sequelize";

const db = new Sequelize("testpkl", "root", "",{
    host: "localhost",
    dialect: "mysql"
});

export default db;