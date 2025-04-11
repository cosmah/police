<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Station;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $stations = Station::all();
        $documents = Document::with(['station', 'user'])
            ->when($request->station_id, fn($query, $station_id) => $query->where('station_id', $station_id))
            ->when($request->search, fn($query, $search) => $query->where('title', 'like', "%{$search}%"))
            ->get();

        return Inertia::render('dashboard', [
            'stations' => $stations,
            'documents' => $documents,
            'filters' => $request->only(['station_id', 'search']),
        ]);
    }
}
