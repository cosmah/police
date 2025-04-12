<?php

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\AdminDocumentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OfficerDocumentController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // General dashboard for officers
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Admin dashboard
    Route::get('admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('superadmin/dashboard', [DashboardController::class, 'index'])->name('superadmin.dashboard');

    Route::resource('users', UserController::class);
    Route::resource('stations', StationController::class);

    // Admin Document Routes
    Route::resource('admin/documents', AdminDocumentController::class);


    //Route::resource('documents', DocumentController::class)->only(['index', 'create', 'store', 'show']);
    // Officer Document Routes
    Route::prefix('officer')->group(function () {
        Route::get('documents', [OfficerDocumentController::class, 'index'])->name('officer.documents.index');
        Route::get('documents/{document}', [OfficerDocumentController::class, 'show'])->name('officer.documents.show');
        Route::get('documents/{document}/download', [OfficerDocumentController::class, 'download'])->name('officer.documents.download');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
