// Stations/Index.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Station } from '@/types';

interface StationsIndexProps {
    stations: Station[];
}

const StationsIndex: React.FC<StationsIndexProps> = ({ stations }) => {
    return (
        <div>
            <Head title="Stations" />
            <h1>Police Stations</h1>
            <Link href="/stations/create">Create New Station</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.map((station) => (
                        <tr key={station.id}>
                            <td>{station.id}</td>
                            <td>{station.name}</td>
                            <td>{station.region}</td>
                            <td>
                                <Link href={`/stations/${station.id}/edit`}>Edit</Link>
                                <Link href={`/stations/${station.id}`} method="delete" as="button">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StationsIndex;
