// Users/Edit.tsx
import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { User, Station } from '@/types';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { UserCog, ArrowLeft, User as UserIcon, Mail, Shield, Building, Save } from 'lucide-react';

interface UsersEditProps {
  user: User;
  stations: Station[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/settings/profile',
  },
];

const UsersEdit: React.FC<UsersEditProps> = ({ user, stations }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [stationId, setStationId] = useState<number | null>(user.station_id);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.put(`/users/${user.id}`, {
      name,
      email,
      role,
      station_id: stationId
    }, {
      onError: (errors) => setErrors(errors),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="mx-auto max-w-2xl px-4 py-6 md:px-6 lg:px-8">
        <Head title="Edit User" />

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserCog className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Edit User</h1>
          </div>

          <Link
            href="/users"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-indigo-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-700">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              User ID: <span className="text-gray-900 dark:text-white">{user.id}</span>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm ${errors.name ? 'border-red-300 dark:border-red-600' : ''}`}
                    required
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm ${errors.email ? 'border-red-300 dark:border-red-600' : ''}`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="officer">Officer</option>
                  </select>
                </div>
                {errors.role && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.role}</p>
                )}
              </div>

              <div>
                <label htmlFor="station" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Station
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="station"
                    value={stationId || ""}
                    onChange={(e) => setStationId(e.target.value ? parseInt(e.target.value) : null)}
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                  >
                    <option value="">None</option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.station_id && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.station_id}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Last updated: </span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default UsersEdit;
