import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCompanies, addCompany } from '@/lib/api';
import type { Company } from '@/lib/types';
import { DateRange } from 'react-day-picker'; // 👈 1. DateRange 타입 import

// 👇 2. 훅이 country와 dateRange 인자를 받도록 수정
export function useCompanies(country?: string, dateRange?: DateRange) {
    return useQuery({
        // 👇 3. queryKey에 필터 값들을 추가하여, 각 필터 조합별로 캐시를 관리
        queryKey: [
            'companies',
            country || 'all',
            dateRange?.from?.toISOString(),
            dateRange?.to?.toISOString(),
        ],
        // 👇 4. API 함수 호출 시 필터 값들을 전달
        queryFn: () =>
            fetchCompanies(
                country,
                dateRange?.from?.toISOString(),
                dateRange?.to?.toISOString()
            ),
    });
}

export function useAddCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newCompanyData: Omit<Company, 'id' | 'emissions'>) => addCompany(newCompanyData),
        onSuccess: () => {
            console.log("Invalidating companies query...");
            // 'companies'로 시작하는 모든 쿼리를 무효화하여 모든 필터링 결과가 새로고침되도록 함
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
    });
}