import { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon, UserMinusIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Swal from "sweetalert2";
import PangkatSelect from "../../../components/common/PangkatSelect";

export default function DataKaryawan() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPangkat, setFilterPangkat] = useState("");
    const pangkatRef = useRef(null);

    const daftarPangkat = [
        { kategori: "Tamtama", pangkatList: ["Prada", "Pratu", "Praka", "Kopda", "Koptu", "Kopka"] },
        { kategori: "Bintara", pangkatList: ["Serda", "Sertu", "Serka", "Serma", "Pelda", "Peltu"] },
        { kategori: "Perwira Pertama", pangkatList: ["Letda", "Lettu", "Kapten"] },
        { kategori: "Perwira Menengah", pangkatList: ["Mayor", "Letkol", "Kolonel"] },
        { kategori: "Perwira Tinggi", pangkatList: ["Brigjen", "Mayjen", "Letjen", "Jenderal"] },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/master/karyawan`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setData(res.data);
        } catch (err) {
            console.error("Gagal memuat data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = data.filter((item) => {
        const matchSearch =
            item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nrp.includes(searchTerm);
        const matchPangkat = filterPangkat ? item.pangkat === filterPangkat : true;
        return matchSearch && matchPangkat;
    });

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pangkatRef.current && !pangkatRef.current.contains(e.target)) {
                //
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleUnassignKaryawan = async (id) => {
        const token = localStorage.getItem("accessToken");

        const confirm = await Swal.fire({
            title: "Unassign Karyawan?",
            text: "Karyawan ini akan dikembalikan menjadi anggota.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#D33333",
            confirmButtonText: "Ya, kembalikan!",
            cancelButtonText: "Batal",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/master/karyawan/unassign/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Karyawan telah berhasil dikembalikan menjadi anggota.",
                timer: 2000,
                showConfirmButton: false,
            });

            fetchData();
        } catch (error) {
            console.error("Gagal unassign karyawan:", error);
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: error.response?.data?.message || "Terjadi kesalahan saat unassign karyawan.",
            });
        }
    };

    return (
        <div className="w-full text-text-light transition-colors duration-300 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-primary-light font-heading text-center lg:text-left">
                    Data Karyawan
                </h1>
                <div className="flex items-center justify-center lg:justify-end text-sm text-text-light opacity-80 mt-2 lg:mt-0">
                    <span>Data Utama</span>
                    <span className="mx-1">/</span>
                    <span className="font-semibold text-text-light">Karyawan</span>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-center gap-3 mb-5">
                <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
                    <div className="relative w-full md:w-64 lg:w-72">
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Cari data karyawan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary-light text-text-light border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-200"
                        />
                    </div>

                    <PangkatSelect
                        daftarPangkat={daftarPangkat}
                        value={filterPangkat}
                        onChange={(e) => setFilterPangkat(e.target.value)}
                    />
                </div>
            </div>

            <div className="w-full overflow-x-auto rounded-2xl border border-line-light bg-secondary-light shadow-md max-w-full">
                <table className="min-w-full text-sm md:text-base text-center">
                    <thead className="bg-primary-light text-white">
                        <tr>
                            <th className="px-3 py-3 md:px-4 font-semibold">No.</th>
                            <th className="px-3 py-3 md:px-4 font-semibold">Nama</th>
                            <th className="px-3 py-3 md:px-4 font-semibold">NRP</th>
                            <th className="px-3 py-3 md:px-4 font-semibold">Pangkat</th>
                            <th className="px-3 py-3 md:px-4 font-semibold">Status</th>
                            <th className="px-3 py-3 md:px-4 font-semibold rounded-tr-2xl">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="py-6 text-gray-500 italic">
                                    Memuat data...
                                </td>
                            </tr>
                        ) : filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr
                                    key={item._id}
                                    className="border-b border-line-light hover:bg-background-light transition-colors duration-200"
                                >
                                    <td className="px-3 py-3 md:px-4">{index + 1}.</td>
                                    <td className="px-3 py-3 md:px-4 font-medium">{item.nama}</td>
                                    <td className="px-3 py-3 md:px-4">{item.nrp}</td>
                                    <td className="px-3 py-3 md:px-4">{item.pangkat}</td>
                                    <td
                                        className={`px-3 py-3 md:px-4 ${
                                            item.status === "Aktif"
                                                ? "text-success-base font-semibold"
                                                : "text-danger-base"
                                        }`}
                                    >
                                        {item.status}
                                    </td>
                                    <td className="px-3 py-3 md:px-4">
                                        <div className="flex justify-center gap-3">
                                            <UserMinusIcon
                                                onClick={() => handleUnassignKaryawan(item._id)}
                                                className="w-5 h-5 text-text-light hover:scale-110 transition-transform duration-300 cursor-pointer"
                                            />
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