// Stations/Create.tsx

import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

const StationsCreate: React.FC = () => {
    const [name, setName] = useState('');
    const [region, setRegion] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/stations', { name, region });
    };

    return (
        <div>
            <Head title="Create Station" />
            <h1>Create Station</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Region:</label>
                    <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default StationsCreate;
