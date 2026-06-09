import { Sequelize } from "sequelize";

import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Indeks = db.define('indeks', {
    indeks_masalah:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
}, {
    freezeTableName:true
});

export default Indeks;