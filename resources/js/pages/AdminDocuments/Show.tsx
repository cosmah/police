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
    title: 'Users',
    href: '/settings/profile',
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
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
        <Head title="Document Details" />

        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div className="flex items-center">
            <Link
              href="/admin/documents"
              className="mr-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Document Details</h1>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Link
              href={`/admin/documents/${document.id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Document
            </Link>
            <a
              href={`/storage/${document.file_path}`}
              download
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
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

          <div className="border-t border-gray-200 dark:border-gray-700">
            <dl>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <Tag className="h-4 w-4 mr-1" /> Category
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {document.category}
                  </span>
                </dd>
              </div>

              {document.description && (
                <div className="bg-white dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <AlignLeft className="h-4 w-4 mr-1" /> Description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {document.description}
                  </dd>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <Building className="h-4 w-4 mr-1" /> Station
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {document.station.name}
                </dd>
              </div>

              <div className="bg-white dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <User className="h-4 w-4 mr-1" /> Uploaded By
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {document.user.name}
                </dd>
              </div>

              {document.created_at && (
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> Upload Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {formatDate(document.created_at)}
                  </dd>
                </div>
              )}

              <div className="bg-white dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <FileText className="h-4 w-4 mr-1" /> PDF Document
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 mb-1">Document file:</p>
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-red-500 mr-2" />
                        <span className="font-medium">{document.file_path.split('/').pop()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`/storage/${document.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View PDF
                      </a>
                      <a
                        href={`/storage/${document.file_path}`}
                        download
                        className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </a>
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                PDF Preview
              </h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:p-6 h-96 flex justify-center">
              <iframe
                src={`/storage/${document.file_path}`}
                className="w-full h-full border border-gray-200 dark:border-gray-700 rounded"
                title={document.title}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDocumentsShow;
