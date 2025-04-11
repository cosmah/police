// Users/Index.tsx
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { User, Station } from '@/types';
import { Users, Edit2, Trash2, Plus, Search } from 'lucide-react';

interface UsersIndexProps {
  users: User[];
  stations: Station[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/settings/profile',
  },
];

const UsersIndex: React.FC<UsersIndexProps> = ({ users, stations }) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="w-full px-4 py-6 md:px-6 lg:px-8">
        <Head title="Users" />

        <div className="mb-6 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Users</h1>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                placeholder="Search users..."
              />
            </div>

            <Link
              href="/users/create"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create User
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Station</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{user.id}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{user.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${user.role === 'super_admin'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                          : user.role === 'admin'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      {user.station?.name || 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/users/${user.id}/edit`}
                          className="rounded p-1.5 text-gray-500 transition-colors hover:bg-indigo-100 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/users/${user.id}`}
                          method="delete"
                          as="button"
                          className="rounded p-1.5 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-900 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{users.length}</span> users
          </div>

          <div className="inline-flex space-x-1">
            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">Previous</button>
            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">Next</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default UsersIndex;
