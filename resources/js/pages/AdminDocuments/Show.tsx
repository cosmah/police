// AdminDocuments/Show.tsx
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
  Edit,
  Download,
  ChevronLeft,
  Clock,
  ExternalLink
} from 'lucide-react';

interface AdminDocumentsShowProps {
  document: Document;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Documents',
    href: '/admin/documents',
  },
  {
    title: 'Document Details',
    href: '#',
  },
];

const AdminDocumentsShow: React.FC<AdminDocumentsShowProps> = ({ document }) => {
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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Head title={`Document: ${document.title}`} />

        {/* Header with back button and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center">
            <Link
              href="/admin/documents"
              className="mr-3 text-indigo-600 hover:text-indigo-800 transition-colors dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
              aria-label="Back to documents"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm hidden sm:inline ml-1">Back</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Document Details</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/documents/${document.id}/edit`}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
            >
              <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
              Edit Document
            </Link>
            <a
              href={`/storage/${document.file_path}`}
              download
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
            >
              <Download className="h-4 w-4 mr-2" aria-hidden="true" />
              Download PDF
            </a>
          </div>
        </div>

        {/* Document details card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-8">
          {/* Document header */}
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center mb-1">
              <FileText className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mr-3 flex-shrink-0" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {document.title}
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: {document.id}
            </p>
          </div>

          {/* Document details list */}
          <dl className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4 bg-gray-50 dark:bg-gray-800">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <Tag className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                Category
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {document.category}
                </span>
              </dd>
            </div>

            {document.description && (
              <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4 bg-white dark:bg-gray-900">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <AlignLeft className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                  Description
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 text-justify">
                  {document.description}
                </dd>
              </div>
            )}

            <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4 bg-gray-50 dark:bg-gray-800">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <Building className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                Station
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                {document.station.name}
              </dd>
            </div>

            <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4 bg-white dark:bg-gray-900">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <User className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                Uploaded By
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                {document.user.name}
              </dd>
            </div>

            {document.created_at && (
              <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4 bg-gray-50 dark:bg-gray-800">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                  Upload Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {formatDate(document.created_at)}
                </dd>
              </div>
            )}

            <div className="px-6 py-4 bg-white dark:bg-gray-900">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-3">
                <FileText className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                PDF Document
              </dt>
              <dd className="text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" aria-hidden="true" />
                    <span className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                      {document.file_path.split('/').pop()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`/storage/${document.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
                    >
                      <ExternalLink className="h-4 w-4 mr-1.5" aria-hidden="true" />
                      View PDF
                    </a>
                    <a
                      href={`/storage/${document.file_path}`}
                      download
                      className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
                    >
                      <Download className="h-4 w-4 mr-1.5" aria-hidden="true" />
                      Download
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>

        {/* PDF Preview section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-500" aria-hidden="true" />
              PDF Preview
            </h3>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
            <div className="w-full h-96 sm:h-112 md:h-128 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <iframe
                src={`/storage/${document.file_path}`}
                className="w-full h-full"
                title={`Preview of ${document.title}`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDocumentsShow;
