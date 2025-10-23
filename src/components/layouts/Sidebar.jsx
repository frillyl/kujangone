import { RectangleGroupIcon, UserGroupIcon, UsersIcon, BuildingStorefrontIcon, ArchiveBoxIcon, DocumentChartBarIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation();

    const menuBase = [
        { title: "", items: [{ path: "/admin/dashboard", label: "Dashboard", icon: RectangleGroupIcon }] },
        {
            title: "Data Utama",
            items: [
                { path: "/master/anggota", label: "Anggota", icon: UserGroupIcon },
                { path: "/master/karyawan", label: "Karyawan", icon: UsersIcon },
                { path: "/master/agen", label: "Agen", icon: BuildingStorefrontIcon },
                { path: "/master/barang", label: "Barang", icon: ArchiveBoxIcon },
            ],
        },
        {
            title: "Transaksi",
            items: [{ path: "/kasir", label: "Kasir", icon: ShoppingCartIcon }],
        },
        {
            title: "Laporan",
            items: [
                { path: "/laporan/penjualan", label: "Penjualan", icon: DocumentChartBarIcon },
                { path: "/laporan/shu", label: "Sisa Hasil Usaha", icon: DocumentChartBarIcon },
            ],
        },
    ];

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-text-light/50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`fixed md:relative top-0 left-0 h-full z-30 bg-background-light text-text-light shadow-xl transition-all duration-300 ease-in-out ${
                    sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"
                }`}>
                <div className="relative flex items-center h-16 px-4 bg-primary-light text-line-light md:justify-center justify-between">
                    {sidebarOpen ? (
                        <h1 className="font-bold text-lg md:text-xl transition-all duration-300">
                            KujangOne
                        </h1>
                    ) : (
                        <RectangleGroupIcon className="w-7 h-7 text-line-light transition-all duration-300" />
                    )}
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden absolute right-4 text-line-light hover:text-accent-light">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-3 py-6 space-y-5 overflow-y-auto scrollbar-hide">
                    {menuBase.map((group) => (
                        <div key={group.title}>
                            {group.title && sidebarOpen && (
                                <p className="uppercase text-xs font-semibold text-primary-light px-2 mb-2">
                                    {group.title}
                                </p>
                            )}
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const active = location.pathname === item.path;

                                    return (
                                        <Link key={item.path} to={item.path} className={`flex items-center rounded-lg py-2 transition-all ${
                                                sidebarOpen ? "px-3 justify-start gap-3" : "justify-center px-0"
                                            } ${
                                                active
                                                    ? "bg-primary-light/25 text-primary-light font-semibold"
                                                    : "hover:bg-primary-light/20 hover:font-medium"
                                            }`}
                                        >
                                            <item.icon className={`w-5 h-5 ${
                                                    active
                                                        ? "text-primary-light"
                                                        : "text-text-light"
                                                }`}
                                            />
                                            {sidebarOpen && <span>{item.label}</span>}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
}