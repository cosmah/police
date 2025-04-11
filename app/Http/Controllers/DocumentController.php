<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Station;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function index()
    {
        return Inertia::render('Documents/Index', [
            'documents' => Document::with(['station', 'user'])->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Documents/Create', [
            'stations' => Station::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'station_id' => 'required|exists:stations,id',
            'file' => 'required|file|mimes:pdf|max:2048',
        ]);

        $filePath = $request->file('file')->store('documents', 'public');

        Document::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'station_id' => $request->station_id,
            'user_id' => auth()->id(),
            'file_path' => $filePath,
        ]);

        return redirect()->route('documents.index')->with('message', 'Document created successfully.');
    }

    public function show(Document $document)
    {
        return Inertia::render('Documents/Show', [
            'document' => $document->load(['station', 'user']),
        ]);
    }
}
