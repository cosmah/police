// AdminDocuments/Create.tsx
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { Station } from '@/types';
import { Save, ArrowLeft, FileText, Building, Tags, AlignLeft, Upload } from 'lucide-react';

interface AdminDocumentsCreateProps {
  stations: Station[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/settings/profile',
  },
];

const AdminDocumentsCreate: React.FC<AdminDocumentsCreateProps> = ({ stations }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [stationId, setStationId] = useState<number | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description || '');
    formData.append('station_id', stationId?.toString() || '');

    if (pdfFile) {
      formData.append('pdf_file', pdfFile);
    }

    router.post('/admin/documents', formData, {
      onFinish: () => setIsUploading(false)
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      }
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
        <Head title="Create Document" />

        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <div className="flex items-center">
              <Link
                href="/admin/documents"
                className="mr-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create Document</h1>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Add a new document to your repository with details and PDF file.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FileText className="h-4 w-4 mr-1" /> Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Document title"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Tags className="h-4 w-4 mr-1" /> Category
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Policy, Manual, Form, etc."
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="station" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Building className="h-4 w-4 mr-1" /> Station
                </label>
                <div className="mt-1">
                  <select
                    id="station"
                    name="station_id"
                    value={stationId || ""}
                    onChange={(e) => setStationId(e.target.value ? parseInt(e.target.value) : null)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select a station</option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <AlignLeft className="h-4 w-4 mr-1" /> Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Brief description of this document"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Brief description of the document's purpose and contents.</p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="pdf_file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Upload className="h-4 w-4 mr-1" /> PDF File
                </label>
                <div
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                    dragActive
                      ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="pdf_file"
                        className="relative cursor-pointer bg-white dark:bg-transparent rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="pdf_file"
                          name="pdf_file"
                          type="file"
                          accept="application/pdf"
                          className="sr-only"
                          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF up to 10MB</p>
                    {pdfFile && (
                      <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                        Selected: {pdfFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/documents"
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isUploading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800 ${
                  isUploading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <Save className="h-4 w-4 mr-2" />
                {isUploading ? 'Creating...' : 'Create Document'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDocumentsCreate;
