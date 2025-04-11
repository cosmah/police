// Users/Create.tsx
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { Station } from '@/types';
import { UserPlus, ArrowLeft, User, Mail, Lock, Building, Shield } from 'lucide-react';

interface UsersCreateProps {
  stations: Station[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/settings/profile',
  },
];

const UsersCreate: React.FC<UsersCreateProps> = ({ stations }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('officer');
  const [stationId, setStationId] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/users', {
      name,
      email,
      password,
      role,
      station_id: stationId
    }, {
      onError: (errors) => setErrors(errors),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="mx-auto max-w-2xl px-4 py-6 md:px-6 lg:px-8">
        <Head title="Create User" />

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserPlus className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create User</h1>
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
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm ${errors.name ? 'border-red-300 dark:border-red-600' : ''}`}
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm ${errors.password ? 'border-red-300 dark:border-red-600' : ''}`}
                    placeholder="••••••••"
                    required
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                )}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                </p>
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

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default UsersCreate;
