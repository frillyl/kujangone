import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, MagnifyingGlassIcon, CheckIcon } from "@heroicons/react/16/solid";

export default function PangkatSelect({ daftarPangkat, value, onChange, variant = "filter", placeholder = "Pilih Pangkat" }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef(null);

    const filteredRanks = daftarPangkat.map((kategori) => ({
        kategori: kategori.kategori,
        pangkatList: kategori.pangkatList.filter((pangkat) =>
            pangkat.toLowerCase().includes(search.toLowerCase())
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

    const baseButton =
        variant === "filter"
            ? "px-3 py-2 rounded-xl bg-secondary-light"
            : "px-3 py-2.5 md:py-3 rounded-md bg-background-light";

    return (
        <div className={`relative ${variant === "form" ? "w-full" : "w-full sm:w-64 md:w-72 lg:w-80"}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`w-full flex justify-between items-center border border-line-light text-text-light focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-200 ${baseButton}`}
            >
                <span>{value || placeholder}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full bg-background-light border border-line-light rounded-lg shadow-lg">
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-line-light">
                        <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Cari pangkat..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-transparent focus:outline-none text-sm text-text-light"
                        />
                    </div>

                    <div className="max-h-56 overflow-y-auto py-1">
                        <div
                            onClick={() => {
                                onChange({ target: { value: "" } });
                                setOpen(false);
                                setSearch("");
                            }}
                            className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                                value === "" ? "bg-primary-light text-white" : "hover:bg-primary-light hover:text-white"
                            }`}
                        >
                            <span>Semua Pangkat</span>
                            {value === "" && <CheckIcon className="w-4 h-4" />}
                        </div>

                        {filteredRanks.map(
                            (kategori) =>
                                kategori.pangkatList.length > 0 && (
                                    <div key={kategori.kategori}>
                                        <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
                                            {kategori.kategori}
                                        </div>
                                        {kategori.pangkatList.map((pangkat) => (
                                            <div
                                                key={pangkat}
                                                onClick={() => {
                                                    onChange({ target: { value: pangkat } });
                                                    setOpen(false);
                                                    setSearch("");
                                                }}
                                                className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                                                    value === pangkat
                                                        ? "bg-primary-light text-white"
                                                        : "hover:bg-primary-light hover:text-white"
                                                }`}
                                            >
                                                <span>{pangkat}</span>
                                                {value === pangkat && <CheckIcon className="w-4 h-4" />}
                                            </div>
                                        ))}
                                    </div>
                                )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}