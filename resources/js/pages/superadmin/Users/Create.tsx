// Users/Create.tsx
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Station } from '@/types';

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/users', { name, email, password, role, station_id: stationId });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>
                <Head title="Create User" />
                <h1>Create User</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="super_admin">Super Admin</option>
                            <option value="admin">Admin</option>
                            <option value="officer">Officer</option>
                        </select>
                    </div>
                    <div>
                        <label>Station:</label>
                        <select value={stationId || ""} onChange={(e) => setStationId(e.target.value ? parseInt(e.target.value) : null)}>
                            <option value="">None</option>
                            {stations.map((station) => (
                                <option key={station.id} value={station.id}>
                                    {station.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        </AppLayout>

    );
};

export default UsersCreate;
