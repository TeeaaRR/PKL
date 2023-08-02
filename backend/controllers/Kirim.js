import Arsip from "../models/ArsipModels.js";
import { Op, Sequelize } from "sequelize";
import db from "../config/Database.js";


export const getKirim = async(req, res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Arsip.count({
        where:{
            [Op.or]: [
            {kode_klasifikasi:{
                [Op.like]: '%'+search+'%'
            }},
            {indeks_masalah:{
                [Op.like]: '%'+search+'%'
            }},
            {uraian_informasi:{
                [Op.like]: '%'+search+'%'
            }},
        ],
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Arsip.findAll({
        where:{
            [Op.or]: [
            {kode_klasifikasi:{
                [Op.like]: '%'+search+'%'
            }},
            {indeks_masalah:{
                [Op.like]: '%'+search+'%'
            }},
            {uraian_informasi:{
                [Op.like]: '%'+search+'%'
            }},
        ],
        },
        offset: offset,
        limit: limit,
        order:[
            ['createdAt', 'DESC']
        ]
    });
    res.json({
        result: result,
        page: page, 
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}

export const Mengirim = async(req,res) => {
    (await db.query('INSERT INTO Arsip2 SELECT * FROM Arsip WHERE id = :id',{
        replacements: {id: req.params.id},
        type:db.QueryTypes.SELECT
    })).then(function(result) {
        console.log(result) // or do whatever you want
    })
}

export const deleteKirim = async(req, res) => {
    try {
        await Arsip.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "user dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}