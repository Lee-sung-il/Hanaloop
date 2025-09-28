"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Filter, BarChartHorizontal, Calendar as CalendarIcon, Building } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { useCompanies } from "@/hooks/useCompanies";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { AddCompanyModal } from "@/components/add-company-modal";
import TimeSeriesChart from "@/components/charts/time-series-chart";

// 연도 선택을 위한 상수
const availableYears = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2];

// 월-연도 선택기 컴포넌트
function MonthYearSelector({ date, setDate }: { date: Date, setDate: (date: Date) => void }) {
    const handleYearChange = (year: string) => {
        setDate(new Date(Number(year), date.getMonth(), 1));
    };

    const handleMonthChange = (month: string) => {
        setDate(new Date(date.getFullYear(), Number(month), 1));
    };

    return (
        <div className="flex items-center gap-2">
            <Select value={String(date.getFullYear())} onValueChange={handleYearChange}>
                <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    {availableYears.map(year => <SelectItem key={year} value={String(year)}>{year}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select value={String(date.getMonth())} onValueChange={handleMonthChange}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <SelectItem key={i} value={String(i)}>{format(new Date(0, i), 'MMMM')}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default function DashboardPage() {
    // 1. 필터 상태 관리 (시작일, 종료일, 국가)
    const [startDate, setStartDate] = useState<Date>(new Date(2024, 0, 1));
    const [endDate, setEndDate] = useState<Date>(new Date(2024, 2, 1));
    const [selectedCountry, setSelectedCountry] = useState<string>('all');
    
    const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);

    // 날짜 범위가 변경되면 dateRange를 업데이트
    const dateRange = useMemo(() => ({ from: startDate, to: endDate }), [startDate, endDate]);

    // 2. 필터 상태를 훅에 전달하여 데이터 가져오기
    const { data: allCompanies, isLoading: isLoadingAllCompanies } = useCompanies('all');
    const { data: companies, isLoading, isError, error } = useCompanies(selectedCountry, dateRange);

    // 3. 데이터 계산 로직 (이하 동일)
    const uniqueCountries = useMemo(() => {
        if (!allCompanies) return [];
        return ['all', ...Array.from(new Set(allCompanies.map(c => c.country).sort()))];
    }, [allCompanies]);

    const summaryData = useMemo(() => {
        if (!companies) {
            return { totalEmissions: 0, emissionChange: 0, totalCompanies: 0 };
        }
        const totalEmissions = companies.reduce((acc, company) => 
            acc + (company.emissions?.reduce((sum, e) => sum + e.emissions, 0) ?? 0), 0);
        
        return {
            totalEmissions,
            emissionChange: Math.random() * 20 - 10, // Placeholder
            totalCompanies: companies.length,
        };
    }, [companies]);

    const chartData = useMemo(() => {
        if (!companies) return [];

        const monthlyTotals = companies
            .flatMap(company => company.emissions ?? [])
            .reduce((acc, emission) => {
                const month = emission.yearMonth;
                acc[month] = (acc[month] || 0) + emission.emissions;
                return acc;
            }, {} as Record<string, number>);

        const sortedMonths = Object.keys(monthlyTotals).sort();

        return sortedMonths.map(monthStr => ({
            name: format(new Date(monthStr), "MMM"),
            value: monthlyTotals[monthStr],
        }));
    }, [companies]);

    if (isError) {
        return <div className="p-6 text-red-500">Error loading data: {error.message}</div>;
    }

    // 필터 컨트롤 UI (재사용을 위해 컴포넌트로 분리)
    const FilterControls = () => (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <MonthYearSelector date={startDate} setDate={setStartDate} />
                <span className="self-center">~</span>
                <MonthYearSelector date={endDate} setDate={setEndDate} />
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry} disabled={isLoadingAllCompanies}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent>
                    {isLoadingAllCompanies ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                    ) : (
                        uniqueCountries.map(country => (
                            <SelectItem key={country} value={country}>
                                {country === 'all' ? 'All Countries' : country}
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>
        </div>
    );

    return (
        <>
            <AddCompanyModal isOpen={isAddCompanyModalOpen} onOpenChange={setIsAddCompanyModalOpen} />
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
                {/* 헤더 및 필터 */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Dashboard</h1>
                    
                    <div className="sm:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    <Filter className="mr-2 h-4 w-4" /> Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                                <div className="mt-4"><FilterControls /></div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:gap-2">
                        <FilterControls />
                        <Button onClick={() => setIsAddCompanyModalOpen(true)}>+ Add</Button>
                    </div>
                </div>
                
                {/* 요약 카드 */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {isLoading ? <Skeleton className="h-10 w-3/4" /> : (
                                <>
                                    <div className="text-2xl font-bold">{summaryData.totalEmissions.toLocaleString()} tCO2e</div>
                                    <p className={cn("text-xs", summaryData.emissionChange >= 0 ? "text-red-500" : "text-green-500")}>
                                        {summaryData.emissionChange.toFixed(1)}% from last month
                                    </p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Managed Companies</CardTitle>
                            <BarChartHorizontal className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {isLoading ? <Skeleton className="h-10 w-1/2" /> : (
                                <>
                                    <div className="text-2xl font-bold">{summaryData.totalCompanies}</div>
                                    <p className="text-xs text-muted-foreground">Total companies in filter</p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* 차트 및 회사 목록 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <CardHeader><CardTitle>Monthly Emissions Trend</CardTitle></CardHeader>
                        <CardContent className="h-[350px] p-2">
                            {isLoading ? (
                                <Skeleton className="h-full w-full" />
                            ) : chartData.length > 0 ? (
                                <TimeSeriesChart data={chartData} />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <BarChartHorizontal className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No data to display for the selected period.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Companies</CardTitle></CardHeader>
                        <CardContent className="h-[400px] overflow-y-auto">
                            {isLoading ? (
                                <div className="space-y-4 pt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex items-center space-x-4">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-[150px]" />
                                                <Skeleton className="h-3 w-[100px]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : companies && companies.length > 0 ? (
                                <div className="space-y-1">
                                    {companies.map(company => (
                                        <Link key={company.id} href={`/companies/${company.id}`} className="block p-2 -mx-2 rounded-md hover:bg-muted">
                                            <div className="font-medium">{company.name}</div>
                                            <div className="text-sm text-muted-foreground">Country: {company.country}</div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <Building className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No companies found.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
