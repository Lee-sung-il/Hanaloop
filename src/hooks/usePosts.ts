"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";

export function usePosts(companyId?: string) {
    return useQuery({
        queryKey: ["posts", companyId],
        queryFn: () => fetchPosts(companyId),
    });
}