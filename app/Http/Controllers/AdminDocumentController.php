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
        $documents = Document::with(['station', 'user'])->get();
        return Inertia::render('AdminDocuments/Index', ['documents' => $documents]);
    }

    public function create()
    {
        $stations = Station::all();
        return Inertia::render('AdminDocuments/Create', ['stations' => $stations]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'station_id' => 'required|exists:stations,id',
            'pdf_file' => 'required|file|mimes:pdf|max:10240', // 10MB max
        ]);

        $path = $request->file('pdf_file')->store('documents', 'public');

        Document::create([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'station_id' => $request->station_id,
            'user_id' => auth()->id(),
            'file_path' => $path,
        ]);

        return redirect()->route('documents.index');
    }

    public function edit(Document $document)
    {
        $stations = Station::all();
        return Inertia::render('AdminDocuments/Edit', ['document' => $document, 'stations' => $stations]);
    }

    public function update(Request $request, Document $document)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'station_id' => 'required|exists:stations,id',
            'pdf_file' => 'nullable|file|mimes:pdf|max:10240', // 10MB max
        ]);

        $data = $request->except('pdf_file');

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
        Storage::disk('public')->delete($document->file_path);
        $document->delete();

        return redirect()->route('documents.index');
    }

    public function show(Document $document)
    {
        return Inertia::render('AdminDocuments/Show', ['document' => $document]);
    }
}
