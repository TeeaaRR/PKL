import Indeks from "../models/IndeksModel.js";
import { Op, Sequelize } from "sequelize";
import db from "../config/Database.js";


export const getPengajuan = async(req, res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 11;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Indeks.count({
        where:{
            [Op.and]: [{indeks_masalah:{
                [Op.like]: '%'+search+'%'
            }},
            {status: 'belum disetujui'}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Indeks.findAll({
        where:{
            [Op.and]: [{indeks_masalah:{
                [Op.like]: '%'+search+'%'
            }},
            {status: 'belum disetujui'}]
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

export const getIndeks = async(req, res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Indeks.count({
        where:{
            [Op.and]: [{indeks_masalah:{
                [Op.like]: '%'+search+'%'
            }},
            {status: 'sudah disetujui'}]
        }
    }); 
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Indeks.findAll({
        where:{
            [Op.and]: [{indeks_masalah:{
                [Op.like]: '%'+search+'%'
            }},
            {status: 'sudah disetujui'}]
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

export const Accept = async(req,res) => {
    try {
        await Indeks.update({ status : "sudah disetujui" },{
            where:{
                id:req.params.id,
            }
        })
    } catch (error) {
        
    }
}