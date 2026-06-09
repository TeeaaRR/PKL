import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const getProfile = async (req, res) => {
  try {
    // ambil token dari header Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    // verifikasi JWT
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ msg: "Forbidden" });

      try {
        // ambil user dari DB sesuai id
        const user = await Users.findOne({
          where: { id: decoded.userId },
          attributes: ["id", "username", "email", "roles", "nama_lengkap", "nomor_telepon", "tahun_lahir"], // sesuaikan dengan field di tabelmu
        });

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.status(200).json({ result: user });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
