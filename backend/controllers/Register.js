import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async(req, res) => {
    const {username, email, password, confirmPassword} = req.body;
    if (password !== confirmPassword) return res.status(400).json({msg:"password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt);
    try{
        await Users.create({
            username: username,
            email: email,
            password: hashPassword
        });
        res.json({msg:"Register berhasil"})
    } catch(error){
        console.log(error)
    }
}