import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCompanyById, addEmissionToCompany } from '@/lib/api';
import type { GhgEmission } from '@/lib/types';

export function useCompany(companyId: string) {
    return useQuery({
        queryKey: ['company', companyId],
        queryFn: () => fetchCompanyById(companyId),
        enabled: !!companyId, // companyId가 있을 때만 쿼리 실행
    });
}

export function useAddEmission() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables: { companyId: string; newEmission: GhgEmission }) =>
            addEmissionToCompany(variables.companyId, variables.newEmission),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['company', variables.companyId] });
        },
        onError: (error) => {
            console.error("배출량 추가 실패:", error);
        }
    });
}