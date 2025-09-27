import { companies, posts } from "@/data/seed";
import { Company, Post } from "./types";

// 데이터 복사본을 만들어 원본 데이터가 변경되지 않도록 함
const _companies = [...companies];
let _posts = [...posts];

// 200ms ~ 800ms 사이의 임의의 딜레이를 생성
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
// 15% 확률로 에러 발생
const maybeFail = () => Math.random() < 0.15;

export async function fetchCompanies(): Promise<Company[]> {
    await delay(jitter());
    // 실제 API 호출을 시뮬레이션
    return JSON.parse(JSON.stringify(_companies));
}

export async function fetchPosts(companyId?: string): Promise<Post[]> {
    await delay(jitter());
    if (companyId) {
        const companyPosts = _posts.filter((p) => p.resourceUid === companyId);
        return JSON.parse(JSON.stringify(companyPosts));
    }
    return JSON.parse(JSON.stringify(_posts));
}

export async function createOrUpdatePost(
    p: Omit<Post, "id"> & { id?: string }
): Promise<Post> {
    await delay(jitter());
    if (maybeFail()) throw new Error("Save failed. Please try again.");

    if (p.id) {
        // 기존 포스트 업데이트
        _posts = _posts.map((x) => (x.id === p.id ? (p as Post) : x));
        return p as Post;
    }

    // 새 포스트 생성
    const created = { ...p, id: crypto.randomUUID() };
    _posts = [..._posts, created];
    return created;
}

export async function fetchCompanyById(id: string): Promise<Company | undefined> {
    await delay(jitter());
    const company = _companies.find((c) => c.id === id);
    // 실제 API 호출처럼 깊은 복사를 해서 반환
    return company ? JSON.parse(JSON.stringify(company)) : undefined;
}