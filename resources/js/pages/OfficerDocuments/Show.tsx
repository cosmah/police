// OfficerDocuments/Show.tsx
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Document } from '@/types';
import {
    FileText,
    User,
    Building,
    Tag,
    AlignLeft,
    Download,
    ChevronLeft,
    Clock,
    ExternalLink,
    Calendar,
    File
} from 'lucide-react';

interface OfficerDocumentsShowProps {
    document: Document;
}

const OfficerDocumentsShow: React.FC<OfficerDocumentsShowProps> = ({ document }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const breadcrumbs: BreadcrumbItem[] = [
      {
        title: 'Users',
        href: '/settings/profile',
      },
    ];

    const getFileNameFromPath = (path: string) => {
        return path.split('/').pop() || 'document.pdf';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Head title={`Document: ${document.title}`} />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                    <Link
                        href="/officer/documents"
                        className="mr-3 p-2 rounded-full text-indigo-600 hover:bg-indigo-100 hover:text-indigo-900 dark:text-indigo-400 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300 transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Document Details
                    </h1>
                </div>
                <div className="flex space-x-3">
                    <a
                        href={`/storage/${document.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800 transition-colors"
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View PDF
                    </a>
                    <a
                        href={`/officer/documents/${document.id}/download`}
                        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800 transition-colors"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                    </a>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                        <FileText className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mr-2" />
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            {document.title}
                        </h3>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                        Document ID: {document.id}
                    </p>
                </div>
                <div>
                    <dl>
                        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <Tag className="h-4 w-4 mr-2" />
                                Category
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {document.category}
                                </span>
                            </dd>
                        </div>
                        {document.description && (
                            <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <AlignLeft className="h-4 w-4 mr-2" />
                                    Description
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                    {document.description}
                                </dd>
                            </div>
                        )}
                        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <Building className="h-4 w-4 mr-2" />
                                Station
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {document.station.name}
                            </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                Uploaded By
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {document.user.name}
                            </dd>
                        </div>
                        {document.created_at && (
                            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Upload Date
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                    {formatDate(document.created_at)}
                                </dd>
                            </div>
                        )}
                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <File className="h-4 w-4 mr-2" />
                                File
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="mb-4 sm:mb-0">
                                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <FileText className="h-8 w-8 text-red-500 mr-3" />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {getFileNameFromPath(document.file_path)}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    PDF Document
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <a
                                            href={`/storage/${document.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800 transition-colors"
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            View
                                        </a>
                                        <a
                                            href={`/officer/documents/${document.id}/download`}
                                            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800 transition-colors"
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
                        <FileText className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
                        PDF Preview
                    </h3>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-2 sm:p-4">
                    <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 h-96 sm:h-128 md:h-144">
                        <iframe
                            src={`/storage/${document.file_path}`}
                            className="w-full h-full rounded"
                            title={document.title}
                        />
                    </div>
                </div>
            </div>
          </div>
        </AppLayout>
    );
};

export default OfficerDocumentsShow;
