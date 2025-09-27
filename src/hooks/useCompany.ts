"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCompanyById } from "@/lib/api";

export function useCompany(id: string) {
    return useQuery({
        queryKey: ["company", id],
        queryFn: () => fetchCompanyById(id),
        enabled: !!id,
    });
}
