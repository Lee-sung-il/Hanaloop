import { companies as seedCompanies, posts as seedPosts } from "@/data/seed";
import { Company, GhgEmission, Post } from "./types";
import { isWithinInterval, parseISO } from 'date-fns'; // 👈 1. date-fns에서 날짜 비교 함수 import

let _companies: Company[] = JSON.parse(JSON.stringify(seedCompanies));
let _posts: Post[] = JSON.parse(JSON.stringify(seedPosts));

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

export async function fetchCompanies(
    country?: string,
    startDate?: string,
    endDate?: string
): Promise<Company[]> {
    await delay(jitter());

    let filteredCompanies = [..._companies];

    if (country && country !== 'all') {
        filteredCompanies = filteredCompanies.filter(c => c.country === country);
    }

    if (startDate && endDate) {
        const range = { start: parseISO(startDate), end: parseISO(endDate) };
        filteredCompanies = filteredCompanies.map(company => ({
            ...company,
            emissions: company.emissions.filter(e => {
                const emissionDate = parseISO(e.yearMonth);
                return isWithinInterval(emissionDate, range);
            }),
        }));
    }
    return JSON.parse(JSON.stringify(filteredCompanies));
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
        _posts = _posts.map((x) => (x.id === p.id ? (p as Post) : x));
        return p as Post;
    }

    const created = { ...p, id: crypto.randomUUID() };
    _posts = [..._posts, created];
    return created;
}

export async function fetchCompanyById(id: string): Promise<Company | undefined> {
    await delay(jitter());
    const company = _companies.find((c) => c.id === id);
    return company ? JSON.parse(JSON.stringify(company)) : undefined;
}

export async function addEmissionToCompany(
    companyId: string,
    newEmission: Omit<GhgEmission, 'id'>
): Promise<Company> {
    await delay(jitter());
    if (maybeFail()) throw new Error("데이터 저장에 실패했습니다.");

    let updatedCompany: Company | undefined;
    _companies = _companies.map(company => {
        if (company.id === companyId) {
            const updatedEmissions = [...company.emissions, newEmission];
            updatedCompany = { ...company, emissions: updatedEmissions };
            return updatedCompany;
        }
        return company;
    });

    if (!updatedCompany) {
        throw new Error("회사를 찾을 수 없습니다.");
    }
    return updatedCompany;
}


export async function addCompany(newCompanyData: Omit<Company, 'id' | 'emissions'>): Promise<Company> {
    await delay(jitter());
    if (maybeFail()) throw new Error("회사 추가에 실패했습니다.");

    const newCompany: Company = {
        ...newCompanyData,
        id: `c${_companies.length + 1}`,
        emissions: [],
    };
    _companies = [..._companies, newCompany];
    return newCompany;
}