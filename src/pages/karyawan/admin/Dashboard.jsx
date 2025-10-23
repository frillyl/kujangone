import { useState } from "react";
import { UsersIcon, BuildingStorefrontIcon, RectangleGroupIcon, ArrowTrendingUpIcon, CubeIcon, ChartBarIcon, ExclamationTriangleIcon, StarIcon } from "@heroicons/react/16/solid";
import CardStat from "../../../components/dashboard/CardStat";
import ChartSales from "../../../components/dashboard/ChartSales";

export default function Dashboard() {
    const [periode, setPeriode] = useState("Mingguan");

    return (
        <div className="p-4 sm:p-5 md:p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold text-primary-dark flex items-center gap-2">
                    <RectangleGroupIcon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-base" />
                    Selamat Pagi, John!
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">
                    Dashboard / <span className="font-semibold text-primary-base">Administrator</span>
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left (Main Content) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Statistic Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <CardStat icon={<UsersIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-base" />} title="Anggota" value="371" growth="11" />
                        <CardStat icon={<UsersIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-base" />} title="Karyawan" value="15" growth="1" />
                        <CardStat icon={<BuildingStorefrontIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-base" />} title="Agen" value="20" growth="5" />
                    </div>

                    {/* Today Sales */}
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2">
                            <ChartBarIcon className="w-6 h-6 text-primary-base" />
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Penjualan Hari Ini</h2>
                        </div>
                        <p className="text-gray-500 text-sm">Penjualan yang tercapai hari ini</p>
                        <div className="text-2xl sm:text-3xl font-bold text-primary-base mt-3">Rp 175.500,00</div>
                    </div>

                    {/* Statistic Sales */}
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
                            <div className="flex items-center gap-2">
                                <ArrowTrendingUpIcon className="w-6 h-6 text-success-base" />
                                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Statistik Penjualan</h2>
                            </div>

                            {/* Dropown Filter */}
                            <select
                                value={periode}
                                onChange={(e) => setPeriode(e.target.value)}
                                className="border border-gray-300 text-gray-700 text-sm rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-base"
                            >
                                <option value="Mingguan">Mingguan</option>
                                <option value="Bulanan">Bulanan</option>
                                <option value="Tahunan">Tahunan</option>
                            </select>
                        </div>
                        <ChartSales periode={periode} />
                    </div>
                </div>

                {/* Right (Additional Information) */}
                <div className="space-y-6">
                    {/* Stock Running Low */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-2 mb-3">
                            <ExclamationTriangleIcon className="w-6 h-6 text-warning-base" />
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Stok Menipis</h2>
                        </div>
                        <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                            {[
                                { nama: "Minyak Goreng", sisa: 1 },
                                { nama: "Beras", sisa: 1 },
                                { nama: "Sabun Cuci Piring", sisa: 1 },
                            ].map((item, idx) => (
                                <li
                                    key={idx}
                                    className="flex justify-between items-center border-b pb-1 last:border-none"
                                >
                                    <span>{item.nama}</span>
                                    <span className="text-xs bg-warning-light/20 text-warning-dark px-2 py-0.5 rounded-md">
                                        Tersisa {item.sisa}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Best-Selling Items */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-2 mb-3">
                            <StarIcon className="w-6 h-6 text-accent-dark" />
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Barang Terlaris</h2>
                        </div>
                        <ul className="list-disc ml-5 text-gray-700 text-sm sm:text-base space-y-1">
                            <li>Minyak Goreng</li>
                            <li>Beras</li>
                            <li>Sabun Cuci Piring</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}