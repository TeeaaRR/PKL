import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const Logout = async(req,res) =>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    //update refresh token database
    await Users.update({refresh_token: null},{
        where:{
            id: userId,
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}
