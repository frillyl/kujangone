import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, ArrowPathIcon, MagnifyingGlassIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/16/solid";
import { useState, useRef, useEffect } from "react";

export default function DataAnggota() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPangkat, setFilterPangkat] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [openPangkat, setOpenPangkat] = useState(false);
    const [searchPangkat, setSearchPangkat] = useState("");
    const [openStatus, setOpenStatus] = useState(false);
    const pangkatRef = useRef(null);
    const statusRef = useRef(null);

    const daftarPangkat = [
        {
            kategori: "Tamtama",
            pangkatList: ["Prada", "Pratu", "Praka", "Kopda", "Koptu", "Kopka"],
        },
        {
            kategori: "Bintara",
            pangkatList: ["Serda", "Sertu", "Serka", "Serma", "Pelda", "Peltu"],
        },
        {
            kategori: "Perwira Pertama",
            pangkatList: ["Letda", "Lettu", "Kapten"],
        },
        {
            kategori: "Perwira Menengah",
            pangkatList: ["Mayor", "Letkol", "Kolonel"],
        },
        {
            kategori: "Perwira Tinggi",
            pangkatList: ["Brigjen", "Mayjen", "Letjen", "Jenderal"],
        },
    ];

    const filteredRanks = daftarPangkat.map((d) => ({
        kategori: d.kategori,
        pangkatList: d.pangkatList.filter((p) =>
            p.toLowerCase().includes(searchPangkat.toLowerCase())
        ),
    }));

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pangkatRef.current && !pangkatRef.current.contains(e.target)) setOpenPangkat(false);
            if (statusRef.current && !statusRef.current.contains(e.target)) setOpenStatus(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const data = [
        { id: 1, nama: "Aldi", nrp: "21232506", pangkat: "Serda", status: "Aktif" },
        { id: 2, nama: "Budi", nrp: "21458901", pangkat: "Kopda", status: "Non-Aktif" },
        { id: 3, nama: "Caine", nrp: "21577832", pangkat: "Serda", status: "Aktif" },
    ];
    
    const filteredData = data.filter((item) => {
        const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || item.nrp.includes(searchTerm);
        const matchPangkat = filterPangkat ? item.pangkat === filterPangkat : true;
        const matchStatus = filterStatus ? item.status === filterStatus : true;

        return matchSearch && matchPangkat && matchStatus;
    });

    return (
        <div className="min-h-screen bg-background-light text-text-light px-6 md:px-10 py-8 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h1 className="text-3xl font-bold text-primary-light font-heading">Data Anggota</h1>
                <div className="flex items-center text-sm text-text-light opacity-80 mt-2 md:mt-0">
                    <span>Data Utama</span>
                    <span className="mx-1">/</span>
                    <span className="font-semibold text-text-light">Anggota</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-5">
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="relative w-full sm:w-1/3">
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                        <input type="text" placeholder="Cari data anggota..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary-light text-text-light border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-200" />
                    </div>

                    <div className="relative sm:w-48" ref={pangkatRef}>
                        <button onClick={() => setOpenPangkat(!openPangkat)} className="w-full flex justify-between items-center px-3 py-2 rounded-xl bg-secondary-light border border-line-light text-text-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-200">
                            <span>{filterPangkat || "Semua Pangkat"}</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${openPangkat ? "rotate-180" : ""}`}/>
                        </button>

                        {openPangkat && (
                            <div className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto bg-background-light border border-line-light rounded-md shadow-lg">
                                <div className="p-2 border-b border-line-light">
                                    <input type="text" placeholder="Cari pangkat..." value={searchPangkat} onChange={(e) => setSearchPangkat(e.target.value)} className="w-full py-1.5 px-2 border rounded-md text-sm focus:ring-2 focus:ring-primary-light"/>
                                </div>
                                <div className="max-h-56 overflow-y-auto">
                                    <div onClick={() => {setFilterPangkat(""); setOpenPangkat(false); setSearchPangkat("");}} className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${filterPangkat === "" ? "bg-primary-light text-white" : "italic text-gray-600 hover:bg-primary-light hover:text-white"}`}>
                                        <span>Semua Pangkat</span>
                                        {filterPangkat === "" && <CheckIcon className="w-4 h-4" />}
                                    </div>

                                    <div className="border-b border-line-light my-1"></div>

                                    {filteredRanks.map(
                                        ({ kategori, pangkatList }) => pangkatList.length > 0 && (
                                            <div key={kategori}>
                                                <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase bg-gray-100">
                                                    {kategori}
                                                </div>
                                                {pangkatList.map((p) => (
                                                    <div key={p} onClick={() => {setFilterPangkat(p); setOpenPangkat(false); setSearchPangkat("");}} className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${filterPangkat === p ? "bg-primary-light text-white" : "hover:bg-primary-light hover:text-white"}`}>
                                                        <span>{p}</span>
                                                        {filterPangkat === p && <CheckIcon className="w-4 h-4" />}
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    )}
                                    {filteredRanks.every((d) => d.pangkatList.length === 0) && (
                                        <div className="px-4 py-2 text-sm text-gray-500">
                                            Tidak ditemukan
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative sm:w-40" ref={statusRef}>
                        <button onClick={() => setOpenStatus(!openStatus)} className="w-full flex justify-between items-center px-3 py-2  rounded-xl bg-secondary-light border border-line-light text-text-light focus:outline-none focus:ring-2  focus:ring-primary-light transition-all duration-200">
                            <span>{filterStatus || "Semua Status"}</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${openStatus ? "rotate-180" : ""}`} />
                        </button>

                        {openStatus && (
                            <div className="absolute z-50 mt-1 w-full bg-background-light border border-line-light rounded-md shadow-lg">
                                {["", "Aktif", "Non-Aktif"].map((status) => (
                                    <div key={status || "Semua"} onClick={() => {setFilterStatus(status); setOpenStatus(false); }} className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${ filterStatus === status ? "bg-primary-light text-white" : "hover:bg-primary-light hover:text-white"}`}>
                                        <span>{status || "Semua Status"}</span>
                                        {filterStatus === status && <CheckIcon className="w-4 h-4" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white bg-primary-light hover:bg-accent-light hover:text-black transition-colors duration-300 shadow-sm">
                    <PlusIcon className="w-5 h-5" />
                    Tambah Data
                </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-line-light bg-secondary-light shadow-md">
                <table className="min-w-full text-sm md:text-base text-center">
                    <thead className="bg-primary-light text-white">
                        <tr>
                            <th className="px-4 py-3 font-semibold">No.</th>
                            <th className="px-4 py-3 font-semibold">Nama</th>
                            <th className="px-4 py-3 font-semibold">NRP</th>
                            <th className="px-4 py-3 font-semibold">Pangkat</th>
                            <th className="px-4 py-3 font-semibold">Status</th>
                            <th className="px-4 py-3 font-semibold rounded-tr-2xl">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={item.id} className="border-b border-line-light hover:bg-background-light transition-colors duration-200">
                                    <td className="px-4 py-3">{index + 1}.</td>
                                    <td className="px-4 py-3 font-medium">{item.nama}</td>
                                    <td className="px-4 py-3">{item.nrp}</td>
                                    <td className="px-4 py-3">{item.pangkat}</td>
                                    <td className={`px-4 py-3 ${item.status === "Aktif" ? "text-success-base font-semibold" : "text-danger-base"}`}
                                    >
                                        {item.status}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-3">
                                            <EyeIcon className="w-5 h-5 text-info-base hover:scale-110 transition-transform duration-200 cursor-pointer" />
                                            <PencilIcon className="w-5 h-5 text-warning-base hover:scale-110 transition-transform duration-200 cursor-pointer" />
                                            <TrashIcon className="w-5 h-5 text-danger-base hover:scale-110 transition-transform duration-200 cursor-pointer" />
                                            <ArrowPathIcon className="w-5 h-5 text-text-light hover:rotate-180 transition-transform duration-300 cursor-pointer" />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-6 text-gray-500 italic">
                                    Tidak ada data yang cocok.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}