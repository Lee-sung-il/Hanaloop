'use client';
import {useState} from 'react';
import {useParams} from 'next/navigation';
import {useCompany} from '@/hooks/useCompany';
import {Button} from '@/components/ui/button';
import {AddEmissionModal} from '@/components/add-emission-modal';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import EmissionsBarChart from '@/components/charts/emissions-bar-chart'; // 👈 1. 차트 컴포넌트 import

export default function CompanyDetailPage() {
    const params = useParams();
    const companyId = params.id as string;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data: company, isLoading, isError} = useCompany(companyId);

    if (isLoading) return <div>Loading company details...</div>;
    if (isError || !company) return <div>Company not found.</div>;

    return (
        <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{company.name} Details</h1>
                <Button onClick={() => setIsModalOpen(true)}>+ 배출량 추가</Button>
            </div>

            {/* 👇 2. 여기에 차트를 보여주는 새로운 카드를 추가합니다. */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Emissions Trend</CardTitle>
                    <CardDescription>Monthly emissions for {company.name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <EmissionsBarChart data={company.emissions}/>
                </CardContent>
            </Card>

            {/* 기존 배출량 목록 카드 */}
            <Card>
                <CardHeader>
                    <CardTitle>월별 배출량 데이터</CardTitle>
                    <CardDescription>
                        {company.name}의 월별 탄소 배출량 데이터입니다.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul>
                        {company.emissions.map((emission) => (
                            <li
                                key={emission.yearMonth}
                                className="flex justify-between items-center py-3 border-b last:border-b-0"
                            >
                                <div>
                                    <span className="font-medium">{emission.yearMonth}</span>
                                    <span className="text-sm text-gray-500 ml-2">({emission.source})</span>
                                </div>
                                <span className="font-bold text-lg">{emission.emissions}t</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <AddEmissionModal
                companyId={companyId}
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </div>
    );
}