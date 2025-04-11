import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

interface Station {
    id: number;
    name: string;
}

interface Props {
    stations: Station[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Documents', href: '/documents' },
    { title: 'Create', href: '/documents/create' },
];

export default function DocumentCreate({ stations }: Props) {
    const { data, setData, post, errors } = useForm({
        title: '',
        description: '',
        category: 'Land Issues',
        station_id: '',
        file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/documents');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Document" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border p-4">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <h3 className="text-lg font-medium mb-4">Add New Document</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="border-sidebar-border rounded w-full p-2"
                            />
                            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="border-sidebar-border rounded w-full p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Category</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="border-sidebar-border rounded w-full p-2"
                            >
                                <option value="Land Issues">Land Issues</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Station</label>
                            <select
                                value={data.station_id}
                                onChange={(e) => setData('station_id', e.target.value)}
                                className="border-sidebar-border rounded w-full p-2"
                            >
                                <option value="">Select Station</option>
                                {stations.map((station) => (
                                    <option key={station.id} value={station.id}>
                                        {station.name}
                                    </option>
                                ))}
                            </select>
                            {errors.station_id && <span className="text-red-500 text-sm">{errors.station_id}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">File (PDF)</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                className="border-sidebar-border rounded w-full p-2"
                            />
                            {errors.file && <span className="text-red-500 text-sm">{errors.file}</span>}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
