import Arsip from "../models/ArsipModels.js";
import Arsip2 from "../models/Arsip2Models.js";
import Indeks from "../models/IndeksModel.js";
import { Op } from "sequelize";


// export const getArsip = async(req, res) => {
//     try {
//         const response = await Arsip.findAll({
//             order:[['indeks_masalah','ASC'],['tanggal', 'ASC']]
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

export const getArsip = async (req, res) => {
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
        },
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
        order:[['indeks_masalah','ASC'],['tanggal', 'ASC']]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}

export const getArsipSpesifik = async(req, res) => {
    try {
        const response = await Indeks.findAll({
            attributes:['indeks_masalah']
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getArsipByIndeks = async(req, res) => {
    try {
        const response = await Arsip.findOne({
            where:{
                indeks_masalah: req.params.indeks
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteIndeks = async(req, res) => {
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

export const getArsip2 = async(req, res) => {
    try {
        const response = await Arsip2.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}