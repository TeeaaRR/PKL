import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useAsyncError, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import Select from "react-select";
import SKKAD from "../components/SKKAD";

const Input = () => {
    Auth();

    const [indeks_masalah, setindeks_masalah] = useState();
    const [kode_klasifikasi, setkode_klasifikasi] = useState();
    const [informasi, setinformasi] = useState('');
    const [tanggal, settanggal] = useState('');
    const [jumlah, setjumlah] = useState('');
    const [keterangan, setketerangan] = useState('');
    const [fileData, setFileData] = useState();
    const [fileName, setFileName] = useState();
    const [msg, setMsg] = useState('');
    const [text, setText] = useState('');

    const Form = async(e) =>{
        e.preventDefault();

        const data = new FormData();
        data.append('dokumen', fileData);

        axios({
            method: 'post',
            url: 'http://localhost:3001/api/upload',
            data: data
        })
        .then((result) => {
            setMsg({"msg": "Berhasil"});
        })
        .catch((error) => {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        });

        try {
            await axios.post('http://localhost:3001/api/insert',{
                kode_klasifikasi:kode_klasifikasi,
                informasi:informasi,
                tanggal:tanggal,
                jumlah:jumlah,
                file_pdf:fileName,
        }); 
        setMsg({"msg": "Berhasil"});
        }catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    };

    const Option = [
        {"kode_klasifikasi":"HU.00.01","indeks_masalah":"Kliping Koran", "value":"1"},
        {"kode_klasifikasi":"HU.00.02","indeks_masalah":"Daily News Monitoring (DNM)", "value":"2"},
        {"kode_klasifikasi":"HU.00.03","indeks_masalah":"Analisa Pemberitaan Media Cetak", "value":"3"},
        { key: "AF", value: "4", text: "Afghanistan" },
        { key: "AL", value: "8", text: "Albania" },
        { key: "DZ", value: "12", text: "Algeria" }
    ];

    const testklasifikasi = Option.map(({  }))


    const handlerklasifikasi = (e) =>{
        setkode_klasifikasi(e.kode_klasifikasi);
    };

    const handlerindeks = (e) =>{
        setindeks_masalah(e.indeks_masalah);
        
    };

    const handlerUpload = (e) => {
        setFileData(e.target.files[0]);
        const { value } = e.target;
        setFileName(value);
    };

    return(
        <>
        <div className="flex flex-col w-screen mt-10">
            <div className="font-bold mb-4 text-xl">
                FORM INPUT DATA
            </div>
            <form method="POST" onSubmit={Form}>
                <table className="border border-cyan-500 text-left m-auto">
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th className="border border-slate-500 p-2 pr-10">Indeks Masalah</th>
                        <th className="border border-slate-500 p-2">:</th>
                        <th className="border border-slate-500 p-2">
                        <div style={{width: '500px'}}>
                        <textarea
                            name="informasi"
                            className="border hover:border-cyan-500 border-cyan-100 rounded m-2 bg-cyan-100 font-normal"
                            value={informasi}
                            onChange={(e) => {setinformasi(e.target.value)}}    
                            required
                        />
                        </div>  
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-200">
                    <th className="border border-slate-500 p-2 pr-10">Kode Klasifikasi</th>
                        <th className="border border-slate-500 p-2">:</th>
                        <th className="border border-slate-500 p-2">
                        <Select
                            id="select2"
                            value={kode_klasifikasi}
                            options={SKKAD.Option}
                            placeholder={JSON.stringify(kode_klasifikasi)}
                            onChange={handlerklasifikasi}
                            isSearchable={true}
                            getOptionLabel={(Option) => Option.kode_klasifikasi}
                            getOptionValue={(Option) => Option.kode_klasifikasi}
                            styles={{
                                placeholder: (defaultStyles) =>({
                                    ...defaultStyles,
                                    color: 'black'
                                }),
                            }}
                            required                   
                        />
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                    <th className="border border-slate-500 p-2 pr-10">Uraian Informasi</th>
                        <th className="border border-slate-500 p-2">:</th>
                        <th className="border border-slate-500 p-2">
                        
                        <Select
                            id="select1"
                            value={kode_klasifikasi}
                            options={SKKAD.Option}
                            placeholder={JSON.stringify(indeks_masalah)}
                            onChange={handlerindeks}
                            isSearchable={true}
                            getOptionLabel={(Option) => Option.indeks_masalah}
                            getOptionValue={(Option) => Option.kode_klasifikasi}
                            styles={{
                                placeholder: (defaultStyles) =>({
                                    ...defaultStyles,
                                    color: 'black'
                                }),
                            }}
                            required
                            menuPosition="fixed"      
                        />
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-200">
                    <th className="border border-slate-500 p-2 pr-10">Tanggal</th>
                        <th className="border border-slate-500 p-2">:</th>
                        <th className="border border-slate-500">
                        <input
                            type="date"
                            className="border hover:border-cyan-500 border-cyan-100 rounded m-2 bg-cyan-100 font-normal"
                            value={tanggal}
                            onChange={(e) => {settanggal(e.target.value)}}    
                            required
                        />
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                    <th className="border border-slate-500 p-2 pr-10">Jumlah Arsip</th>
                        <th className="border border-slate-500 p-2">:</th>
                        <th className="border border-slate-500">
                        <input
                            type="number"
                            className="border hover:border-cyan-500 border-cyan-100 rounded m-2 bg-cyan-100 font-normal"
                            value={jumlah}
                            onChange={(e) => {setjumlah(e.target.value)}}    
                            required
                        />
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-200">
                    <th className="border border-slate-500 p-2 pr-10">Keterangan</th>
                        <th className="border border-slate-500 p-2">:</th>
                        <th className="border border-slate-500">
                        <input
                            type="text"
                            className="border hover:border-cyan-500 border-cyan-100 rounded m-2 bg-cyan-100 font-normal"
                            value={keterangan}
                            onChange={(e) => {setketerangan(e.target.value)}}    
                            required
                        />
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                    <th className="border border-slate-500 p-2 pr-10">Upload File</th>
                        <th className="border border-slate-500 p-2">:</th>
                        <th className="border border-slate-500">
                        <input 
                            type="file" 
                            className="border hover:border-cyan-500 border-cyan-100 rounded m-2 bg-cyan-100 font-normal"
                            onChange={handlerUpload}
                            accept=".pdf"
                            required
                        />
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th colspan="3" className="border border-slate-500 text-center">
                            <button>SUBMIT</button>
                        </th>
                    </tr>
                </table>
            </form>
        </div>
        </>
    )
}

export default Input;