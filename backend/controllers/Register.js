import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async(req, res) => {
    const {username, email, password,  roles, nama_lengkap, tahun_lahir, nomor_telepon, confirmPassword} = req.body;
    if (password !== confirmPassword) return res.status(400).json({msg:"password tidak cocok"});
    try{
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) return res.status(400).json({ msg: "Username sudah digunakan" });

        const existingEmail = await Users.findOne({ where: { email } });
        if (existingEmail) return res.status(400).json({ msg: "Email sudah digunakan" });

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt);
        await Users.create({
            username: username,
            email: email,
            roles: roles,
            nama_lengkap: nama_lengkap,
            tahun_lahir: tahun_lahir,
            nomor_telepon: nomor_telepon,
            password: hashPassword
        });
        res.json({msg:"Register berhasil"})
    } catch(error){
        console.log(error)
        res.status(500).json({ msg: error.message });
    }
}