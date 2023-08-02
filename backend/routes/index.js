import express from "express";
import { getUsers, Login } from "../controllers/Users.js";
import { Register } from "../controllers/Register.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { Logout } from "../controllers/Logout.js";
import { Input, uploadDokumen, inputPengajuan } from "../controllers/FormInput.js"
import { deleteIndeks, getArsip, getArsip2, getArsipByIndeks, getArsipSpesifik } from "../controllers/View.js";
import { getPengajuan, getIndeks, Accept } from "../controllers/Pengajuan.js";
import { deleteKirim, getKirim, Mengirim } from "../controllers/Kirim.js";
import { getTerkirim } from "../controllers/terkirim.js";
import { getProfile } from "../controllers/Profile.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login',Login);
router.post('/api/insert',Input);
router.post('/api/upload', uploadDokumen);
router.post('/api/pengajuan', inputPengajuan);
router.get('/profile', getProfile);
router.get('/token',refreshToken);
router.get('/view', getArsip);
router.get('/pengajuan', getPengajuan);
router.get('/indeks', getIndeks);
router.post('/accepted/:id', Accept);
router.get('/view2', getArsip2);
router.get('/kirim', getKirim);
router.post('/dikirim/:id', Mengirim);
router.get('/terkirim', getTerkirim);
router.delete('/kirim/:id', deleteKirim);
router.get('/view/spes', getArsipSpesifik);
router.get('/view/:id', getArsipByIndeks);
router.delete('/view/:id', deleteIndeks);
router.delete('/logout',Logout);



export default router;