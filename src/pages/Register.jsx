import { useState, useRef, useEffect } from "react";
import { UserIcon, IdentificationIcon, EnvelopeIcon, DevicePhoneMobileIcon } from "@heroicons/react/16/solid";
import ThemeToggle from "../components/ThemeToggle";

export default function Register() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const [form, setForm] = useState({
        nama: "",
        nrp: "",
        pangkat: "",
        email: "",
        noHp: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const filteredRanks = daftarPangkat.map((d) => ({
        kategori: d.kategori,
        pangkatList: d.pangkatList.filter((p) =>
            p.toLowerCase().includes(search.toLowerCase())
        ),
    }));

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email && !form.noHp) {
            setError("Mohon isi salah satu antara Email atau Nomor HP untuk verifikasi keamanan.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registrasi gagal");

            alert("Registrasi berhasil! Silahkan verifikasi akun Anda.");
            setForm({ nama: "", nrp: "", pangkat: "", email: "", noHp: "" });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary-light transition-colors duration-300 px-4 sm:px-6 md:px-8">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8 md:p-10 rounded-2xl shadow-md md:shadow-lg bg-background-light border border-line-light transition-all duration-300">
                <ThemeToggle className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading mb-1 text-text-light text-center">Selamat Datang</h1>
                <p className="text-xs sm:text-sm mb-6 text-center text-text-light">
                    Sudah memiliki akun?{" "}
                    <a href="/login" className="font-semibold hover:underline text-primary-light">
                        Masuk
                    </a>
                </p>

                {error && (
                    <div className="text-red-600 text-sm mb-4 text-center font-medium">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 text-left">
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
                        <input type="text" name="nama" placeholder="Nama Lengkap" value={form.nama} onChange={handleChange} required className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-300" />
                    </div>
                    <div className="relative">
                        <IdentificationIcon className="absolute left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
                        <input type="text" name="nrp" placeholder="NRP" value={form.nrp} onChange={handleChange} required className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-300" />
                    </div>
                    <div className="relative" ref={dropdownRef}>
                    <IdentificationIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <input type="text" placeholder="Pilih Pangkat" value={form.pangkat} onClick={() => setOpen(!open)} onChange={(e) => {
                            setForm({ ...form, pangkat: e.target.value });
                            setSearch(e.target.value);
                            setOpen(true);
                        }} className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-300 cursor-pointer" readOnly={false}
                    />

                    {open && (
                        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-background-light border border-line-light rounded-md shadow-lg">
                            <div className="p-2 border-b border-line-light">
                                <input type="text" placeholder="Cari pangkat..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full py-1.5 px-2 border rounded-md focus:ring-2 focus:ring-primary-light text-sm"
                                />
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                                {filteredRanks.map(
                                ({ kategori, pangkatList }) =>
                                    pangkatList.length > 0 && (
                                    <div key={kategori}>
                                        <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase bg-gray-100">
                                            {kategori}
                                        </div>
                                        {pangkatList.map((p) => (
                                        <div key={p} onClick={() => {
                                                setForm({ ...form, pangkat: p });
                                                setOpen(false);
                                                setSearch("");
                                            }} className="px-4 py-2 text-sm hover:bg-primary-light hover:text-white cursor-pointer transition-colors duration-150">
                                            {p}
                                        </div>
                                        ))}
                                    </div>
                                    )
                                )}
                                {filteredRanks.every((d) => d.pangkatList.length === 0) && (
                                <div className="px-4 py-2 text-sm text-gray-500">Tidak ditemukan</div>
                                )}
                            </div>
                        </div>
                    )}
                    </div>
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-300" />
                    </div>
                    <div className="relative">
                        <DevicePhoneMobileIcon className="absolute left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
                        <input type="text" name="noHp" placeholder="Nomor HP" value={form.noHp} onChange={handleChange} className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-300" />
                    </div>

                    <button disabled={loading} type="submit" className="w-full py-2 sm:py-2.5 md:py-3 font-semibold rounded-md bg-primary-light text-background-light hover:opacity-90 active:scale-[0.98] transition-all duration-300">
                        {loading ? "Memproses..." : "Daftar"}
                    </button>
                </form>
            </div>
        </div>
    );
}