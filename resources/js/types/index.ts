export interface BreadcrumbItem {
    title: string;
    href: string | null;
}

export interface Station {
    id: number;
    name: string;
    region: string;
}

export interface User {
    id: number;
    name: string;
}

export interface Document {
    id: number;
    title: string;
    description: string | null;
    category: string;
    file_path: string;
    station: Station;
    user: User;
}
