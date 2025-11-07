import { XMarkIcon } from "@heroicons/react/16/solid";

export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3 sm:px-4">
            <div className="bg-background-light w-full max-w-[90%] xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 lg:p-8 relative animate-fade-in">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-danger-base transition">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                {title && (
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-primary-light">{title}</h2>
                )}
                {children}
            </div>
        </div>
    );
}