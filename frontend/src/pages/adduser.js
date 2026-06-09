import React, { useState } from 'react';
import axios from 'axios';

export default function AddUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [tahunLahir, setTahunLahir] = useState("");
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");

    const Form = async (e) => {
        e.preventDefault();
        try {
            // try to fetch existing users and check duplicates
            try {
                const usersResp = await axios.get('http://localhost:3001/users');
                const users = usersResp.data || [];
                if (users.some(u => u.username === username)) {
                    window.alert('Username sudah digunakan');
                    return;
                }
                if (users.some(u => u.email === email)) {
                    window.alert('Email sudah digunakan');
                    return;
                }
            } catch (err) {
                // If fetching users fails (likely unauthorized), continue to attempt registration
            }

            const payload = {
                username: username,
                email: email,
                password: password,
                nama_lengkap: namaLengkap,
                tahun_lahir: tahunLahir,
                nomor_telepon: nomorTelepon,
                roles: role,
                confirmPassword: password
            };
            const response = await axios.post('http://localhost:3001/register', payload);
            if (response.data && response.data.msg) {
                window.alert(response.data.msg);
            } else {
                window.alert('User added');
            }
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                window.alert(error.response.data.msg);
            } else {
                console.error(error);
                window.alert('Error adding user');
            }
        }
    }

    return(
        <>
        <div className="flex flex-col w-screen mt-10">
            <div className="font-bold mb-4 text-xl">
                DAFTAR USER BARU
            </div>
            <form method="POST" onSubmit={Form}>
                <table className="border-2 border-black text-left m-auto">
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th className="border-r-2 border-slate-500 p-2 pr-10">Nama Lengkap</th>
                        <th className="border border-slate-500 p-2">
                        <div style={{width: '500px'}}>
                        <input type="text"
                            name="namaLengkap"
                            className="w-full bg-white border focus:border-cyan-200 border-cyan-500 rounded font-normal p-1"
                            value={namaLengkap}
                            placeholder={"Isi disini"}
                            onChange={(e) => {setNamaLengkap(e.target.value)}}    
                            required
                        />  
                        </div>
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th className="border-r-2 border-slate-500 p-2 pr-10">Email</th>
                        <th className="border border-slate-500 p-2">
                        <div style={{width: '500px'}}>
                        <input type="text"
                            name="email"
                            className="w-full bg-white border focus:border-cyan-200 border-cyan-500 rounded font-normal p-1"
                            value={email}
                            placeholder={"Isi disini"}
                            onChange={(e) => {setEmail(e.target.value)}}    
                            required
                        />  
                        </div>
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th className="border-r-2 border-slate-500 p-2 pr-10">Tahun Lahir</th>
                        <th className="border border-slate-500 p-2">
                        <div style={{width: '500px'}}>
                        <input type="text"
                            name="tahunLahir"
                            className="w-full bg-white border focus:border-cyan-200 border-cyan-500 rounded font-normal p-1"
                            value={tahunLahir}
                            placeholder={"Isi disini"}
                            onChange={(e) => {setTahunLahir(e.target.value)}}    
                            required
                        />  
                        </div>
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th className="border-r-2 border-slate-500 p-2 pr-10">Nomor Telepon</th>
                        <th className="border border-slate-500 p-2">
                        <div style={{width: '500px'}}>
                        <input type="number"
                            name="nomorTelepon"
                            className="w-full bg-white border focus:border-cyan-200 border-cyan-500 rounded font-normal p-1"
                            value={nomorTelepon}
                            placeholder={"Isi disini"}
                            onChange={(e) => {setNomorTelepon(e.target.value)}}    
                            required
                        />  
                        </div>
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th className="border-r-2 border-slate-500 p-2 pr-10">Username</th>
                        <th className="border border-slate-500 p-2">
                        <div style={{width: '500px'}}>
                        <input type="text"
                            name="username"
                            className="w-full bg-white border focus:border-cyan-200 border-cyan-500 rounded font-normal p-1"
                            value={username}
                            placeholder={"Isi disini"}
                            onChange={(e) => {setUsername(e.target.value)}}    
                            required
                        />  
                        </div>
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th className="border-r-2 border-slate-500 p-2 pr-10">Password</th>
                        <th className="border border-slate-500 p-2">
                        <div style={{width: '500px'}}>
                        <input type="text"
                            name="password"
                            className="w-full bg-white border focus:border-cyan-200 border-cyan-500 rounded font-normal p-1"
                            value={password}
                            placeholder={"Isi disini"}
                            onChange={(e) => {setPassword(e.target.value)}}    
                            required
                        />  
                        </div>
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th className="border-r-2 border-slate-500 p-2 pr-10">Role</th>
                        <th className="border border-slate-500 p-2">
                        <div style={{width: '500px'}}>
                        <select
                            value={role}
                            name="role"
                            className="w-full bg-white border focus:border-cyan-200 border-cyan-500 rounded font-normal p-1"
                            onChange={(e) => {setRole(e.target.value)}}
                            required
                        >
                            <option value="">Pilih Role</option>
                            <option value="1">Admin</option>
                            <option value="2">Pengelola</option>
                            <option value="3">User</option>
                        </select>
                        </div>
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th colspan="3" className="border-2 border-black text-center p-2 text-hover:blue">
                            <button className="border border-cyan-500 bg-cyan-200 hover:bg-cyan-500 hover:text-white text-black font-bold py-2 px-6 rounded-full">KIRIM</button>
                        </th>
                    </tr>
                </table>
            </form>
        </div>
        </>
    )
}