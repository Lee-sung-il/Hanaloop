import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCompanies, addCompany } from '@/lib/api';
import type { Company } from '@/lib/types';
import { DateRange } from 'react-day-picker';

export function useCompanies(country?: string, dateRange?: DateRange) {
    return useQuery({
        queryKey: [
            'companies',
            country || 'all',
            dateRange?.from?.toISOString(),
            dateRange?.to?.toISOString(),
        ],
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
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
    });
}