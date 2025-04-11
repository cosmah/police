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
    email: string; // Changed to string
    role: string; // Changed to string
    station: Station | null; // Corrected station type
    station_id: number | null; // Added station_id
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
