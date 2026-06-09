import express from "express";
import { getUsers, Login, getUsersView, getUserById, deleteUser, updateUser } from "../controllers/Users.js";
import { Register } from "../controllers/Register.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { Logout } from "../controllers/Logout.js";
import { Input, uploadDokumen, inputPengajuan } from "../controllers/FormInput.js"
import { deleteArsip, getArsip, getArsipByIndeks, getArsipSpesifik, updateArsip } from "../controllers/View.js";
import { getPengajuan, getIndeks, Accept, deleteIndeks } from "../controllers/Pengajuan.js";
import { getProfile } from "../controllers/Profile.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/usersview', getUsersView);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.post('/register', Register);
router.post('/login',Login);
router.post('/api/insert',uploadDokumen, Input);
router.post('/api/upload', uploadDokumen);
router.post('/api/pengajuan', inputPengajuan);
router.get('/profile', getProfile);
router.get('/token',refreshToken);
router.get('/view', getArsip);
router.get('/pengajuan', getPengajuan);
router.get('/indeks', getIndeks);
router.post('/accepted/:id', Accept);
router.get('/view/spes', getArsipSpesifik);
router.get('/view/:id', getArsipByIndeks);
router.put('/view/:id', updateArsip);
router.delete('/view/:id', deleteArsip);
router.delete('/pengajuan/:id', deleteIndeks);
router.delete('/logout',Logout);

export default router;