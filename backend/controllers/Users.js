import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try{
        const users = await Users.findAll({
            attributes:['id','username','email', 'refresh_token']
        });
        res.json(users);
    }catch (error){
        console.log(error);
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
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if(!match) return res.status(400).json({msg:"Password salah"});
    const userId = user[0].id;
    const username = user[0].username;
    const email = user[0].email;
    const accessToken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : '20s'
    });
    const refreshToken = jwt.sign({userId, username, email}, process.env.REFRESH_TOKEN_SECRET,{
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
    //response ke client access token
    res.json({ accessToken });
    }catch (error){
        res.status(404).json({msg : "username tidak terdaftar"});
    }
}
