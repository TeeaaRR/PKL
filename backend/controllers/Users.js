import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const getUsers = async(req, res) => {
    try{
        const users = await Users.findAll({
            attributes:['id','username','email', 'refresh_token', 'roles', 'nama_lengkap', 'tahun_lahir', 'nomor_telepon']
        });
        res.json(users);
    }catch (error){
        console.log(error);
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({ where: { id }, attributes: ['id','username','email','roles','nama_lengkap','tahun_lahir','nomor_telepon'] });
        if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, password, roles, nama_lengkap, tahun_lahir, nomor_telepon } = req.body;

        const user = await Users.findOne({ where: { id } });
        if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });

        // check duplicates excluding current user
        const existingUsername = await Users.findOne({ where: { username, id: { [Op.ne]: id } } });
        if (existingUsername) return res.status(400).json({ msg: 'Username sudah digunakan' });
        const existingEmail = await Users.findOne({ where: { email, id: { [Op.ne]: id } } });
        if (existingEmail) return res.status(400).json({ msg: 'Email sudah digunakan' });

        const updateData = { username, email, roles, nama_lengkap, tahun_lahir, nomor_telepon };
        if (password && password.length > 0) {
            const salt = await bcrypt.genSalt();
            updateData.password = await bcrypt.hash(password, salt);
        }

        await Users.update(updateData, { where: { id } });
        res.json({ msg: 'User updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
}

export const getUsersView = async(req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Users.count({
        where: {
            [Op.or]: [
                { username: { [Op.like]: `%${search}%` } },
                { nama_lengkap: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
            ],
        },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Users.findAll({
        where: {
            [Op.or]: [
                { username: { [Op.like]: `%${search}%` } },
                { nama_lengkap: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
            ],
        },
        offset: offset,
        limit: limit,
        order: [['username', 'ASC']]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}

export const deleteUser = async(req, res) => {
    try {
        await Users.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}

//Login
export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                username : req.body.username
            }
        });

        if (!user[0]) return res.status(404).json({msg: "User tidak ditemukan"});
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg:"Password salah"});

    const userId = user[0].id;
    const username = user[0].username;
    const email = user[0].email;
    const role = user[0].roles; // gunakan field roles dari model
    const accessToken = jwt.sign({userId, username, email, role}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : '1d'
    });
    const refreshToken = jwt.sign({userId, username, email, role}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn : '1d'
    });

    //update token di db
    await Users.update({refresh_token: refreshToken}, {
        where:{
            id: userId
        }
    });

    //http cookie
    res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 24  * 60 * 60 * 1000,
        // secure: true,
    });
    
    //response ke client access token dan role
    res.json({ accessToken, role });
    }catch (error){
        res.status(500).json({msg : "username tidak terdaftar", error: error.message});
    }
    
}
