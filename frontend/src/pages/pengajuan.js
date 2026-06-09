import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom"

const Input = () => {
    Auth();
    const [pengajuan, setPengajuan] = useState([]);
    const [indeks, setIndeks] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [page2, setPage2] = useState(0);
    const [pages2, setPages2] = useState(0);
    const [rows2, setRows2] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
   
    useEffect(() => {
      getPengajuan();
    }, [page, keyword]);
   
    const getPengajuan = async () => {
      const response = await axios.get(`http://localhost:3001/pengajuan?search_query=${keyword}&page=${page2}&limit=${limit}`);
      setPengajuan(response.data.result);
      setPages2(response.data.totalPage);
      setRows2(response.data.totalRows);
    };

    const changePage2 = ({ selected }) => {
      setPage(selected);
    };

    const changePage = ({ selected }) => {
      setPage(selected);
    };
   
    const searchData = (e) => {
      e.preventDefault();
      setPage(0);
      setMsg("");
      setKeyword(query);
    };

    useEffect(()     => {
        getIndeks();
      }, [page, keyword]);

    const getIndeks = async() => {
        const response = await axios.get(`http://localhost:3001/indeks?search_query=${keyword}&page=${page}&limit=${limit}`);
        setIndeks(response.data.result);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    };

    const Accept = async(id) => {
        try {
            await axios.post(`http://localhost:3001/accepted/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteIndeks = async(id) => {
        try{
            await axios.delete("http://localhost:3001/pengajuan/"+`${id}`);
            getIndeks();
        }catch (error){
            console.log(error);
        }
    };
   
    return (
        <>
        <div className="flex flex-col w-[100%] mt-10 px-60">
            <div className="font-bold mb-4 text-xl">
                LIST INDEKS MASALAH
            </div>
            <div className="flex justify-between">
                <div className="">
                    <table className="border border-cyan-500 text-left ml-28" style={{width: '500px'}}>
                        <tr className="border border-cyan-500 text-left m-auto">
                            <th colspan="3" className="border border-cyan-500 text-center m-auto p-2 bg-cyan-200">Belum terdaftar</th>
                        </tr>
                        <tr className="border border-cyan-500 text-left m-auto bg-cyan-100">
                            <th className="border border-cyan-500 text-center m-auto p-2" style={{width: '50px'}}>No</th>
                            <th className="border border-cyan-500 text-center m-auto p-2">Indeks Masalah</th>
                            <th className="border border-cyan-500 text-center m-auto p-2">Action</th>
                        </tr>
                            {pengajuan.map((indeks, index) => (
                            <tr key ={indeks.id}>
                                <th className="border border-cyan-500 text-center m-auto p-2">{index + 1}</th>
                                <th className="border border-cyan-500 text-center m-auto p-2">{indeks.indeks_masalah}</th>
                                <th className="border border-cyan-500 text-center m-auto p-2">
                                    <button type="button" className="text-green-600" onClick={() => {{window.location.reload();}{Accept(indeks.id)};}}>ACCEPT</button>
                                    <button type="button" className="ml-4 text-red-600" onClick={() => {if(window.confirm('Delete the item?')){deleteIndeks(indeks.id)}{window.location.reload();};}}>REJECT</button>
                                </th>
                            </tr>
                            ))}
                            <tr className="border border-cyan-500 text-left m-auto">
                                <th colspan="3" className="border border-cyan-500 text-center m-auto">
                                    <ReactPaginate
                                    previousLabel={"< Prev"}
                                    nextLabel={"Next >"}
                                    pageCount={pages2}
                                    onPageChange={changePage2}
                                    containerClassName="flex justify-center space-x-2 p-2"
                                />
                                </th>
                            </tr>
                    </table>
                </div>
                <div>
                    <table className="border border-cyan-500 text-left mr-28" style={{width: '500px'}}>
                        <tr className="border border-cyan-500 text-left m-auto">
                            <th colspan="3" className="border border-cyan-500 text-center m-auto p-2 bg-cyan-200">Sudah terdaftar</th>
                        </tr>
                        <tr className="border border-cyan-500 text-left m-auto">
                            <th colspan="3" className="border border-cyan-500 text-center m-auto p-2 bg-cyan-100">
                                <form onSubmit={searchData}>
                                <div className="">
                                    <div className="">
                                        <input
                                            type="text"
                                            className="text-center border-0 border-b-2 border-b-black bg-transparent hover:border hover:border-black hover:rounded hover:outline-gray-500 focus:outline-none" 
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="">
                                        <button type="submit" className="button is-info">
                                            Search
                                        </button>
                                    </div>
                                </div>
                                </form>
                            </th>
                        </tr>
                        <tr className="border border-cyan-500 text-left m-auto bg-cyan-100">
                            <th className="border border-cyan-500 text-center m-auto p-2" style={{width: '50px'}}>No</th>
                            <th className="border border-cyan-500 text-center m-auto p-2">Indeks Masalah</th>
                            <th className="border border-cyan-500 text-center m-auto p-2">Action</th>
                        </tr>
                            {indeks.map((indeks, index) => (
                            <tr key ={indeks.id}>
                                <th className="border border-cyan-500 text-center m-auto p-2">{index + 1}</th>
                                <th className="border border-cyan-500 text-center m-auto p-2">{indeks.indeks_masalah}</th>
                                <th className="border border-cyan-500 text-center m-auto p-2"><button className="p-1 text-red-500" onClick={() => {if(window.confirm('Delete the item?')){deleteIndeks(indeks.id)};}}>HAPUS</button></th>
                            </tr>
                            ))}
                            <tr className="border border-cyan-500 text-left m-auto">
                                <th colspan="3" className="border border-cyan-500 text-center m-auto">
                                    <ReactPaginate
                                    previousLabel={"< Prev"}
                                    nextLabel={"Next >"}
                                    pageCount={pages}
                                    onPageChange={changePage}
                                    containerClassName="flex justify-center space-x-2 p-2"
                                />
                                </th>
                            </tr>
                    </table>
                </div>
            </div>
        </div>
        </>
    );

}

export default Input;