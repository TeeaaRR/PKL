import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Auth from "../utils/auth";

const Terkirim = () => {
    Auth();
    const [kirim, setKirim] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getKirim();
    }, [page, keyword]);

    const getKirim = async() =>{
        const response = await axios.get(`http://localhost:3001/terkirim?search_query=${keyword}&page=${page}&limit=${limit}`);
        setKirim(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    }

    const deleteIndeks = async(id) => {
        try{
            await axios.delete("http://localhost:3001/view/"+`${id}`);
            getKirim();
        }catch (error){
            console.log(error);
        }
    };

    const search = (e) => {
        e.preventDefault();
        setPage(0);
        setMsg("");
        setKeyword(query);
      };

    const changePage = ({selected}) => {
        setPage(selected);
    }

    const KirimArsip = async(id) => {
        try{
            await axios.post("http://localhost:3001/dikirim/"+`${id}`);
        }catch(error){
            console.log(error);
        }
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
                    {/* <th className="border border-cyan-500 text-center m-auto p-2">pilih</th> */}
                    <th className="border border-cyan-500 text-center m-auto p-2">Kode Klasifikasi</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Indeks Masalah</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Uraian Informasi</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Tanggal Upload</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Jumlah <br/>(lembar)</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">action</th>
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
                        <button type="button" className="button is-info" onClick={search}>
                            Search
                        </button>
                        </form>
                    </th>
                </tr>
                {kirim.map((Arsip2, index) => (
                <tr key ={Arsip2.id}>
                    <th className="border border-cyan-500 text-center m-auto p-2">{index + 1}</th>
                    {/* <th className="border border-cyan-500 text-center m-auto p-2"><input type="checkbox"/></th> */}
                    <th className="border border-cyan-500 text-center m-auto p-2">{Arsip2.kode_klasifikasi}</th>
                    <th className="border border-cyan-500 text-left m-auto p-2">{Arsip2.indeks_masalah}</th>
                    <th className="border border-cyan-500 text-left m-auto p-2" width="600px">{Arsip2.uraian_informasi}</th>
                    <th className="border border-cyan-500 text-right m-auto p-2">{Arsip2.tanggal}</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">{Arsip2.jumlah}</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">
                        <button type="button" onClick={() => {KirimArsip(Arsip2.id)}}>kirim</button>
                    </th>
                </tr>
                ))}
            </table>
            <p className="mr-24">
                Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
            </p>
            <nav
                role="navigation"
            >
                <ReactPaginate
                    previousLabel={"< Prev"}
                    nextLabel={"Next >"}
                    pageCount={pages}
                    onPageChange={changePage}
                />
            </nav>
            <button> <b>KIRIM</b> </button>
            </form>
        </div>
        </>
    );
}

export default Terkirim;