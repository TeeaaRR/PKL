import { Sequelize } from "sequelize";

import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Arsip2 = db.define('arsip2',{
    indeks_masalah:{
        type: DataTypes.STRING
    },
    kode_klasifikasi:{
        type: DataTypes.STRING
    },
    uraian_informasi:{
        type: DataTypes.STRING
    },
    tanggal:{
        type: DataTypes.DATEONLY
    },
    jumlah:{
        type: DataTypes.INTEGER
    },
    keterangan:{
        type: DataTypes.STRING
    },
    file_pdf:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

export default Arsip2;