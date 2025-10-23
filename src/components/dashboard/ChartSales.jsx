import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dataSet = {    Mingguan: [
        { name: "Sen", value: 120 },
        { name: "Sel", value: 200 },
        { name: "Rab", value: 180 },
        { name: "Kam", value: 220 },
        { name: "Jum", value: 260 },
        { name: "Sab", value: 190 },
        { name: "Min", value: 150 },
    ],
    Bulanan: [
        { name: "Jan", value: 200 },
        { name: "Feb", value: 180 },
        { name: "Mar", value: 150 },
        { name: "Apr", value: 160 },
        { name: "Mei", value: 140 },
        { name: "Jun", value: 100 },
        { name: "Jul", value: 170 },
        { name: "Agu", value: 220 },
        { name: "Sep", value: 210 },
        { name: "Okt", value: 230 },
        { name: "Nov", value: 240 },
        { name: "Des", value: 200 },
    ],
    Tahunan: [
        { name: "2021", value: 1500 },
        { name: "2022", value: 1800 },
        { name: "2023", value: 2200 },
        { name: "2024", value: 2500 },
        { name: "2025", value: 2700 },
    ],
};

export default function ChartSales({periode}) {
    const data = dataSet[periode] || [];

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#006A4E" strokeWidth={2} fillOpacity={0.3} />
            </LineChart>
        </ResponsiveContainer>
    );
}