import { MagnifyingGlassIcon, EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import Modal from "../../../components/common/Modal";
import { useState } from "react";

export default function DataAgen() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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
                        <input type="text" placeholder="Cari data agen..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary-light text-text-light border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-200" />
                    </div>
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
                            <th className="px-3 py-3 md:px-4 font-semibold">Kode Agen</th>
                            <th className="px-3 py-3 md:px-4 font-semibold">Nama Agen</th>
                            <th className="px-3 py-3 md:px-4 font-semibold">Alamat</th>
                            <th className="px-3 py-3 md:px-4 font-semibold rounded-tr-2xl">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-line-light hover:bg-background-light transition-colors duration-200">
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
                        </tr>
                    </tbody>
                </table>
            </div>

            <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Tambah Data Agen">
                <form className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <input type="text" placeholder="Kode Agen" className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                        <input type="text" placeholder="Nama Agen" className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                    </div>
                    <textarea placeholder="Alamat" className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300"></textarea>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <input type="email" placeholder="Email" className="w-full pl-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                        <input type="text" placeholder="Nomor HP" className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                        <button type="button" className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 w-full sm:w-auto">Batal</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-primary-light text-white hover:bg-accent-light hover:text-black w-full sm:w-auto">Tambah</button>
                    </div>
                </form>
            </Modal>

            <Modal open={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Data Agen">
                    <form className="space-y-3 sm:space-y-4 md:space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <input type="text" placeholder="Kode Agen" className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                            <input type="text" placeholder="Nama Agen" className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                        </div>
                        <textarea placeholder="Alamat" className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300"></textarea>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <input type="email" placeholder="Email" className="w-full pl-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
                            <input type="text" placeholder="Nomor HP" className="w-full px-3 py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300" />
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
            </Modal>
        </div>
    );
}