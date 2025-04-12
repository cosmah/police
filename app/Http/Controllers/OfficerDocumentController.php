<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Station;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfficerDocumentController extends Controller
{
    public function index(Request $request)
    {
        $documents = Document::with(['station', 'user'])
            ->when($request->station_id, function ($query, $stationId) {
                $query->where('station_id', $stationId);
            })
            ->when($request->user_id, function ($query, $userId) {
                $query->where('user_id', $userId);
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->get();

        $stations = Station::all();
        $users = User::all();
        $categories = Document::distinct()->pluck('category');

        return Inertia::render('OfficerDocuments/Index', [
            'documents' => $documents,
            'stations' => $stations,
            'users' => $users,
            'categories' => $categories,
            'filters' => $request->only(['station_id', 'user_id', 'category']),
        ]);
    }

    public function show(Document $document)
    {
        $document->load('station', 'user');
        return Inertia::render('OfficerDocuments/Show', ['document' => $document]);
    }

    public function download(Document $document)
    {
        $filePath = storage_path('app/public/' . $document->file_path);

        if (file_exists($filePath)) {
            return response()->download($filePath, basename($document->file_path));
        }

        return redirect()->back()->with('error', 'File not found.');
    }
}
