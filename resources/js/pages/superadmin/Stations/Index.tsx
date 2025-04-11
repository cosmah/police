// Stations/Index.tsx
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Station } from '@/types';
import { Plus, Edit2, Trash2, Search, MapPin, Building2 } from 'lucide-react';

interface StationsIndexProps {
  stations: Station[];
}

const StationsIndex: React.FC<StationsIndexProps> = ({ stations }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Stations',
      href: '/stations',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Head title="Police Stations" />

        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Police Stations</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your police station network</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/stations/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-150"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Station
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="relative max-w-md w-full mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Search stations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1" />
                        Station Name
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Region
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {filteredStations.length > 0 ? (
                    filteredStations.map((station) => (
                      <tr key={station.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {station.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {station.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {station.region}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/stations/${station.id}/edit`}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600 transition duration-150"
                            >
                              <Edit2 className="w-3.5 h-3.5 mr-1" />
                              Edit
                            </Link>
                            <Link
                              href={`/stations/${station.id}`}
                              method="delete"
                              as="button"
                              className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 dark:bg-gray-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition duration-150"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1" />
                              Delete
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                        No stations found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StationsIndex;
