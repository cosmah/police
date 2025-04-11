import { ReactNode } from "react";

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
    email: string;
    role: string;
    station: Station | null;
    station_id: number | null;
}

export interface Document {
    created_at: any;
    id: number;
    title: string;
    description: string | null;
    category: string;
    file_path: string;
    station: Station;
    user: User;
    station_id: number | null; // Added station_id here
}

export interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType;
}

export interface AuthUser {
    user: {
        role: string;
    }
}
