import { EnvelopeIcon, KeyIcon, SunIcon, MoonIcon } from "@heroicons/react/16/solid";
import ThemeToggle from "../../components/ThemeToggle";

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary-light transition-colors duration-300 px-4 sm:px-6 md:px-8">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8 md:p-10 rounded-2xl shadow-md md:shadow-lg bg-background-light border border-line-light transition-all duration-300">
                <ThemeToggle className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading mb-1 text-text-light text-center">Selamat Datang</h1>
                <p className="text-xs sm:text-sm mb-6 text-center text-text-light">
                    Belum memiliki akun?{" "}
                    <a href="#" className="font-semibold hover:underline text-primary-light">
                        Daftar
                    </a>
                </p>

                <form className="space-y-3 sm:space-y-4 md:space-y-5 text-left">
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
                        <input type="text" placeholder="Email atau Username" className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-300" />
                    </div>
                    <div className="relative">
                        <KeyIcon className="absolute left-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
                        <input type="password" placeholder="Password" className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 rounded-md border border-line-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors duration-300" />
                    </div>

                    <div className="flex flex-row items-center justify-between gap-3 text-sm text-text-light">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="accent-primary-light transition-colors duration-300" />
                            <span>Ingat Saya</span>
                        </label>
                        <a href="#" className="hover:underline text-primary-light">
                            Lupa Password?
                        </a>
                    </div>

                    <button type="submit" className="w-full py-2 sm:py-2.5 md:py-3 font-semibold rounded-md bg-primary-light text-background-light hover:opacity-90 active:scale-[0.98] transition-all duration-300">
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    );
}