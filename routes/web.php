<?php
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('documents', DocumentController::class)->only(['index', 'create', 'store', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
