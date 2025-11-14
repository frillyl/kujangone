import {
    ChevronUpDownIcon,
    ChevronUpIcon,
    ChevronDownIcon,
} from "@heroicons/react/16/solid";

export default function SortableColumn({ label, columnKey, sortConfig, onSort }) {
    const isActive = sortConfig.key === columnKey;

    const handleClick = () => {
        onSort(columnKey);
    };

    return (
        <th onClick={handleClick} className="px-3 py-3 md:px-4 font-semibold cursor-pointer select-none">
            <div className="flex items-center justify-center gap-1">
                {label}
                {!isActive ? (
                    <ChevronUpDownIcon className="w-4 h-4" />
                ) : sortConfig.direction === "asc" ? (
                    <ChevronUpIcon className="w-4 h-4" />
                ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                )}
            </div>
        </th>
    );
}