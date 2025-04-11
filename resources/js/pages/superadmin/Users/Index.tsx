// Users/Index.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { User, Station } from '@/types';

interface UsersIndexProps {
    users: User[];
    stations: Station[];
}

const UsersIndex: React.FC<UsersIndexProps> = ({ users, stations }) => {
    return (
        <div>
            <Head title="Users" />
            <h1>Users</h1>
            <Link href="/users/create">Create New User</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Station</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.station?.name || 'N/A'}</td>
                            <td>
                                <Link href={`/users/${user.id}/edit`}>Edit</Link>
                                <Link href={`/users/${user.id}`} method="delete" as="button">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersIndex;
