import React, { useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface Station {
    id: number;
    name: string;
    region: string;
}

interface Document {
    id: number;
    title: string;
    category: string;
    file_path: string;
    station: Station;
    user: { id: number; name: string };
}

interface Props {
    stations: Station[];
    documents: Document[];
    filters: { station_id?: string; search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stations, documents, filters }: Props) {
    const [stationId, setStationId] = useState(filters.station_id || '');
    const [search, setSearch] = useState(filters.search || '');

    const handleFilter = () => {
        router.get('/dashboard', { station_id: stationId, search }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Filter Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border p-4">
                    <h3 className="text-lg font-medium mb-4">Filter Documents</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <select
                            value={stationId}
                            onChange={(e) => setStationId(e.target.value)}
                            className="border-sidebar-border rounded p-2 flex-1"
                        >
                            <option value="">All Stations</option>
                            {stations.map((station) => (
                                <option key={station.id} value={station.id}>
                                    {station.name} ({station.region})
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title..."
                            className="border-sidebar-border rounded p-2 flex-1"
                        />
                        <button
                            onClick={handleFilter}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Filter
                        </button>
                    </div>
                </div>

                {/* Documents Table */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 rounded-xl border overflow-auto">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Station</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Created By</th>
                                {/* <th className="px-6 py-3 text-left text-sm font-medium">Action</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {documents.length > 0 ? (
                                documents.map((doc) => (
                                    <tr key={doc.id}>
                                        <td className="px-6 py-4 text-sm">{doc.title}</td>
                                        <td className="px-6 py-4 text-sm">{doc.category}</td>
                                        <td className="px-6 py-4 text-sm">{doc.station.name}</td>
                                        <td className="px-6 py-4 text-sm">{doc.user.name}</td>
                                        {/* <td className="px-6 py-4 text-sm">
                                            <Link
                                                href={`/documents/${doc.id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View
                                            </Link>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No documents found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
