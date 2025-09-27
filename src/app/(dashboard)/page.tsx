"use client";

import { useCompanies } from "@/hooks/useCompanies";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import TimeSeriesChart from "@/components/charts/time-series-chart";
import { Company, GhgEmission } from "@/lib/types";

export default function DashboardPage() {
    const { data: companies, isLoading, isError, error } = useCompanies();

    if (isLoading) {
        return <div>Loading dashboard...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    // --- 데이터 가공 로직 (변경 없음) ---
    const totalCompanies = companies?.length || 0;

    const latestMonth = "2024-03";
    const totalEmissionsLatestMonth =
        companies
            ?.flatMap((c: Company) => c.emissions)
            .filter((e: GhgEmission) => e.yearMonth === latestMonth)
            .reduce((sum: number, e: GhgEmission) => sum + e.emissions, 0) || 0;

    const monthlyEmissions = companies
        ?.flatMap((c: Company) => c.emissions)
        .reduce((acc: Record<string, number>, emission: GhgEmission) => {
            const month = new Date(emission.yearMonth).toLocaleString("default", {
                month: "short",
            });
            acc[month] = (acc[month] || 0) + emission.emissions;
            return acc;
        }, {});

    const chartData = monthlyEmissions
        ? Object.entries(monthlyEmissions).map(([name, value]) => ({
            name,
            value,
        }))
        : [];
    // -------------------------

    return (
        <div>
            {/* 여기에 다크모드 텍스트 색상을 추가합니다. */}
            <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Dashboard Overview</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Emissions ({latestMonth})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{totalEmissionsLatestMonth}t CO₂e</p>
                        <p className="text-xs text-muted-foreground">
                            Total emissions for the last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Managed Companies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{totalCompanies}</p>
                        <p className="text-xs text-muted-foreground">
                            Total number of affiliated companies
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Monthly Emissions Trend</CardTitle>
                </CardHeader>
                <CardContent>
                    <TimeSeriesChart data={chartData} />
                </CardContent>
            </Card>
        </div>
    );
}
