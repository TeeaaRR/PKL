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
        const response = await axios.get(`http://localhost:3001/usersview?search_query=${keyword}&page=${page}&limit=${limit}`);
        setView(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    }

    const deleteUser = async(id) => {
        try{
            await axios.delete("http://localhost:3001/usersview/"+`${id}`);
            getView();
        }catch (error){
            console.log(error);
        }
    };

    return(
        <>
        <div className="flex flex-col w-screen mt-10 p-1">
            <div className="font-bold mb-4 text-xl">LIST USERS</div>
            <table className="border border-cyan-500 text-left m-auto ">
                <thead>
                <tr className="border border-cyan-500 text-left m-auto">
                    <th className="border border-cyan-500 text-center m-auto p-2">ID</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Username</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Nama Lengkap</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Email</th>
                    <th className="border border-cyan-500 text-center m-auto p-2">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th colSpan={5} className="p-2 text-center">
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
                {view.map((user, index) => (
                <tr key={user.id}>
                    <td className="border border-cyan-500 text-center m-auto p-2">{page * limit + index + 1}</td>
                    <td className="border border-cyan-500 text-center m-auto p-2">{user.username}</td>
                    <td className="border border-cyan-500 text-left m-auto p-2">{user.nama_lengkap}</td>
                    <td className="border border-cyan-500 text-left m-auto p-2">{user.email}</td>
                    <td className="border border-cyan-500 text-center m-auto p-2">
                        {/* <a className="p-1 text-blue-600" href={`/edituser/${user.id}`}>EDIT</a> */}
                        <button className="p-1 text-red-500" onClick={() => {if(window.confirm('Delete the item?')){deleteUser(user.id)};}}>HAPUS</button>
                    </td>
                </tr>
                ))}
                </tbody>
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