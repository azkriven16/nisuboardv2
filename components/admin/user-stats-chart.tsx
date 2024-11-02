"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface UserStatsChartProps {
    data: {
        landlords: number;
        tenants: number;
        admins: number;
    };
}

export default function UserStatsChart({ data }: UserStatsChartProps) {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    const chartData = [
        { name: "Landlords", count: data.landlords },
        { name: "Tenants", count: data.tenants },
        { name: "Admins", count: data.admins },
    ];

    const total = chartData.reduce((sum, entry) => sum + entry.count, 0);

    return (
        <div className="w-full h-[250px] sm:h-[400px] bg-card p-2 sm:p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        dataKey="count"
                        nameKey="name"
                        label={({ value }) => `${value}`}
                        labelLine={false}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xl font-medium"
                    >
                        {`Total\n${total}`}
                    </text>
                    <Tooltip />
                    <Legend
                        wrapperStyle={{
                            fontSize: "12px",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
