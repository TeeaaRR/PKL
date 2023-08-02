import Arsip from "../models/ArsipModels.js";
import multer from "multer";
import Indeks from "../models/IndeksModel.js";


export const Input = async(req, res) => {
    const {indeks_masalah, kode_klasifikasi, uraian_informasi, tanggal, jumlah, keterangan, file_pdf} = req.body;
    try{
        await Arsip.create({
            indeks_masalah:indeks_masalah,
            kode_klasifikasi:kode_klasifikasi,
            uraian_informasi:uraian_informasi,
            tanggal:tanggal,
            jumlah:jumlah,  
            keterangan:keterangan,
            file_pdf:file_pdf,
        })
    } catch(error){
        console.log(error)
    }
}

export const fileStorage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads");
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
});

export const uploadDokumen = (req, res, next) => {
    const upload = fileStorage.single("dokumen");
    upload(req, res, function (err) {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        next();
      });
}

export const inputPengajuan = async(req, res) => {
    const {indeks_masalah} = req.body;
    try {
        await Indeks.create({
            indeks_masalah: indeks_masalah,
            status:"Belum disetujui",
        });
    } catch (error) {
        console.log(error)
    }
}