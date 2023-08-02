import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../utils/auth";

const View = () => {
    Auth();
    const [view, setView] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getView();
    }, [page, keyword]);

    // const getView = async() =>{
    //     const response = await axios.get('http://localhost:3001/view');
    //     setView(response.data.result);
    // }

    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setMsg("");
        setKeyword(query);
    }

    const changePage = ({selected}) => {
        setPage(selected);
    }

    const getView = async() => {
        const response = await axios.get(`http://localhost:3001/view?search_query=${keyword}&page=${page}&limit=${limit}`);
        setView(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    }

    const deleteIndeks = async(id) => {
        try{
            await axios.delete("http://localhost:3001/view/"+`${id}`);
            getView();
        }catch (error){
            console.log(error);
        }
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
                    <th className="border border-cyan-500 text-center m-auto p-2">Kode Klasifikasi</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Indeks Masalah</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Uraian Informasi</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Tanggal Upload</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Jumlah <br/>(lembar)</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Actions</th>
                </tr>
                <tr className="">
                    <th colSpan={7} className=" text-center">
                        <form>
                        <input
                            type="text"
                            className="text-center border-0 border-b-2 border-b-black bg-transparent hover:border hover:border-black hover:rounded hover:outline-gray-500 focus:outline-none" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="button" className="button is-info" onClick={searchData}>
                            Search
                        </button>
                        </form>
                    </th>
                </tr>
                {view.map((Arsip, index) => (
                <tr key ={Arsip.id}>
                    <th className="border border-cyan-500 text-center m-auto p-2">{index + 1}</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">{Arsip.kode_klasifikasi}</th>
                    <th className="border border-cyan-500 text-left m-auto p-2">{Arsip.indeks_masalah}</th>
                    <th className="border border-cyan-500 text-left m-auto p-2" width="600px">{Arsip.uraian_informasi}</th>
                    <th className="border border-cyan-500 text-right m-auto p-2">{Arsip.tanggal}</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">{Arsip.jumlah}</th>
                    <th className="border border-cyan-500 text-left m-auto p-1">
                        <button className="p-1" onClick={() => {if(window.confirm('Delete the item?')){deleteIndeks(Arsip.id)};}}>DELETE</button>
                        <button type="button" className="p-1">DETAIL</button>
                        <button type="button" className="p-1">PRINT</button>
                    </th>
                </tr>
                ))}

                    {/* {view2.map((Arsip2, index) => (
                        <tr key ={Arsip2.id}>
                            <th className="border border-cyan-500 text-center m-auto p-2">{index + 1}</th>
                            <th className="border border-cyan-500 text-center m-auto p-2">{Arsip2.kode_klasifikasi}</th>
                            <th className="border border-cyan-500 text-left m-auto p-2">{Arsip2.indeks_masalah}</th>
                            <th className="border border-cyan-500 text-left m-auto p-2" width="600px">{Arsip2.uraian_informasi}</th>
                            <th className="border border-cyan-500 text-right m-auto p-2">{Arsip2.tanggal}</th>
                            <th className="border border-cyan-500 text-center m-auto p-2">{Arsip2.jumlah}</th>
                            <th className="border border-cyan-500 text-left m-auto p-1">
                                <button type="button" className="p-1">EDIT</button>
                                <button className="p-1" onClick={() => {if(window.confirm('Delete the item?')){deleteIndeks(Arsip2.id)};}}>DELETE</button>
                                <button type="button" className="p-1">SEND</button><br/>
                                <button type="button" className="p-1">DETAIL</button>
                                <button type="button" className="p-1">PRINT</button>
                            </th>
                        </tr>
                        ))} */}
            </table>
        </div>
        </>
    );
}

export default View;