import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../utils/auth";
import Select from "react-select";
import SKKAD from "../components/SKKAD";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./Modal.css";

const Input = () => {
    function getUsernameFromToken() {
        const token = localStorage.getItem('accessToken');
        if (!token) return '';
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.username || '';
        } catch (e) {
            return '';
        }
    }
    Auth();

    const [indeks_masalah, setindeks_masalah] = useState();
    const [kode_klasifikasi, setkode_klasifikasi] = useState();
    const [uraian_informasi, seturaian_informasi] = useState('');
    const [tanggal, settanggal] = useState('');
    const [jumlah, setjumlah] = useState('');
    const [keterangan, setketerangan] = useState('');
    const [fileData, setFileData] = useState();
    const [fileName, setFileName] = useState();
    const [msg, setMsg] = useState('');

    const [FileBase64, setFileBase64] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);

    const [modal, setModal] = useState(false);
    const [popup, setPopup] = useState(false);

    const [pengajuan,setPengajuan] = useState();
    const [pilih, setPilih] = useState([]);
    const [test,setTest] = useState('');

    const Form = async(e) =>{
        e.preventDefault();
        window.alert("BERHASIL");
        window.location.reload()
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
            const username = getUsernameFromToken();
            await axios.post('http://localhost:3001/api/insert',{
                indeks_masalah:indeks_masalah,
                kode_klasifikasi:kode_klasifikasi,  
                uraian_informasi:uraian_informasi,
                tanggal:tanggal,
                jumlah:jumlah,
                keterangan:username,
                file_pdf:fileName,
            }); 
            setMsg({"msg": "Berhasil"});
        }catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }

    };
    
    const handlerklasifikasi = (e) =>{
        setkode_klasifikasi(e.kode_klasifikasi);
    };

    const handlerindeks = (e) =>{
        setindeks_masalah(e.indeks_masalah)
    };

    const handlerUpload = (e) => {
        const file = e.target.files[0];

        const now = new Date();
        const waktu = now.toTimeString().split(' ')[0].replace(/:/g, '');

        const parts = file.name.split('.');
        const ext = parts.length > 1 ? '.' + parts.pop() : '';
        const newName = kode_klasifikasi + "_" + tanggal + "_" + waktu + ext;

        const renamed = new File([file], newName, { type: file.type });
        setFileData(renamed);
        setFileName(newName);

        const reader = new FileReader();
        reader.readAsDataURL(renamed);
        reader.onload = (e) => {
            const base64 = e.target.result;
            setFileBase64(base64);
        }
    };
    
    function onDocumentLoadSuccess({numPages}){
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offSet){
        setPageNumber(prevPageNumber => prevPageNumber + offSet)
    };

    function changePagePrev(offSet){
        changePage(-1);
    };
    
    function changePageFwd(offSet){
        changePage(+1);
    };

    const toggleModal = () =>{
        setModal(!modal)
    }

    useEffect(() => {
        getPilih();
    }, []);

    const getPilih = async(e) => {
        const response = await axios.get('http://localhost:3001/view/spes');
        setPilih(response.data);
    }

    const handlerOpen = () => {
        setPopup(!popup);
    }

    const handlerClose = () => {
        setPopup(false);
    }

    const popupSubmit = async() => {
        const payload = {indeks_masalah:pengajuan,
        };
        const response = await axios.post('http://localhost:3001/api/pengajuan', payload);
            if (response.data && response.data.msg) {
                window.alert(response.data.msg);
            } else {
                window.alert('User added');
            }
            window.location.reload();
    }

    return(
        <>
        <div className="flex flex-col w-screen mt-10">
            <div className="font-bold mb-4 text-xl">
                INPUT ARSIP
            </div>
            <form method="POST" onSubmit={Form}>
                <table className="border-2 border-black text-left m-auto">
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th className="border-r-2 border-slate-500 p-2 pr-10">Indeks Masalah</th>
                        <th className="border border-slate-500 p-2">
                        <button type="button" onClick={handlerOpen}>INPUT INDEKS BARU</button>
                        <div style={{width: '500px'}}>
                            <Select
                                value={indeks_masalah}
                                options={pilih}
                                placeholder={JSON.stringify(indeks_masalah)}
                                onChange={handlerindeks}
                                isSearchable={true}
                                getOptionLabel={(Option) => Option.indeks_masalah}
                                getOptionValue={(Option) => Option.indeks_masalah}
                                className="w-full bg-white border hover:border-cyan-500 border-cyan-500 rounded bg-cyan-100 font-normal"
                                styles={{
                                    placeholder: (defaultStyles) =>({
                                        ...defaultStyles,
                                        color: 'black'
                                    }),
                                }}
                                required                   
                            />
                            <div>
                                {popup?<div className="main flex justify-center mt-10 w-full">
                                    <div className="popup border border-slate-500 bg-cyan-100 mx-auto w-[40%] mr-12">
                                        <div className="popupHeader border border-slate-500 bg-cyan-300 p-1 px-2">
                                            <h1>ajukan indeks masalah baru</h1>
                                            <button type="button" onClick={handlerClose} className="text-red-500">x</button>
                                        </div>
                                        <div className=" text-center pt-3">
                                            <input 
                                                size="50" 
                                                className="border focus:border-cyan-200 border-cyan-500 rounded font-normal p-2" 
                                                type="text"
                                                value={pengajuan}
                                                placeholder="isi disini"
                                                onChange={(e) => setPengajuan(e.target.value)}
                                                />
                                            <button type="button" onClick={popupSubmit} className="border border-cyan-500 bg-cyan-200 hover:bg-cyan-500 hover:text-white text-black font-bold ml-4 py-2 px-6 rounded-full">SUBMIT</button>
                                        </div>
                                    </div>
                                </div>:""}
                            </div>
                        </div>
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-200">
                    <th className="border-r-2 border-slate-500 p-2 pr-10">Kode Klasifikasi            
                        </th>
                        <th className="border border-slate-500 p-2">
                        <Select
                            value={kode_klasifikasi}
                            options={SKKAD.Option}
                            placeholder={JSON.stringify(kode_klasifikasi)}
                            onChange={handlerklasifikasi}
                            isSearchable={true}
                            getOptionLabel={(Option) => `${Option.kode_klasifikasi} : ${Option.uraian_informasi}`}
                            getOptionValue={(Option) => Option.kode_klasifikasi}
                            className="w-full bg-white border hover:border-cyan-500 border-cyan-500 rounded bg-cyan-100 font-normal"
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
                    <th className="border-r-2 border-slate-500 p-2 pr-10">Uraian Informasi</th>
                        <th className="border border-slate-500 p-2">
                        <div style={{width: '500px'}}>
                        <textarea
                            name="informasi"
                            rows="4"
                            className="w-full bg-white border focus:border-cyan-200 border-cyan-500 rounded font-normal pl-1"
                            value={uraian_informasi}
                            placeholder={"Isi disini"}
                            onChange={(e) => {seturaian_informasi(e.target.value)}}    
                            required
                        />  
                        </div>
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-200">
                    <th className="border-r-2 border-slate-500 p-2 pr-10">Tanggal</th>
                        <th className="border border-slate-500">
                        <input
                            type="date"
                            className="border focus:border-cyan-200 border-cyan-500 rounded bg-cyan-100 font-normal m-2 pl-1"
                            value={tanggal}
                            onChange={(e) => {settanggal(e.target.value)}}    
                            required
                        />
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-200">
                    <th className="border-r-2 border-slate-500 p-2 pr-10">Keterangan</th>
                        <th className="border border-slate-500">
                        <input 
                            type="file" 
                            name="upload"
                            className="m-2 block text-sm border hover:file:border-cyan-500 hover:file:bg-cyan-500 border-cyan-500 rounded-lg file:border-0 file:bg-cyan-500 cursor-pointer" 
                            onChange={handlerUpload}
                            accept=".pdf"
                            required
                        />
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th className="border-r-2 border-slate-500 p-2 pr-10">Preview</th>
                        <th className="border border-slate-500 text-left m-2">
                        <button onClick={toggleModal} type="button" className="m-2">LIHAT DOKUMEN</button>
                        {modal && (
                            <div className="modal">
                            <div onClick={toggleModal} className="overlay"></div>
                            <div className="modal-content">
                                <h2>Preview</h2>
                                <div className="flex justify-center">
                                <Document file={FileBase64} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page height="700" pageNumber={pageNumber} renderAnnotationLayer={false}/>
                                </Document>
                                </div>
                                <div className="flex justify-center">
                                    { pageNumber > 1 && <button onClick={changePagePrev} type="button"> [Prev] </button>}
                                    Page {pageNumber} of {numPages}
                                    { pageNumber < numPages && <button onClick={changePageFwd} type="button"> [Next] </button>}
                                </div>
                                <button className="close-modal" onClick={toggleModal} type="button">
                                <p className="text-red-600">CLOSE</p>
                                </button>
                            </div>
                            </div>
                        )}
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                    <th className="border-r-2 border-slate-500 p-2 pr-10">Jumlah Arsip</th>
                        <th className="border border-slate-500">
                        <input
                            type="number"
                            className="border border-cyan-500 rounded bg-cyan-100 font-normal m-2 pl-1 w-20"
                            value={jumlah}
                            onChange={(e) => {setjumlah(e.target.value)}} 
                            placeholder={numPages}  
                            required
                        />
                        (Lembar)
                        </th>
                    </tr>
                    <tr className="border border-slate-500 bg-cyan-100">
                        <th colspan="3" className="border-2 border-black text-center p-2 text-hover:blue">
                            <button className="border border-cyan-500 bg-cyan-200 hover:bg-cyan-500 hover:text-white text-black font-bold py-2 px-6 rounded-full">KIRIM</button>
                        </th>
                    </tr>
                </table>
                {msg}
            </form>
        </div>
        </>
    )
}

export default Input;