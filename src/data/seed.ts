import { Company, Post } from "@/lib/types";

export const companies: Company[] = [
    {
        id: "c1",
        name: "Acme Corp",
        country: "US",
        emissions: [
            { yearMonth: "2024-01", source: "Electricity", emissions: 120 },
            { yearMonth: "2024-02", source: "Transport", emissions: 110 },
            { yearMonth: "2024-03", source: "Manufacturing", emissions: 95 },
        ],
    },
    {
        id: "c2",
        name: "Globex",
        country: "DE",
        emissions: [
            { yearMonth: "2024-01", source: "Transport", emissions: 80 },
            { yearMonth: "2024-02", source: "Electricity", emissions: 105 },
            { yearMonth: "2024-03", source: "Manufacturing", emissions: 120 },
        ],
    },
    {
        id: "c3",
        name: "Stark Industries",
        country: "KR",
        emissions: [
            { yearMonth: "2024-01", source: "Manufacturing", emissions: 210 },
            { yearMonth: "2024-02", source: "Transport", emissions: 180 },
            { yearMonth: "2024-03", source: "Electricity", emissions: 195 },
        ],
    },
];

export const posts: Post[] = [
    {
        id: "p1",
        title: "Sustainability Report Q1",
        resourceUid: "c1",
        dateTime: "2024-02",
        content: "Quarterly CO2 update shows a promising downward trend.",
    },
];