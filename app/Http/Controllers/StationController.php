<?php

namespace App\Http\Controllers;

use App\Models\Station;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StationController extends Controller
{
    public function index()
    {
        $stations = Station::all();
        return Inertia::render('superadmin/Stations/Index', ['stations' => $stations]);
    }

    public function create()
    {
        return Inertia::render('superadmin/Stations/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'region' => 'required|string|max:255',
        ]);

        Station::create($request->all());

        return redirect()->route('stations.index');
    }

    public function edit(Station $station)
    {
        return Inertia::render('superadmin/Stations/Edit', ['station' => $station]);
    }

    public function update(Request $request, Station $station)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'region' => 'required|string|max:255',
        ]);

        $station->update($request->all());

        return redirect()->route('stations.index');
    }

    public function destroy(Station $station)
    {
        $station->delete();
        return redirect()->route('stations.index');
    }
}
