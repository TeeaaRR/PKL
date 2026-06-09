import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../utils/auth";
import ReactPaginate from "react-paginate";

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
                LIST ARSIP
            </div>
            <table className="border border-cyan-500 text-left m-auto ">
                <tr className="border border-cyan-500 text-left m-auto">
                    <th className="border border-cyan-500 text-center m-auto p-2">ID</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Kode Klasifikasi</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Indeks Masalah</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Uraian Informasi</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Tanggal Upload</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Jumlah <br/>(lembar)</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Aksi</th>
                </tr>
                <tr className="">
                    <th colSpan={7} className="p-2 text-center">
                        <form>
                        <input
                            type="text"
                            className="text-center border-0 border-b-2 border-b-black bg-transparent focus:outline-none" 
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
                    <th className="border border-cyan-500 text-center m-auto p-2">{page * limit + index + 1}</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">{Arsip.kode_klasifikasi}</th>
                    <th className="border border-cyan-500 text-left m-auto p-2">{Arsip.indeks_masalah}</th>
                    <th className="border border-cyan-500 text-left m-auto p-2" width="600px">{Arsip.uraian_informasi}</th>
                    <th className="border border-cyan-500 text-right m-auto p-2">{Arsip.tanggal}</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">{Arsip.jumlah}</th>
                    <th className="border border-cyan-500 text-left m-auto p-1">
                        <a href={`http://localhost:3001/uploads/${Arsip.file_pdf}`} download>DOWNLOAD</a>
                    </th>
                </tr>
                ))}
            </table>
            <ReactPaginate
                previousLabel={"< Prev"}
                nextLabel={"Next >"}
                containerClassName="flex justify-center items-center space-x-2 mt-4"
                
                pageCount={pages}
                onPageChange={changePage}
            />
        </div>
        </>
    );
}

export default View;