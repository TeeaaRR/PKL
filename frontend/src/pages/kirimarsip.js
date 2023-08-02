import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../utils/auth";

const Kirim = () => {
    Auth();
    const [view, setView] = useState([]);
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        getView();
    }, [page, keyword]);

    const getView = async() =>{
        const response = await axios.get('http://localhost:3001/view');
        setView(response.data.result);
    }

    const deleteIndeks = async(id) => {
        try{
            await axios.delete("http://localhost:3001/view/"+`${id}`);
            getView();
        }catch (error){
            console.log(error);
        }
    };


    const [view2, setView2] = useState([]);

    useEffect(() => {
        getView2();
    }, []);

    const getView2 = async() =>{
        const response = await axios.get('http://localhost:3001/view2');
        setView2(response.data);
    }


    return(
        <>
        <div className="flex flex-col w-screen mt-10 p-1">
            <div className="font-bold mb-4 text-xl">
                KIRIM DATA
            </div>
            <form>
            <table className="border border-cyan-500 text-left m-auto ">
                <tr className="border border-cyan-500 text-left m-auto">
                    <th className="border border-cyan-500 text-center m-auto p-2">id</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">pilih</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Kode Klasifikasi</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Indeks Masalah</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Uraian Informasi</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Tanggal Upload</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Jumlah <br/>(lembar)</th>
                </tr>
                    {view.map((Arsip, index) => (
                    <tr key ={Arsip.id}>
                        <th className="border border-cyan-500 text-center m-auto p-2">{index + 1}</th>
                        <th className="border border-cyan-500 text-center m-auto p-2"><input type="checkbox"/></th>
                        <th className="border border-cyan-500 text-center m-auto p-2">{Arsip.kode_klasifikasi}</th>
                        <th className="border border-cyan-500 text-left m-auto p-2">{Arsip.indeks_masalah}</th>
                        <th className="border border-cyan-500 text-left m-auto p-2" width="600px">{Arsip.uraian_informasi}</th>
                        <th className="border border-cyan-500 text-right m-auto p-2">{Arsip.tanggal}</th>
                        <th className="border border-cyan-500 text-center m-auto p-2">{Arsip.jumlah}</th>
                    </tr>
                    ))}
            </table>
            <button> <b>KIRIM</b> </button>
            </form>
        </div>
        </>
    );
}

export default Kirim;