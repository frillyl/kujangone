import { MagnifyingGlassIcon, EyeIcon, PencilIcon, PlusIcon, TrashIcon, ArrowPathIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { formatTanggal } from "../../../../utils/formatTanggal";
import { showConfirmDialog, showToast } from "../../../../utils/toastHelper";
import Modal from "../../../components/common/Modal";
import axios from "axios";
import SortableColumn from "../../../components/table/SortableColumn";

export default function DataAgen() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null,
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [newData, setNewData] = useState({
        kode: "",
        nama: "",
        alamat: "",
        email: "",
        noHp: "",
    });

    const [editData, setEditData] = useState({
        kode: "",
        nama: "",
        alamat: "",
        email: "",
        noHp: "",
    });

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/master/agen`, {
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

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            await axios.post(`${import.meta.env.VITE_API_URL}/api/master/agen`, newData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowAddModal(false);
            setNewData({ kode: "", nama: "", alamat: "", email: "", noHp: "" });
            fetchData();

            showToast("success", "Data agen berhasil ditambahkan");
        } catch (err) {
            showToast("error", err.response?.data?.message || "Gagal menambah data");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            await axios.put(`${import.meta.env.VITE_API_URL}/api/master/agen/${selectedData._id}`, editData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowEditModal(false);
            fetchData();

            showToast("success", "Data agen berhasil diperbarui");
        } catch (err) {
            showToast("error", err.response?.data?.message || "Gagal memperbarui data");
        }
    };

    const handleDelete = async (id) => {
        const confirm = await showConfirmDialog(
            "Hapus Data?",
            "Data agen akan dihapus secara permanen.",
            "Ya, hapus!"
        );
        if (!confirm) return;
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/master/agen/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchData();

            showToast("success", "Data agen berhasil dihapus");
        } catch (err) {
            showToast("error", err.response?.data?.message || "Gagal menghapus data");
        }
    };

    const filteredData = data.filter((item) => {
        const matchSearch = item.kode.includes(searchTerm) || item.nama.toLowerCase().includes(searchTerm.toLowerCase());

        return matchSearch;
    })

    const sortedData = [...filteredData].sort((a,b ) => {
        if (!sortConfig.key) return 0;

        const fieldA = a[sortConfig.key]?.toString().toLowerCase();
        const fieldB = b[sortConfig.key]?.toString().toLowerCase();

        if (fieldA < fieldB) return sortConfig.direction === "asc" ? -1 : 1;
        if (fieldA > fieldB) return sortConfig.direction === "asc" ? -1 : 1;
        return 0;
    });

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    const resetSort = () => {
        setSortConfig({ key: null, direction: null });
    };

    return (
        <div className="w-full text-text-light transition-colors duration-300 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-primary-light font-heading text-center lg:text-left">
                    Data Agen
                </h1>
                <div className="flex items-center justify-center lg:justify-end text-sm text-text-light opacity-80 mt-2 lg:mt-0">
                    <span>Data Utama</span>
                    <span className="mx-1">/</span>
                    <span className="font-semibold text-text-light">Agen</span>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-center gap-3 mb-5">
                <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
                    <div className="relative w-full md:w-64 lg:w-72">
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                        <input type="text" placeholder="Cari data agen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary-light text-text-light border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-200" />
                    </div>
                    <button onClick={resetSort} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-text-light transition">
                        <ArrowPathIcon className="w-5 h-5" />
                        Reset Sort
                    </button>
                </div>

                <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl font-medium text-white bg-primary-light hover:bg-accent-light hover:text-black transition-colors duration-300 shadow-sm">
                    <PlusIcon className="w-5 h-5" />
                    Tambah Data
                </button>
            </div>

            <div className="w-full overflow-x-auto rounded-2xl border border-line-light bg-secondary-light shadow-md max-w-full">
                <table className="min-w-full text-sm md:text-base text-center">
                    <thead className="bg-primary-light text-white">
                        <tr>
                            <th className="px-3 py-3 md:px-4 font-semibold">No.</th>
                            <SortableColumn label="Kode Agen" columnKey="kode" sortConfig={sortConfig} onSort={handleSort} />
                            <SortableColumn label="Nama Agen" columnKey="nama" sortConfig={sortConfig} onSort={handleSort} />
                            <th className="px-3 py-3 md:px-4 font-semibold">Alamat</th>
                            <th className="px-3 py-3 md:px-4 font-semibold rounded-tr-2xl">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-6 text-gray-500 italic">
                                    Memuat data...
                                </td>
                            </tr>
                        ) : sortedData.length > 0 ? (
                            sortedData.map((item, index) => (
                                <tr key={item._id} className="border-b border-line-light transition-colors duration-200">
                                    <td className="px-3 py-3 md:px-4">{index + 1}.</td>
                                    <td className="px-3 py-3 md:px-4">{item.kode}</td>
                                    <td className="px-3 py-3 md:px-4 font-medium">{item.nama}</td>
                                    <td className="px-3 py-3 md:px-4">{item.alamat}</td>
                                    <td className="px-3 py-3 md:px-4">
                                        <div className="flex justify-center gap-3">
                                            <EyeIcon onClick={() => { setSelectedData(item); setShowDetailModal(true); }} className="w-5 h-5 text-info-base hover:scale-110 transition-transform duration-200 cursor-pointer" />
                                            <PencilIcon onClick={() => { setSelectedData(item); setEditData(item); setShowEditModal(true); }} className="w-5 h-5 text-warning-base hover:scale-110 transition-transform duration-200 cursor-pointer" />
                                            <TrashIcon onClick={() => handleDelete(item._id)} className="w-5 h-5 text-danger-base hover:scale-110 transition-transform duration-200 cursor-pointer" />
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
                        {/* <tr className="border-b border-line-light hover:bg-background-light transition-colors duration-200">
                            <td className="px-3 py-3 md:px-4">1.</td>
                            <td className="px-3 py-3 md:px-4">21232506</td>
                            <td className="px-3 py-3 md:px-4">Agen A</td>
                            <td className="px-3 py-3 md:px-4">Jalan ABC Nomor 133</td>
                            <td className="px-3 py-3 md:px-4">
                                <div className="flex justify-center gap-3">
                                    <EyeIcon className="w-5 h-5 text-info-base hover:scale-110 transition-transform duration-200 cursor-pointer" />
                                    <PencilIcon onClick={() => {setShowEditModal(true)}} className="w-5 h-5 text-warning-base hover:scale-110 transition-transform duration-200 cursor-pointer" />
                                    <TrashIcon className="w-5 h-5 text-danger-base hover:scale-110 transition-transform duration-200 cursor-pointer" />
                                </div>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>

            <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Tambah Data Agen">
                <form className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6" onSubmit={handleAddSubmit}>
                        <input type="text" placeholder="Nama Agen" value={newData.nama} onChange={(e) => setNewData({ ...newData, nama: e.target.value })} className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                    <textarea placeholder="Alamat" value={newData.alamat} onChange={(e) => setNewData({ ...newData, alamat: e.target.value })} className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300"></textarea>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <input type="email" placeholder="Email" value={newData.email} onChange={(e) => setNewData({ ...newData, email: e.target.value })} className="w-full pl-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                        <input type="text" placeholder="Nomor HP" value={newData.noHp} onChange={(e) => setNewData({ ...newData, noHp: e.target.value })} className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                        <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 w-full sm:w-auto">Batal</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-primary-light text-white hover:bg-accent-light hover:text-black w-full sm:w-auto">Tambah</button>
                    </div>
                </form>
            </Modal>

            <Modal open={showDetailModal} onClose={() => setShowDetailModal(false)} title="Detail Agen">
                {selectedData && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-line-light rounded-lg overflow-hidden text-xs xs:text-sm md:text-base">
                            <tbody>
                                {[
                                    ["Kode Agen", selectedData.kode],
                                    ["Nama Agen", selectedData.nama],
                                    ["Alamat", selectedData.alamat],
                                    ["Email", selectedData.email],
                                    ["Nomor HP", selectedData.noHp],
                                    ["Ditambahkan Pada", formatTanggal(selectedData.createdAt)],
                                    ["Ditambahkan Oleh", selectedData.createdBy?.nama || selectedData.createdBy?.refId?.nama || "-"],
                                    ["Diperbarui Pada", formatTanggal(selectedData.updatedAt)],
                                    ["Diperbarui Oleh", selectedData.updatedBy?.nama || selectedData.updatedBy?.refId?.nama || "-"],
                                ].map(([label, value], idx) => (
                                    <tr key={label} className={`${ idx % 2 === 0 ? "bg-secondary-light" : "bg-background-light" } border-b border-line-light`}>
                                        <td className="font-semibold px-3 sm:px-4 py-2 w-1/3 text-left text-text-light whitespace-nowrap">{label}</td>
                                        <td className="px-3 sm:px-4 py-2 w-2/3 text-left text-text-light wrap-break-words">{value || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Modal>

            <Modal open={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Data Agen">
                {selectedData && (
                    <form className="space-y-3 sm:space-y-4 md:space-y-5" onSubmit={handleEditSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <input type="text" placeholder="Kode Agen" value={editData.kode} onChange={(e) => setEditData({ ...editData, kode: e.target.value })} className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" disabled />
                            <input type="text" placeholder="Nama Agen" value={editData.nama} onChange={(e) => setEditData({ ...editData, nama: e.target.value })} className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                        </div>
                        <textarea placeholder="Alamat" value={editData.alamat} onChange={(e) => setEditData({ ...editData, alamat: e.target.value })} className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300"></textarea>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <input type="email" placeholder="Email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} className="w-full pl-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                            <input type="text" placeholder="Nomor HP" value={editData.noHp} onChange={(e) => setEditData({ ...editData, noHp: e.target.value })} className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                            <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 w-full sm:w-auto">
                                Batal
                            </button>
                            <button type="submit" className="px-4 py-2 rounded-md bg-primary-light text-white hover:bg-accent-light hover:text-black w-full sm:w-auto">
                                Simpan
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}