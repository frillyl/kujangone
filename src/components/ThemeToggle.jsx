import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle({ className = "" }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            title={isDark ? "Ubah ke Mode Terang" : "Ubah ke Mode Gelap"}
            className={`p-2 rounded-full bg-secondary-light dark:bg-secondary-dark hover:opacity-80 transition ${className}`}
        >
            {isDark ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
                <MoonIcon className="h-5 w-5 text-gray-700" />
            )}
        </button>
    );
}