<?php

use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\AdminDocumentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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


    Route::resource('documents', DocumentController::class)->only(['index', 'create', 'store', 'show']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
