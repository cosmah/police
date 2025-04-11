import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

interface Document {
    id: number;
    title: string;
    description: string | null;
    category: string;
    file_path: string;
    station: { name: string };
    user: { name: string };
}

interface Props {
    document: Document;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Documents', href: '/documents' },

];

export default function DocumentShow({ document }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Document Details" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border p-4">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <h3 className="text-lg font-medium mb-4">{document.title}</h3>
                    <div className="space-y-2">
                        <p><strong>Category:</strong> {document.category}</p>
                        <p><strong>Station:</strong> {document.station.name}</p>
                        <p><strong>Created By:</strong> {document.user.name}</p>
                        {document.description && (
                            <p><strong>Description:</strong> {document.description}</p>
                        )}
                        <p>
                            <strong>File:</strong>{' '}
                            <a
                                href={`/storage/${document.file_path}`}
                                target="_blank"
                                className="text-blue-600 hover:underline"
                            >
                                View PDF
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
