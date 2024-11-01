"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface DashboardProps {
    data: {
        name: string;
        count: number;
    }[];
}

export default function Dashboard({ data }: DashboardProps) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
    const total = data.reduce((sum, entry) => sum + entry.count, 0);

    return (
        <div className="w-full h-[250px] sm:h-[400px] bg-card p-2 sm:p-4 rounded-lg border">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        dataKey="count"
                        nameKey="name"
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
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
