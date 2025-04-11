import React, { useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Search, Filter, Users, Building, FileText, Eye, Plus } from 'lucide-react';

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
    auth: { user: { role: string } };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stations, documents, filters, auth }: Props) {
    const [stationId, setStationId] = useState(filters.station_id || '');
    const [search, setSearch] = useState(filters.search || '');

    const handleFilter = () => {
        router.get('/dashboard', { station_id: stationId, search }, { preserveState: true });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleFilter();
        }
    };

    const isSuperAdmin = auth.user.role === 'super_admin';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        <FileText className="inline-block mr-2 h-6 w-6 text-blue-500" />
                        Document Management
                    </h1>

                    {/* Admin Links (Super Admin Only) */}
                    {isSuperAdmin && (
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href="/users"
                                className="inline-flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-sm text-sm font-medium"
                            >
                                <Users className="h-4 w-4 mr-1" />
                                Manage Users
                            </Link>
                            <Link
                                href="/stations"
                                className="inline-flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-sm text-sm font-medium"
                            >
                                <Building className="h-4 w-4 mr-1" />
                                Manage Stations
                            </Link>
                            <Link
                                href="/documents/create"
                                className="inline-flex items-center bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-colors shadow-sm text-sm font-medium"
                            >
                                <Plus className="h-4 w-4 mr-1" />
                                Create Document
                            </Link>
                        </div>
                    )}
                </div>

                {/* Filter Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative rounded-lg border bg-white dark:bg-gray-800 shadow-sm p-4">
                    <div className="flex items-center mb-4">
                        <Filter className="h-5 w-5 text-blue-500 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter Documents</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="station-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Station</label>
                            <select
                                id="station-filter"
                                value={stationId}
                                onChange={(e) => setStationId(e.target.value)}
                                className="border-sidebar-border rounded-md p-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All Stations</option>
                                {stations.map((station) => (
                                    <option key={station.id} value={station.id}>
                                        {station.name} ({station.region})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
                            <div className="relative">
                                <input
                                    id="search-filter"
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Search by title..."
                                    className="border-sidebar-border rounded-md p-2 pl-8 w-full bg-white dark:bg-gray-700 dark:text-white"
                                />
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={handleFilter}
                                className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-sm text-sm font-medium h-10"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Documents Table */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 rounded-lg border bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Station</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created By</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {documents.length > 0 ? (
                                    documents.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{doc.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                                                    {doc.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{doc.station.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{doc.user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                {/* FIXED ACTION BUTTON - Ensuring the entire button area is clickable */}
                                                <Link
                                                    href={`/admin/documents/${doc.id}`}
                                                    className="block w-20 mx-auto py-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md transition-colors dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                                                >
                                                    <span className="flex items-center justify-center">
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View
                                                    </span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                                            <FileText className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                                            No documents found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
