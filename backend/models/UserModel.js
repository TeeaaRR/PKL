import { Sequelize } from "sequelize";

import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    email:{
        type: DataTypes.STRING
    },
    nama_lengkap:{
        type: DataTypes.STRING
    },
    tahun_lahir:{
        type: DataTypes.INTEGER
    },
    nomor_telepon:{
        type: DataTypes.STRING
    },
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    roles:{
        type: DataTypes.INTEGER
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
}, {
    freezeTableName:true
});

export default Users;