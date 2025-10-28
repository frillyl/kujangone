import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowPathIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import ThemeToggle from "../components/ThemeToggle";

export default function VerifyAccount() {
    const { state } = useLocation();
    const nav = useNavigate();
    const [username, setUsername] = useState(state?.username || "");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => {
            setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, code }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Verifikasi gagal");

            alert("Akun berhasil diverifikasi! Silahkan login.");
            nav("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!username) {
            setError("Masukkan username terlebih dahulu.");
            return;
        }

        setResending(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/resend-verification`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ username }),
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.remaining) setCooldown(data.remaining);
                throw new Error(data.message || "Gagal mengirim ulang kode");
            }

            setMessage(data.message || "Kode verifikasi baru telah terkirim! Silahkan cek email atau kotak pesan Anda.");
            setCooldown(data.remaining || 60);
        } catch (err) {
            setError(err.message);
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary-light transition-colors duration-300 px-4 sm:px-6 md:px-8">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8 md:p-10 rounded-2xl shadow-md md:shadow-lg bg-background-light border border-line-light transition-all duration-300">
                <ThemeToggle className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading mb-1 text-text-light text-center">Verifikasi Akun</h1>
                <p className="text-xs sm:text-sm mb-6 text-center text-text-light">Masukkan username dan kode verifikasi yang dikirim ke email atau nomor Anda.</p>

                {error && <div className="text-red-600 text-sm mb-4 text-center font-medium">{error}</div>}
                {message && <div className="text-green-600 text-sm mb-4 text-center font-medium">{message}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 text-left">
                    <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-300" disabled />
                    </div>
                    <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
                        <input type="text" placeholder="Kode Verifikasi" value={code} onChange={(e) => setCode(e.target.value)} required className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-300" />
                    </div>
                    
                    <button type="submit" disabled={loading} className="w-full py-2 sm:py-2.5 md:py-3 font-semibold rounded-md bg-primary-light text-background-light hover:opacity-90 active:scale-[0.98] transition-all duration-300">
                        {loading ? "Memverifikasi..." : "Verifikasi"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button onClick={handleResend} disabled={resending || cooldown > 0} className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${resending || cooldown > 0 ? "text-gray-400 cursor-not-allowed" : "text-primary-light hover:underline"}`}>
                        <ArrowPathIcon className={`w-4 h-4 ${resending ? "animate-spin" : ""}`} />
                        {resending ? "Mengirim ulang..." : cooldown > 0 ? `Tunggu ${cooldown}s` : "Kirim Ulang Kode Verifikasi"}
                    </button>
                </div>
            </div>
        </div>
    );
}