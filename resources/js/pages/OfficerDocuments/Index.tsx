// OfficerDocuments/Index.tsx
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Document, Station, User } from '@/types';
import {
  FileText,
  Filter,
  Download,
  Eye,
  Search,
  Building,
  Users,
  Tag
} from 'lucide-react';

interface OfficerDocumentsIndexProps {
    documents: Document[];
    stations: Station[];
    users: User[];
    categories: string[];
    filters: {
        station_id?: number;
        user_id?: number;
        category?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/settings/profile',
    },
];

const OfficerDocumentsIndex: React.FC<OfficerDocumentsIndexProps> = ({ documents, stations, users, categories, filters }) => {
    const [stationFilter, setStationFilter] = useState<number | undefined>(filters.station_id);
    const [userFilter, setUserFilter] = useState<number | undefined>(filters.user_id);
    const [categoryFilter, setCategoryFilter] = useState<string | undefined>(filters.category);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFilters = {
            station_id: stationFilter,
            user_id: userFilter,
            category: categoryFilter,
        };

        if (name === "station_id") {
            newFilters.station_id = value ? parseInt(value) : undefined;
            setStationFilter(value ? parseInt(value) : undefined);
        } else if (name === "user_id") {
            newFilters.user_id = value ? parseInt(value) : undefined;
            setUserFilter(value ? parseInt(value) : undefined);
        } else if (name === "category") {
            newFilters.category = value || undefined;
            setCategoryFilter(value || undefined);
        }

        router.get(window.location.pathname, newFilters, { replace: true });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Add search functionality when needed
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <Head title="Officer Documents" />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                        <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Officer Documents
                        </h1>
                    </div>

                    <div className="flex">
                        <form onSubmit={handleSearch} className="relative mr-4">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search documents..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="py-2 pl-10 pr-4 block w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            />
                        </form>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6">
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Building className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    name="station_id"
                                    value={stationFilter || ''}
                                    onChange={handleFilterChange}
                                    className="pl-10 block w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                >
                                    <option value="">All Stations</option>
                                    {stations.map((station) => (
                                        <option key={station.id} value={station.id}>
                                            {station.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Users className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    name="user_id"
                                    value={userFilter || ''}
                                    onChange={handleFilterChange}
                                    className="pl-10 block w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                >
                                    <option value="">All Creators</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Tag className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    name="category"
                                    value={categoryFilter || ''}
                                    onChange={handleFilterChange}
                                    className="pl-10 block w-full rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Station
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Uploaded By
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {documents.length > 0 ? (
                                    documents.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {doc.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                <div className="flex items-center">
                                                    <FileText className="h-4 w-4 text-gray-400 mr-2" />
                                                    {doc.title}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    {doc.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {doc.station.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {doc.user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <Link
                                                        href={`/officer/documents/${doc.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center"
                                                    >
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        <span className="hidden sm:inline">View</span>
                                                    </Link>
                                                    <Link
                                                        href={`/officer/documents/${doc.id}/download`}
                                                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 inline-flex items-center"
                                                    >
                                                        <Download className="h-4 w-4 mr-1" />
                                                        <span className="hidden sm:inline">Download</span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                            No documents found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination can be added here if needed */}
                </div>
            </div>
        </AppLayout>
    );
};

export default OfficerDocumentsIndex;
