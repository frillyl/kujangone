import { XMarkIcon } from "@heroicons/react/16/solid";

export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-background-light w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-fade-in">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-danger-base transition">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-semibold mb-4 text-primary-light">{title}</h2>
                {children}
            </div>
        </div>
    );
}