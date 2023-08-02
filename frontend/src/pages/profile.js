import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../utils/auth";

const Profile = () => {
    Auth();

    const [view, setView] = useState([]);

    useEffect(() => {
        getView();
    });

    const getView = async() => {
        const response = await axios.get('http://localhost:3001/profile');
        setView(response.data.result);
    };

    return(
    <>
    <div className="flex flex-col w-screen mt-10 p-1">
        <div className="font-bold mb-4 text-xl">
            KIRIM DATA
        </div>
            <table className="border border-cyan-500 text-left m-auto ">
            <tr className="border border-cyan-500 text-left m-auto">
                    <th className="border border-cyan-500 text-center m-auto p-2">id</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">id</th>
            </tr>       
                {view.map((Users, index) => (
                <tr key = {Users.id}>
                    <th>{index + 1}</th>
                    <th>{Users.nama_lengkap}</th>
                </tr>
                ))}
            </table>
        </div>
    </>
    );
}

export default Profile;