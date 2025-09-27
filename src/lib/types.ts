export type Company = {
    id: string;
    name: string;
    country: string; // ex: "US", "DE"
    emissions: GhgEmission[];
};

export type GhgEmission = {
    yearMonth: string;  // ex: "2024-01"
    source: string;     // ex: "gasoline", "lpg", "diesel"
    emissions: number;  // tons of CO2 equivalent
};

export type Post = {
    id: string;
    title: string;
    resourceUid: string; // Company.id
    dateTime: string;    // ex: "2024-02"
    content: string;
};