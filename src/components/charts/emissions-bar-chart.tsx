"use client";

import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip} from "recharts";
import type {GhgEmission} from "@/lib/types";

interface EmissionsBarChartProps {
    data: GhgEmission[];
}

export default function EmissionsBarChart({data}: EmissionsBarChartProps) {
    const chartData = data.map(item => ({
        month: new Date(item.yearMonth).toLocaleString('en-US', {month: 'short'}),
        emissions: item.emissions,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}t`}
                />
                <Tooltip
                    cursor={{fill: 'transparent'}}
                    contentStyle={{
                        background: 'rgba(255, 255, 255, 0.8)', // 반투명 흰색 배경
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }}
                />
                <Bar dataKey="emissions" fill="#8884d8" radius={[4, 4, 0, 0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}