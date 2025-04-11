import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { User, Station } from '@/types';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/users/${user.id}`, { name, email, role, stationId });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>
                <Head title="Edit User" />
                <h1>Edit User</h1>
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
                    <button type="submit">Update</button>
                </form>
            </div>
        </AppLayout>

    );
};

export default UsersEdit;
