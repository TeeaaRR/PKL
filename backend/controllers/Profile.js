import Users from "../models/UserModel.js";

export const getProfile = async(req, res) => {
    try {
        const response = await Users.findAll({
            order:[['nama_lengkap','ASC']]
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}