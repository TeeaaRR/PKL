import Arsip2 from "../models/Arsip2Models.js";
import { Op, Sequelize } from "sequelize";
import db from "../config/Database.js";


export const getTerkirim = async(req, res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Arsip2.count({
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
    const result = await Arsip2.findAll({
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