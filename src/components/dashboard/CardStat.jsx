export default function CardStat({ icon, title, value, growth }) {
    return (
        <div className="flex flex-col justify-between bg-white rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm sm:text-base">
                    {icon}
                    {title}
                </div>
                {growth && <span className="text-xs sm:text-sm text-gray-400">+ {growth}</span>}
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-primary-base">{value}</div>
        </div>
    )
}