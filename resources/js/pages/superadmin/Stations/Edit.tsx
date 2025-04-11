// Stations/Edit.tsx

import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Station } from '@/types';

interface StationsEditProps {
    station: Station;
}

const StationsEdit: React.FC<StationsEditProps> = ({ station }) => {
    const [name, setName] = useState(station.name);
    const [region, setRegion] = useState(station.region);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/stations/${station.id}`, { name, region });
    };

    return (
        <div>
            <Head title="Edit Station" />
            <h1>Edit Station</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Region:</label>
                    <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default StationsEdit;
