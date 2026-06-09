import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../utils/auth";

const Profile = () => {
    // Auth();

    const [view, setView] = useState([]);

    useEffect(() => {
        getView();
    }, []);

    const getView = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken"); 
            // waktu login simpan accessToken di localStorage
            const response = await axios.get("http://localhost:3001/profile", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            });
            setView(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    return(
    <>
    <div className="flex flex-col w-screen mt-10 p-1">
        <div className="font-bold mb-4 text-xl">
            PROFILE PENGGUNA
        </div>
        <table className="border border-cyan-500 text-left m-auto ">
            <tr className="border border-cyan-500 text-left m-auto">
                <th className="border border-cyan-500 text-center m-auto p-2">Username</th>
                <th className="border border-cyan-500 text-center m-auto p-2">{view.username}</th>
            </tr>
            <tr className="border border-cyan-500 text-left m-auto">
                <th className="border border-cyan-500 text-center m-auto p-2">Nama Lengkap</th>
                <th className="border border-cyan-500 text-center m-auto p-2">{view.nama_lengkap}</th>
            </tr>
            <tr className="border border-cyan-500 text-left m-auto">
                <th className="border border-cyan-500 text-center m-auto p-2">Email</th>
                <th className="border border-cyan-500 text-center m-auto p-2">{view.email}</th>
            </tr>
            <tr className="border border-cyan-500 text-left m-auto">
                <th className="border border-cyan-500 text-center m-auto p-2">Tanggal Lahir</th>
                <th className="border border-cyan-500 text-center m-auto p-2">{view.tanggal_lahir}</th>
            </tr>
            <tr className="border border-cyan-500 text-left m-auto">
                <th className="border border-cyan-500 text-center m-auto p-2">Nomor Telepon</th>
                <th className="border border-cyan-500 text-center m-auto p-2">{view.nomor_telepon}</th>
            </tr>
            <tr className="border border-cyan-500 text-left m-auto">
                <th className="border border-cyan-500 text-center m-auto p-2">role</th>
                <th className="border border-cyan-500 text-center m-auto p-2">{view.role}</th>
            </tr>
        </table>
    </div>
    </>
    );
}

export default Profile;