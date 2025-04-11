import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

interface Document {
    id: number;
    title: string;
    category: string;
    station: { name: string };
    user: { name: string };
}

interface Props {
    documents: Document[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Documents', href: '/documents' },
];

export default function DocumentIndex({ documents }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documents" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border p-4">
                    <Link
                        href="/documents/create"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Add Document
                    </Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 rounded-xl border overflow-auto">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Station</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Created By</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Action</th>
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
                                        <td className="px-6 py-4 text-sm">
                                            <Link
                                                href={`/documents/${doc.id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View
                                            </Link>
                                        </td>
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
