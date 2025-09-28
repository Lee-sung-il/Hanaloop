import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";
import { Post } from "@/lib/types";

export function usePosts(companyId?: string) {
    return useQuery<Post[]>({
        queryKey: ["posts", companyId],
        queryFn: () => fetchPosts(companyId),
    });
}