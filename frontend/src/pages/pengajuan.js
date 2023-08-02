import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom"

const Input = () => {
    Auth();
    const [pengajuan, setPengajuan] = useState([]);
    const [indeks, setIndeks] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
   
    useEffect(() => {
      getPengajuan();
    }, [page, keyword]);
   
    const getPengajuan = async () => {
      const response = await axios.get(
        `http://localhost:3001/pengajuan`
      );
      setPengajuan(response.data.result);
    };
   
    const changePage = ({ selected }) => {
      setPage(selected);
      if (selected === 9) {
        setMsg(
          "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
        );
      } else {
        setMsg("");
      }
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
        setPage(response.data.page);
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
   
    return (
        <>
        <div className="flex flex-col w-screen mt-10 p-1">
            <div className="font-bold mb-4 text-xl">
                LIST DATA
            </div>
            <div className="flex justify-between">
                <div>
                    <table className="border border-cyan-500 text-left ml-28" style={{width: '500px'}}>
                        <tr className="border border-cyan-500 text-left m-auto">
                            <th colspan="3" className="border border-cyan-500 text-center m-auto p-2">Belum terdaftar</th>
                        </tr>
                        <tr className="border border-cyan-500 text-left m-auto">
                            <th className="border border-cyan-500 text-center m-auto p-2" style={{width: '50px'}}>No</th>
                            <th className="border border-cyan-500 text-center m-auto p-2">Indeks Masalah</th>
                            <th className="border border-cyan-500 text-center m-auto p-2">Action</th>
                        </tr>
                            {pengajuan.map((indeks, index) => (
                            <tr key ={indeks.id}>
                                <th className="border border-cyan-500 text-center m-auto p-2">{index + 1}</th>
                                <th className="border border-cyan-500 text-center m-auto p-2">{indeks.indeks_masalah}</th>
                                <th className="border border-cyan-500 text-center m-auto p-2">
                                    <button type="button" className="text-green-600" onClick={() => {if(window.confirm('Approve the item?')){window.location.reload();}{Accept(indeks.id)};}}>ACCEPT</button>
                                    <button type="button" className="ml-4 text-red-600">REJECT</button>
                                </th>
                            </tr>
                            ))}
                    </table>
                </div>
                <div>
                    <table className="border border-cyan-500 text-left mr-28" style={{width: '500px'}}>
                        <tr className="border border-cyan-500 text-left m-auto">
                            <th colspan="2" className="border border-cyan-500 text-center m-auto p-2">Sudah terdaftar</th>
                        </tr>
                        <tr className="border border-cyan-500 text-left m-auto">
                            <th colspan="2" className="border border-cyan-500 text-center m-auto p-2">
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
                        <tr className="border border-cyan-500 text-left m-auto">
                            <th className="border border-cyan-500 text-center m-auto p-2" style={{width: '50px'}}>No</th>
                            <th className="border border-cyan-500 text-center m-auto p-2">Indeks Masalah</th>
                        </tr>
                            {indeks.map((indeks, index) => (
                            <tr key ={indeks.id}>
                                <th className="border border-cyan-500 text-center m-auto p-2">{index + 1}</th>
                                <th className="border border-cyan-500 text-center m-auto p-2">{indeks.indeks_masalah}</th>
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
                </div>
            </div>
        </div>
        </>
    
    //   <div className="container mt-5">
    //     <div className="columns">
    //       <div className="column is-centered">
    //         <form onSubmit={searchData}>
    //           <div className="field has-addons">
    //             <div className="control is-expanded">
    //               <input
    //                 type="text"
    //                 className="input"
    //                 value={query}
    //                 onChange={(e) => setQuery(e.target.value)}
    //                 placeholder="Find something here..."
    //               />
    //             </div>
    //             <div className="control">
    //               <button type="submit" className="button is-info">
    //                 Search
    //               </button>
    //             </div>
    //           </div>
    //         </form>
    //         <table className="table is-striped is-bordered is-fullwidth mt-2">
    //           <thead>
    //             <tr>
    //               <th>indeks_masalah</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {users.map((pengajuan) => (
    //               <tr key={pengajuan.id}>
    //                 <td>{pengajuan.indeks_masalah}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //         <p>
    //           Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
    //         </p>
    //         <p className="has-text-centered has-text-danger">{msg}</p>
    //         <nav
    //           className="pagination is-centered"
    //           key={rows}
    //           role="navigation"
    //           aria-label="pagination"
    //         >
    //           <ReactPaginate
    //             previousLabel={"< Prev"}
    //             nextLabel={"Next >"}
    //             pageCount={Math.min(10, pages)}
    //             onPageChange={changePage}
    //             containerClassName={"pagination-list"}
    //             pageLinkClassName={"pagination-link"}
    //             previousLinkClassName={"pagination-previous"}
    //             nextLinkClassName={"pagination-next"}
    //             activeLinkClassName={"pagination-link is-current"}
    //             disabledLinkClassName={"pagination-link is-disabled"}
    //           />
    //         </nav>
    //       </div>
    //     </div>
    //   </div>
    );

}

export default Input;