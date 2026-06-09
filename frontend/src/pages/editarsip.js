import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Auth from "../utils/auth";
import Select from "react-select";
import SKKAD from "../components/SKKAD";


const Edit = () => {
    Auth();
    const { id } = useParams(); // id is indeks_masalah
    const navigate = useNavigate();

    const [indeks_masalah, setIndeksMasalah] = useState("");
    const [kode_klasifikasi, setKodeKlasifikasi] = useState("");
    const [uraian_informasi, setUraianInformasi] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [msg, setMsg] = useState("");

    const [pilih, setPilih] = useState([]);

    useEffect(() => {
        const getArsip = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/view/${id}`);
                if (res.data) {
                    setIndeksMasalah(res.data.indeks_masalah || "");
                    setKodeKlasifikasi(res.data.kode_klasifikasi || "");
                    setUraianInformasi(res.data.uraian_informasi || "");
                    setTanggal(res.data.tanggal ? res.data.tanggal.split('T')[0] : "");
                    setJumlah(res.data.jumlah || "");
                    setKeterangan(res.data.keterangan || "");
                }
            } catch (error) {
                console.error(error);
            }
        };
        getArsip();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/view/${id}`, {
                kode_klasifikasi,
                indeks_masalah,
                uraian_informasi,
                tanggal,
                jumlah,
                keterangan
            });
            navigate('/home');
        } catch (error) {
            if (error.response) setMsg(error.response.data.msg || 'Update failed');
            else setMsg('Update failed');
        }
    };

    useEffect(() => {
            getPilih();
    }, []);

    const getPilih = async(e) => {
            const response = await axios.get('http://localhost:3001/view/spes');
            setPilih(response.data);
        }

    return (
        <div className="flex flex-col w-screen mt-10 p-4">
            <div className="font-bold mb-4 text-xl">EDIT ARSIP</div>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <div className="mb-3">
                    <label className="block mb-1">Indeks Masalah</label>
                    {/* <input value={indeks_masalah} onChange={(e) => setIndeksMasalah(e.target.value)} className="w-full border p-2" /> */}
                    <Select
                        value={indeks_masalah}
                        options={pilih}
                        placeholder={JSON.stringify(indeks_masalah)}
                        onChange={(e) => setIndeksMasalah(e.indeks_masalah)}
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
                </div>
                <div className="mb-3">
                    <label className="block mb-1">Kode Klasifikasi</label>
                    {/* <input value={kode_klasifikasi} onChange={(e) => setKodeKlasifikasi(e.target.value)} className="w-full border p-2" /> */}
                    <Select
                            value={kode_klasifikasi}
                            options={SKKAD.Option}
                            placeholder={JSON.stringify(kode_klasifikasi)}
                            onChange={(e) => setKodeKlasifikasi(e.kode_klasifikasi)}
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
                </div>
                <div className="mb-3">
                    <label className="block mb-1">Uraian Informasi</label>
                    <textarea value={uraian_informasi} onChange={(e) => setUraianInformasi(e.target.value)} rows={6} className="w-full border p-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                        <label className="block mb-1">Tanggal</label>
                        <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="w-full border p-2" />
                    </div>
                    <div>
                        <label className="block mb-1">Jumlah</label>
                        <input type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} className="w-full border p-2" />
                    </div>
                </div>
                {msg && <div className="text-red-600 mb-2">{msg}</div>}
                <div>
                    <button type="submit" className="border border-cyan-500 bg-cyan-200 hover:bg-cyan-500 hover:text-white text-black font-bold py-2 px-6 rounded-full">SIMPAN</button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
