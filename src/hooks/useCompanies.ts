"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "@/lib/api";

export function useCompanies() {
    return useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies,
    });
}