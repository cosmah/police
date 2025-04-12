<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Station;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminDocumentController extends Controller
{
    public function index()
    {
        // Get the admin's station_id from the authenticated user
        $adminStationId = auth()->user()->station_id;

        // Only fetch documents related to the admin's station
        $documents = Document::with(['station', 'user'])
            ->where('station_id', $adminStationId)
            ->get();

        return Inertia::render('AdminDocuments/Index', ['documents' => $documents]);
    }

    public function create()
    {
        // Get the admin's station
        $adminStation = Station::find(auth()->user()->station_id);

        // For dropdown display, we'll still pass all stations but will pre-select the admin's station
        $stations = Station::all();

        return Inertia::render('AdminDocuments/Create', [
            'stations' => $stations,
            'adminStationId' => $adminStation->id
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'pdf_file' => 'required|file|mimes:pdf|max:10240', // 10MB max
        ]);

        $path = $request->file('pdf_file')->store('documents', 'public');

        // Use the admin's station_id instead of the one from the request
        Document::create([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'station_id' => auth()->user()->station_id,
            'user_id' => auth()->id(),
            'file_path' => $path,
        ]);

        return redirect()->route('documents.index');
    }

    public function show(Document $document)
    {
        // Check if the document belongs to the admin's station
        if ($document->station_id !== auth()->user()->station_id) {
            abort(403, 'Unauthorized access');
        }

        $document->load('station', 'user');
        return Inertia::render('AdminDocuments/Show', ['document' => $document]);
    }

    public function edit(Document $document)
    {
        // Check if the document belongs to the admin's station
        if ($document->station_id !== auth()->user()->station_id) {
            abort(403, 'Unauthorized access');
        }

        // Get the admin's station
        $adminStation = Station::find(auth()->user()->station_id);

        // For dropdown display, we'll still pass all stations but will pre-select the admin's station
        $stations = Station::all();

        return Inertia::render('AdminDocuments/Edit', [
            'document' => $document,
            'stations' => $stations,
            'adminStationId' => $adminStation->id
        ]);
    }

    public function update(Request $request, Document $document)
    {
        // Check if the document belongs to the admin's station
        if ($document->station_id !== auth()->user()->station_id) {
            abort(403, 'Unauthorized access');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'pdf_file' => 'nullable|file|mimes:pdf|max:10240', // 10MB max
        ]);

        $data = $request->except('pdf_file', 'station_id');

        // Always use the admin's station_id
        $data['station_id'] = auth()->user()->station_id;

        if ($request->hasFile('pdf_file')) {
            Storage::disk('public')->delete($document->file_path);
            $path = $request->file('pdf_file')->store('documents', 'public');
            $data['file_path'] = $path;
        }

        $document->update($data);

        return redirect()->route('documents.index');
    }

    public function destroy(Document $document)
    {
        // Check if the document belongs to the admin's station
        if ($document->station_id !== auth()->user()->station_id) {
            abort(403, 'Unauthorized access');
        }

        Storage::disk('public')->delete($document->file_path);
        $document->delete();

        return redirect()->route('documents.index');
    }
}
