import { useState, useEffect } from "react";
import { BellIcon, Bars3Icon, ChevronDownIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import defaultProfile from "../../assets/images/user.png";
import ThemeToggle from "../../components/ThemeToggle";

export default function Header({ onToggleSidebar }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const nav = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) return;

                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
            } catch (err) {
                console.error("Gagal memuat user:", err);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        logout();
        nav("/login");
    };

    return (
        <header className="flex justify-between items-center max-w-full px-4 sm:px-6 py-3 shadow-md border-b bg-primary-light text-line-light border-line-light">
            <div className="flex items-center gap-3">
                <button onClick={onToggleSidebar} className="rounded-lg p-2 hover:bg-secondary-light/20 transition">
                    <Bars3Icon className="w-6 h-6 text-line-light" />
                </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 relative">
                <ThemeToggle />

                <button className="relative p-2 rounded-lg hover:bg-secondary-light/20 transition">
                    <BellIcon className="w-6 h-6 text-line-light" />
                    <span className="absolute -top-1 -right-1 bg-danger-base text-line-light text-xs rounded-full px-1">
                        3
                    </span>
                </button>

                <div className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 border-l border-line-light pl-3 sm:pl-4 hover:text-accent-light transition">
                        <img src={defaultProfile} alt="User" className="w-8 h-8 rounded-full ring-2 ring-line-light"/>
                        <span className="hidden sm:inline font-medium text-line-light">{user ? user.nama : "Loading"}</span>
                        <ChevronDownIcon className={`w-5 h-5 hidden sm:block transition-transform ${
                            dropdownOpen ? "rotate-180" : ""
                        }`} />
                    </button>

                    {dropdownOpen && user && (
                        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-background-light text-gray-700 rounded-xl shadow-xl overflow-hidden z-20 animate-fade-in">
                            <div className="p-4 border-b border-gray-200">
                                <p className="font-semibold">{user ? user.nama : "Loading"}</p>
                                <p className="text-sm text-gray-500">{user.username} / {user.role}</p>
                            </div>
                            <ul className="flex flex-col">
                                <li>
                                    <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-primary-light/20 hover:font-medium transition">
                                        <UserCircleIcon className="w-5 h-5 text-primary-light" />
                                        Edit Profil
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-primary-light/20 hover:font-medium transition">
                                        <Cog6ToothIcon className="w-5 h-5 text-primary-light" />
                                        Pengaturan Akun
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-primary-light/20 hover:font-medium transition">
                                        <ArrowRightEndOnRectangleIcon className="w-5 h-5 text-primary-light" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}